'use strict';
const crypto = require('crypto');
const AuthController = require("../controllers/authController");
const AccessToken = require("../models/accessToken")
require('dotenv').config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_PRIVATE_KEY;
const blockList = [];

const genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const sha512 = function (password, salt) {
    const hash = crypto.createHmac('sha512', salt);
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

function generateToken(accessToken, userData) {
    let payload = {
        accessTokenId: accessToken.id,
        userId: accessToken.userId,
        roleId: userData.roleId,
    };

    let token = jwt.sign({ payload });
    accessToken.authorizationToken = token;
    accessToken.save();
    return token;
}

function validatePassword(password, userPassword, userSalt) {
    try {
        let cryptoPass = sha512(password, userSalt);
        return userPassword === cryptoPass.passwordHash;
    } catch (error) {
        console.log(error)
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
            if (!session) return res.status(401).send("Unauthorized").end();

            next();
        } else {
            return res.status(401).send("Unauthorized").end();
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send("Unauthorized").end();
    }
}

async function logout(req, res, next) {
    const token = req.headers["x-access-token"];
    blockList.push(token);
    res.status(200).send("Closed session")
}


module.exports = { saltHashPassword, sha512, generateToken, validatePassword, verifyToken, logout }
