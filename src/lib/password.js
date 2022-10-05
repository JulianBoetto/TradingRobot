'use strict';
import { randomBytes, createHmac } from 'crypto';
import AccessToken from "../models/accessToken.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_PRIVATE_KEY;
const blockList = [];

const genRandomString = function (length) {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const sha512 = function (password, salt) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword) {
    const salt = genRandomString(16);
    return sha512(userpassword, salt);
}

function generateToken(user, session) {
    const payload = {
        userId: user.id,
        sessionId: session.id
    };

    const options = {
        expiresIn: 86400 //segundos
    }

    const refreshToken = jwt.sign(payload, secret, options);
    const accessToken = jwt.sign({ sessionId: session.id }, secret, { expiresIn: 1200 })
    return { refreshToken, accessToken };
}

function validatePassword(password, passwordSalt, encryptedPassword) {
    try {
        let cryptoPass = sha512(password, passwordSalt);
        return encryptedPassword === cryptoPass.passwordHash;
    } catch (error) {
        return false
    }
}

async function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    if (!token) return res.status(401).send("Unauthorized").end();
    try {
        const parts = token.split(" ");
        if (parts.length === 2) {
            const scheme = parts[0]
            token = parts[1]

            if (!/^Bearer$/i.test(scheme)) {
                return res.status(401).send("Unauthorized").end();
            }

            jwt.verify(token, secret);
            const refreshToken = jwt.decode(token);
            const session = await AccessToken.find({ _id: refreshToken.sessionId });
            if (!session || !session.length) return res.status(401).send("Unauthorized").end();
            // const user = jwt.decode(token);
            // const generateToken(user, session);

            next();
        } else {
            return res.status(401).send("Unauthorized").end();
        }
    } catch (error) {
        return res.status(401).send("Unauthorized").end();
    }
}

// recibe token, lo valida y devuelve el token nuevo
// async funcion


// REHACER LOGOUT PARA UTILIZAR REDIS COMO BLOCKLIST
async function logout(req, res, next) {
    // const token = req.headers["x-access-token"];
    // blockList.push(token);
    res.status(200).send("Closed session")
}


export {
    saltHashPassword,
    sha512,
    generateToken,
    validatePassword,
    verifyToken,
    logout
}
