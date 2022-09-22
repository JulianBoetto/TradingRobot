const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;

async function privateCall(path, data = {}, method = 'GET') {
    const timestamp = Date.now();
    const signature = crypto.createHmac('sha256', apiSecret)
        .update(`${new URLSearchParams({ ...data, timestamp }).toString()}`)
        .digest('hex');

    const newData = { ...data, timestamp, signature };
    const qs = `?${new URLSearchParams(newData).toString()}`

    try {
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qs}`,
            headers: { 'X-MBX-APIKEY': apiKey }
        })

        return result.data;
    } catch (error) {
        console.log(error)
    }
}

async function newOrder(symbol, quantity, price, side = 'BUY', type = 'MARKET') {
    const data = { symbol, side, type, quantity }

    if (price) data.price = price;
    if (type === 'LIMIT') data.timeInForce = 'GTC';

    return privateCall('/v3/order', data, 'POST');
}

async function accountInfo() {
    return privateCall('/v3/account')
}

async function allOrders() {
    return privateCall('/v3/openOrders')
}

async function allTrades(symbol, limit = 10) {
    return privateCall('/v3/myTrades', { symbol })
}

async function priceTicker(symbol) {
    return publicCall('/v3/ticker/price', { symbol })
}

async function priceTicker24h(symbol) {
    return publicCall('/v3/ticker/24hr', { symbol })
}

async function publicCall(path, data, method = 'GET') {
    try {
        const qs = data ? `?${new URLSearchParams(data).toString()}` : '';
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qs}`
        })
        return result.data
    } catch (error) {
        // console.log(error)
        return
    }
}

async function time() {
    return publicCall('/v3/time');
}

async function depth(symbol = 'BTCBRL', limit = 5) {
    return publicCall('/v3/depth', { symbol, limit })
}

async function exchangeInfo() {
    return publicCall('/v3/exchangeInfo')
}

async function klines(symbol, interval, limit = 60) {
    return publicCall('/v3/klines', { symbol, interval, limit })
}

module.exports = { time, depth, exchangeInfo, accountInfo, newOrder, allOrders, priceTicker, priceTicker24h, allTrades, klines }