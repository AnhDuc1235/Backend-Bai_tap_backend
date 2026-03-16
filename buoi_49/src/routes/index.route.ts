import express from "express";
import { productController } from "../controllers/product.controller";
import { attributeController } from "../controllers/attribute.controller";


const router = express.Router();

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
