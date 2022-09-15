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
    const { email, password } = req.body;
    if (!email || !password) res.status(400).send("User or password incorrect")
    try {
      let user = await findByCrendentials(email, password);

      if (!user) {
        return res.status(400).send("User or password incorrect");
      }

      const passwordIsValid = await validatePassword(password, user.salt, user.password);

      if (!passwordIsValid) {
        return res.status(400).send("User or password incorrect")
      }
      const payload = {
        userId: 1,
        email: email,
        date: new Date()
      };

      const options = {
        expiresIn: 36000 //segundos
      }

      const token = jwt.sign(payload, secret, options);

      res.status(200).send({ access_token: token, auth: true });
    
    } catch(error) {
    res.status(401).send("Unauthorized");
  }
}

  async register(req, res) {
  if (!req.body) {
    return res.status(400).send("Registration failed");
  }
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("Registration failed");
  }
  try {
    if (await Users.findOne({ email })) {
      return res.status(400).send('User already exists')
    }

    if (!password) {
      return { statusCode: 400, message: `Registration failed` }
    }
    let pass = CryptoPass.saltHashPassword(password);
    let userPassword = {
      encryptedPassword: pass.passwordHash,
      passwordSalt: pass.salt
    };

    const user = await Users.create({ email, password: userPassword.encryptedPassword, salt: userPassword.passwordSalt });

    user.password = undefined;

    return res.status(200).send(user)
  } catch (err) {
    return res.status(400).send("Registration failed")
  }
};

  async getFromJWT(jwt) {
  return await AccessToken.findOne({ where: { userId: jwt.payload.userId, id: jwt.payload.accessTokenId } });
}




}

const findByCrendentials = async (email, password) => {
  let user = await Users.findOne({ email });
  if (!user) return res.status(404);

  return user
}

const validatePassword = async (password, passwordSalt, encryptedPassword) => {
  let cryptoPass = CryptoPass.sha512(password, passwordSalt);
  return encryptedPassword === cryptoPass.passwordHash;
}

module.exports = AuthController;