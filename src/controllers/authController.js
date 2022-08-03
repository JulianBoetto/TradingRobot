class AuthController {
  async login({email, password}) {
    const { AccessToken, User } = this.orm.models;

    let user = await User.findByCrendentials(email, password);
    if (!user.statusCode) {
      let accessToken = await AccessToken.login(this.app.jwt, user);
      return { access_token: accessToken };
    }
    return { statusCode: user.statusCode };
  }
}

module.exports = AuthController;