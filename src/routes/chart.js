const express = require("express");
const router = express.Router();
const { verifyToken } = require("../lib/password");
const ChartController = require("../controllers/chartController");
const chartController = new ChartController();

router.post("/", verifyToken, chartController.klines);

module.exports = router;
