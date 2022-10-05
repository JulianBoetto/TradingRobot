import { Router } from "express";
const router = Router();
import { verifyToken } from "../lib/password.js";
import OrdersController from "../controllers/ordersController.js";
const ordersController = new OrdersController();

router.post('/allOrders', verifyToken, ordersController.allOrders);
router.post('/historic/:id', verifyToken, ordersController.historic);

export default router;