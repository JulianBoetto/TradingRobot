const express = require("express");
const router = express.Router();
const api = require('../api');
const { verifyToken } = require("../lib/password");
const OrdersController = require("../controllers/ordersController");
const ordersController = new OrdersController();

router.post('/allOrders', verifyToken, ordersController.allOrders);
router.post('/historic/:id', verifyToken, ordersController.historic);

module.exports = router;