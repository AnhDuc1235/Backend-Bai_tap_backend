import { Request, Response } from "express";
import { connection } from "../utils/db"
import { userService } from "../services/user.service";

export const userController = {
  // create: async (req: Request, res: Response) => {
  //   //req.body
  //   res.json({
  //     message: "Create user Success",
  //     data: req.body,
  //   });
  // },
  index: async (req: Request, res: Response) => {
    const users = await userService.getAll();
    res.json({ users })
  },
  find: async (req: Request<{username: string}>, res: Response) => {
    // const { id } = req.params
    // const db = await connection
    // const [users] = await db.query(`SELECT * FROM users
    //   WHERE id = ?`, [id]
    // )
    // khong duoc truyen truc tiep du lieu input vao trong cau lenh sql
    // gia su viet la where id = [id] se xay ra lo hong bao mat sql injection
    // chung ta khong biet duoc khi gia su route nguoi dung goi la users/:id thi :id co an toan hay khong
    // -> phai co ? voi gia tri tuong ung [], no se co 1 buoc kiem tra truoc khi thuc thi cau lenh sql

    const { username } = req.params
    const user = await userService.find(username)
    res.json({ user })
  },
  //Vi du cho cach xu ly sql injection
  create: async (req: Request, res: Response) => {
    const { fullname, username, bio, phone } = req.body;

    const user = await userService.create(req.body)

    res.json({ user });
    //prisma.user thì user là model mình set up
    //mỗi lần thay đổi schema hay model, thì phải generate lại npx prisma generate

  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await userService.update(req.body, +id!)
    res.json({ user })
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await userService.delete(+id!)
    res.json({ user })
  }


};
