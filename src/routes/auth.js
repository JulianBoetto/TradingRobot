import { Router } from "express";
const router = Router();
import AuthController from "../../src/controllers/authController.js";
const authController = new AuthController;
import { logout, verifyToken } from "../lib/password.js";

router.post("/", authController.login);
router.post("/renew", verifyToken);
router.post("/logout", logout);
// router.post("/register", authController.register);

export default router;