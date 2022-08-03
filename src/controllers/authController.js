const Users = require("../models/users");

class AuthController {
  async login({ email, password }) {
    // const user = new Users({
    //   email,
    //   password
    // });

    // const result = await user.save();

    // const user = await User.findOne({ email }).select('+password');

    // if (!user) {
    //     return res.status(400).send({ error: 'User not found' });
    // }

    // if (!await bcrypt.compare(password, user.password)) {
    //     return res.status(400).send({ error: 'Invalid password' })
    // }

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
}

module.exports = AuthController;