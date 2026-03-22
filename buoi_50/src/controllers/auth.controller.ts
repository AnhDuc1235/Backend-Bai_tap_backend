import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { userService } from "../services/user.service";
import { errorHandlingMiddleware } from "../middlewares/errorHandling.middleware";
import { HttpException } from "../utils/exception";

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      return res.json({
        data: result,
      });

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      return res.status(401).json({
        message: "Email hoặc mật khẩu không chính xác",
      });
    }
  },
  register: async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    return res.json({
      message: "Đăng ký tài khoản thành công",
      data: user,
    });
  },
  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const newToken = await authService.refreshToken(refreshToken);
    return res.json({
      message: "Refresh token thành công",
      data: newToken,
    });
  },
  profile: async (req: Request, res: Response) => {
    return res.json({
      message: "Lấy thông tin user thành công",
      data: req.user,
    });
  },
  logout: async (req: Request, res: Response) => {
    await authService.logout(req.tokenJti!, req.tokenExp!);
    return res.json({
      message: "đăng xuất thành công"
    });
  },
  updateProfile: async (req: Request, res: Response) => {
    const body = req.body
    const id = req.user?.id
    const user = await userService.updateProfile(body, +id!);
    res.json(user);
  },
  changePassword: async (req: Request, res: Response) => {
    const body = req.body
    const id = req.user?.id
    const user = await userService.changePassword(body, +id!);
    res.json({
      message: "Đổi mật khẩu thành công",
      data: user
    });
  },
  deleteProfile: async (req: Request, res: Response) => {
    const id = req.user?.id
    const user = await userService.deleteProfile(+id!);
    return res.json({
      message: "Xóa user thành công",
    });
    
    
  },
};