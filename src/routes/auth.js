const express = require("express");
const router = express.Router();
const AuthController = require("../../src/controllers/authController");
const authController = new AuthController;
const { logout, verifyToken } = require("../lib/password");

router.post("/", authController.login);
router.post("/renew", verifyToken);
router.post("/logout", logout);
// router.post("/register", authController.register);

module.exports = router;