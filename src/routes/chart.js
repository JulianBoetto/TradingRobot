import { Router } from "express";
const router = Router();
import { verifyToken } from "../lib/password.js";
import ChartController from "../controllers/chartController.js";
const chartController = new ChartController();

router.post("/", verifyToken, chartController.klines);

export default router;
