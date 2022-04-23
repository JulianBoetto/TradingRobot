const axios = require('axios');
const querystring = require('querystring')

async function publicCall(path, data, method = 'GET') {
    try {
        const qs = data ? `?${new URLSearchParams(data).toString()}` :  '';
        const result = await axios({
            method,
            url: `${process.env.API_URL}${path}${qs}`
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

async function time() {
    return publicCall('/v3/time');
}

async function depth(symbol = 'BTCBRL', limit = 5) {
    return publicCall('/v3/depth', {symbol, limit})
}

async function exchangeInfo() {
    return publicCall('/v3/exchangeInfo')
}

module.exports = { time, depth, exchangeInfo }