import { JwtPayload } from "jsonwebtoken";
import { UserData } from "../types/user.type";
import { verifyPassword } from "../utils/hashing";
import {
  createAccessToken,
  createRefreshToken,
  decodedToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { redisClient } from "../utils/redis";

import { userService } from "./user.service";
import { HttpException } from "../utils/exception";
import { prisma } from "../utils/prisma";

export const authService = {
  async register(userData: UserData) {
    //Thêm dữ liệu vào bảng users --> gọi userService
    const user = await userService.create(userData);
    //Gửi email
    //Tạo token
    return user;
  },
  async login(email: string, password: string) {
    //Kiểm tra email có tồn tại hay không? => Trả về thông tin user thông qua email
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("NOT_FOUND_USER");
    }

    //Verify password
    if (!verifyPassword(password, user.password!)) {
      throw new Error("PASSWORD_WRONG");
    }


    //Tạo token
    const accessToken = createAccessToken({
      id: user.id
    });
    const refreshToken = createRefreshToken({
      id: user.id
    });

    //Lưu redis jti refresh token
    const payloadRefresh = decodedToken(refreshToken);

    const jtiRefreshToken = (payloadRefresh as JwtPayload & { jti: string })
      .jti;

    const expRefreshToken = (payloadRefresh as JwtPayload).exp;

    const seconds = Math.floor(expRefreshToken! - Date.now() / 1000);

    await (await redisClient).setEx(
      `refreshToken:${jtiRefreshToken}`,
      seconds,
      user.id.toString(),
    );

    await prisma.refresh_token.upsert({
      where: {
        user_id: user.id.toString(),
      },
      update: {
        token: jtiRefreshToken,
        expires_at: seconds,
      },
      create: {
        user_id: user.id.toString(),
        token: jtiRefreshToken,
        expires_at: seconds,
      },
    });

    return { accessToken, refreshToken };
  },
  async profile(token: string) {
    //Verify token
    const decoded = verifyAccessToken(token) as JwtPayload & { id: number };
    if (!decoded) {
      throw new Error("TOKEN_INVALID");
    }
    //Kiểm tra blacklist
    if (await this.verifyBlacklist(decoded.jti!)) {
      throw new Error("TOKEN_BLACKLIST");
    }
    const user = await userService.find(decoded.id);
    return { user, decoded };
  },
  async logout(jti: string, exp: number) {
    //redis: set expire nhận vào thời gian tồn tại chứ không phải timestamp
    const seconds = Math.floor(exp - Date.now() / 1000);
    (await redisClient).setEx(`blacklist:${jti}`, seconds, jti);
    await prisma.blacklisted_token.create({
      data: {
        token_id: jti,
        type: "access",
        expires_at: seconds
      }
    });
    return true;
  },
  async verifyBlacklist(jti: string) {
    const blacklist = await (await redisClient).get(`blacklist:${jti}`);
    return blacklist;
  },
  async refreshToken(token: string) {
    //Nhận refresh token từ body
    //Verify refresh token
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      throw new HttpException("Refresh token không hợp lệ", 400);
    }
    //Lấy userId từ payload
    const { id, jti } = decoded as JwtPayload & { id: number; jti: string };

    //Kiểm tra xem refresh token có tồn tại trên db không?
    const refreshTokenExisting = await (await redisClient).exists(
      `refreshToken:${jti}`,
    );

    if (!refreshTokenExisting) {
      throw new HttpException("Refresh token không hợp lệ", 400);
    }

    const existing = await prisma.refresh_token.findUnique({
      where: { token: jti }
    });
    if (!existing) throw 401;

    const blacklist = await prisma.blacklisted_token.findFirst({
      where: { token_id: jti }
    });
    if (blacklist) throw 401;

    //Tạo access token mới
    const accessToken = createAccessToken({
      id,
    });
    //Tạo refresh token mới
    const refreshToken = createRefreshToken({
      id,
    });
    //Lưu redis jti refresh token
    const payloadRefresh = decodedToken(refreshToken);
    const jtiRefreshToken = (payloadRefresh as JwtPayload & { jti: string })
      .jti;
    const expRefreshToken = (payloadRefresh as JwtPayload).exp;
    const seconds = Math.floor(expRefreshToken! - Date.now() / 1000);
    await (await redisClient).setEx(
      `refreshToken:${jtiRefreshToken}`,
      seconds,
      id.toString(),
    );

    await prisma.refresh_token.upsert({
      where: {
        user_id: id.toString(),
      },
      update: {
        token: jtiRefreshToken,
        expires_at: seconds,
      },
      create: {
        user_id: id.toString(),
        token: jtiRefreshToken,
        expires_at: seconds,
      },
    });

    //block token cũ
    await prisma.blacklisted_token.create({
      data: {
        token_id: jti,
        type: "refresh",
        expires_at: seconds
      }
    });

    // //thu hồi:
    // await prisma.refresh_token.delete({
    //   where: { token: jti }
    // });
    //Thu hồi refresh cũ
    await (await redisClient).del(`refreshToken:${jti}`);

    return { accessToken, refreshToken };

  },
};

//Blacklist lưu gì? --> lưu jti (JWT ID)
//Lưu blacklist ở đâu?
// + Database
// + Redis *

//AccessToken tạo ra --> không xóa được
//Revoke AccessToken
// - lấy jti
// - lấy exp
// - lưu jti vào redis với expire lấy được

//Use-case
// 1. Quản lý thiết bị đăng nhập của users
// 2. Giới hạn số lượng thiết bị của users

//Database
/*
Table login_histories
- id
- userId
- ip_address
- user_agent
- created_at
- updated_at

[
  {
    "access_token": "",
    "refresh_token": "",
    isCurrent: true
  },
  {
    "access_token": "",
    "refresh_token": "",
    isCurrent: false
  }
]
  
*/