const Users = require("../models/users");
const AccessToken = require("../models/accessToken");
const bcrypt = require("bcrypt");
const CryptoPass = require('../lib/password');

class AuthController {
  async login({ email, password }) {
    // const user = new Users({
    //   email,
    //   password
    // });

    // const result = await user.save();

    const user = await Users.findOne({ email }).select('+password');

    if (!user) {
      return { statusCode: 400, message: "User not found" };
    }

    if (!await bcrypt.compare(password, user.password)) {
      return { statusCode: 400, message: 'Invalid email or password' }
    }


    // user.password = undefined;

    // res.send({
    //     user,
    //     token: generateToken({ id: user.id })
    // })


    // let user = await User.findByCrendentials(email, password);
    // if (!user.statusCode) {
    //   let accessToken = await AccessToken.login(this.app.jwt, user);
    //   return { access_token: accessToken };
    // }
    // return { statusCode: user.statusCode };
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

      const token = await generateToken({ id: user.id })

      return { user, token };
    } catch (err) {
      return { statusCode: 400, message: `Registration failed: ${err}` }
    }
  }
}

module.exports = AuthController;