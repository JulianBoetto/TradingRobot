const Users = require("../models/users");
const AccessToken = require("../models/accessToken");
const bcrypt = require("bcrypt");
const CryptoPass = require('../lib/password');
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_PRIVATE_KEY

class AuthController {
  async login({ email, password }) {
    try {
      const user = await Users.findOne({ email }).select('+password');
      
      if (!user) {
        return { statusCode: 400, message: "User not found" };
      }      
      
      if (!CryptoPass.validatePassword(password, user.password, user.salt)) {
        return { statusCode: 400, message: 'Invalid email or password' }
      }
      
      user.password = "";

      let accessToken = await AccessToken.create({ userId: user.id, authorizationToken: 'placeholder' });

      let payload = {
        accessTokenId: accessToken.id,
        userId: accessToken.userId
      };
  
      let token = jwt.sign({ payload }, secret);
      accessToken.authorizationToken = token;
      accessToken.save();

      return { access_token: token };    
    } catch (error) {
      return { statusCode: 400, message: `Login failed: ${error}` }
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

  async getFromJWT (jwt) {
    return await AccessToken.findOne({ where: { userId: jwt.payload.userId, id: jwt.payload.accessTokenId } });
  }

}

module.exports = AuthController;