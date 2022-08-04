'use strict';
const crypto = require('crypto');//

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

function validatePassword (password, userPassword, userSalt) {
    try {
        let cryptoPass = sha512(password, userSalt);
        return userPassword === cryptoPass.passwordHash;        
    } catch (error) {
        console.log(error)
    }
}


module.exports = { saltHashPassword, sha512, generateToken, validatePassword }
