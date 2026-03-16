import express from "express";
// import { homeController } from "../controllers/home.controller";
// import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";
import { attributeService } from "../services/attribute.service";
import { attributeController } from "../controllers/attribute.controller";
// import { validate } from "../middlewares/validate.middleware";
// import { userSchema } from "../validators/user.validator";

const router = express.Router();
// router.get("/", homeController.index);
// router.get("/gioi-thieu", homeController.about);
// router.post("/users", validate(userSchema), userController.create);

// router.get("/users", userController.index);
// router.get("/users/:id", userController.find);
// router.post("/users", userController.create);
// router.put("/users/:id", userController.update);
// router.delete("/users/:id", userController.delete);
// router.delete("/users", userController.deleteMany);
// router.get("/users/:userId/posts", userController.getPosts);

router.get("/products", productController.getProduct);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

router.get("/attributes", attributeController.getAttribute);
router.get("/attributes/:id", attributeController.getAttributeById);
router.post("/attributes", attributeController.createAttribute);
router.put("/attributes/:id", attributeController.updateAttribute);
router.delete("/attributes/:id", attributeController.deleteAttribute);
router.post("/attributes/:id/values", attributeController.createAttributeValue);
router.delete("/attributes/:id/values/:valueId", attributeController.deleteAttributeValue);

export default router;
