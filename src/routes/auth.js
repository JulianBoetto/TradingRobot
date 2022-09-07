const express = require("express");
const router = express.Router();
const AuthController = require("../../src/controllers/authController");
const authController = new AuthController;

router.post("/", async (req, res) => {
    const token = await authController.login(req.body)
    if (token.statusCode) {
        res.status(token.statusCode).send({ error: token.message })
    } else {
        res.status(200).send(token)
    };
});

module.exports = router;