const express = require("express");
const router = express.Router();
const AuthController = require("../../src/controllers/authController");
const authController = new AuthController;
const { logout } = require("../lib/password");

router.post("/", authController.login);
router.post("/logout", logout);

module.exports = router;