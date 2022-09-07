const Users = require("../models/users");
const AccessToken = require("../models/accessToken");
const bcrypt = require("bcrypt");
const CryptoPass = require('../lib/password');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_PRIVATE_KEY;
const userEmail = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;

class AuthController {
  async login(req, res) {
    const { email, password } = req.body
    try {
      const user = email === userEmail && password === userPassword;

      if (!user) {
        res.status(400).send("User or password incorrect");
      }

      const payload = {
        userId: 1,
        email: email,
        date: new Date()
      };

      const options = {
        expiresIn: 300 //segundos
      }

      const token = jwt.sign(payload, secret, options);

      res.status(200).send({ access_token: token, auth: true });
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }

  async register({ email, password }) {
    try {
      if (await Users.findOne({ email })) {
        return { statusCode: 400, message: 'User already exists' }
      }

      let pass = CryptoPass.saltHashPassword(password);
      let userPassword = {
        encryptedPassword: pass.passwordHash,
        passwordSalt: pass.salt
      };

      const user = await Users.create({ email, password: userPassword.encryptedPassword, salt: userPassword.passwordSalt });

      user.password = undefined;

      return user
    } catch (err) {
      return { statusCode: 400, message: `Registration failed: ${err}` }
    }
  };

  async getFromJWT(jwt) {
    return await AccessToken.findOne({ where: { userId: jwt.payload.userId, id: jwt.payload.accessTokenId } });
  }




}

module.exports = AuthController;