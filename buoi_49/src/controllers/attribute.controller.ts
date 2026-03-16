import { Request, Response } from "express";
import { attributeService } from "../services/attribute.service";

export const attributeController = {
  getAttribute: async (req: Request, res: Response) => {
    const attribute = await attributeService.getAttribute();
    res.json(attribute);
  },
  getAttributeById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const attribute = await attributeService.getAttributeById(+id!);
    res.json(attribute);
  },
  createAttribute: async (req: Request, res: Response) => {
    const body = req.body;
    const attribute = await attributeService.createAttribute(body);
    res.json(attribute);
  },
  updateAttribute: async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body
    const attribute = await attributeService.updateAttribute(body, +id!);
    res.json(attribute);
  },
  deleteAttribute: async (req: Request, res: Response) => {
    const id = req.params.id;
    const attribute = await attributeService.deleteAttribute(+id!);
    res.json(attribute);
  },
  createAttributeValue: async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const attributevalue = await attributeService.createAttributeValue(body, +id!);
    res.json(attributevalue);
  },
  deleteAttributeValue: async (req: Request, res: Response) => {
    const id = req.params.id;
    const valueId = req.params.valueId;
    const attributevalue = await attributeService.deleteAttributeValue(+id!, +valueId!);
    res.json(attributevalue);
  },
};

//GET /user/:userId/posts
// export const userController = {
//   index: async (req: Request, res: Response) => {
//     const users = await userService.getAll(req);
//     res.json(users);
//   },
//   find: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await userService.find(+id!);
//     res.json(user);
//   },
//   create: async (req: Request, res: Response) => {
//     try {
//       const user = await userService.create(req.body);
//       res.json({ user });
//     } catch (error) {
//       console.log(error);
//       res.json({ error: error });
//     }
//   },
//   update: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await userService.update(req.body, +id!);
//     res.json(user);
//   },
//   delete: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await userService.delete(+id!);
//     res.json(user);
//   },
//   deleteMany: async (req: Request, res: Response) => {
//     const ids = req.body;
//     const users = await userService.deleteMany(ids);
//     res.json(users);
//   },
//   getPosts: async (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     //Gọi service nào?
//     const posts = await postService.getPostsByUser(+userId!);
//     res.json(posts);
//   },
// };
