import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const productController = {
  getProduct: async (req: Request, res: Response) => {
    const product = await productService.getProduct();
    res.json(product);
  },
  getProductById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await productService.getProductById(+id!);
    res.json(product);
  },
  createProduct: async (req: Request, res: Response) => {
    const body = req.body;
    const product = await productService.createProduct(body);
    res.json(product);
  },
  updateProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body
    const product = await productService.updateProduct(body, +id!);
    res.json(product);
  },
  deleteProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await productService.deleteProduct(+id!);
    res.json(product);
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
