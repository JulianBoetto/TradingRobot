import Users from "../models/users.js";
import AccessToken from "../models/accessToken.js";
import { generateToken, validatePassword, saltHashPassword } from "../lib/password.js";
import "dotenv/config";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).send("User or password incorrect")
    try {
      let user = await findByCrendentials(email, password);

      if (!user) {
        return res.status(400).send("User or password incorrect");
      }

      const passwordIsValid = validatePassword(password, user.salt, user.password);

      if (!passwordIsValid) {
        return res.status(400).send("User or password incorrect")
      }

      let session = await AccessToken.create({ userId: user.id, authorizationToken: 'placeholder' });

      const { refreshToken, accessToken } = generateToken(user, session);
     
      session.authorizationToken = refreshToken;
      session.save();

      res.status(200).send({ access_token: accessToken, auth: true });

    } catch (error) {
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
      let pass = saltHashPassword(password);
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

  async validateAccess(req, res) {

  }
}

const findByCrendentials = async (email, password) => {
  let user = await Users.findOne({ email });
  if (!user) return res.status(404);

  return user
}

export default AuthController;