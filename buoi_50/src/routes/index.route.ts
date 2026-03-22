import express from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema, refreshTokenSchema } from "../validators/auth.validate";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/login", validate(loginSchema), authController.login);
router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register,
);
router.post(
  "/auth/refreshtoken",
  validate(refreshTokenSchema),
  authController.refreshToken,
);

router.get("/users/me", authMiddleware, authController.profile);
router.put("/users/me", authMiddleware, authController.updateProfile);
router.put("/users/me/changepassword", authMiddleware, authController.changePassword);
router.delete("/users/me", authMiddleware, authController.deleteProfile);
router.post("/auth/logout", authMiddleware, authController.logout);

export default router;