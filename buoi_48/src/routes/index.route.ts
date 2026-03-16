import express from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { userSchema } from "../validators/user.validator";
const router = express.Router();
// router.post("/users", validate(userSchema), userController.create);

router.get('/users', userController.index)
router.get('/users/search', userController.find)
router.post('/users', userController.create)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

export default router;
