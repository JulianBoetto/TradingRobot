const api = require('./src/api');
// const { onConnectWS } = require("./src/websocket");
const path = require("path");
const express = require("express");
const { json } = require('express');
const app = express(json);
const moment = require('moment');
let ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;




const WebSocket = require('ws');

function onConnectWS(symbol) {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);

    ws.onopen = () => {
        ws.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
                `${symbol}@ticker`
            ],
            "id": 1
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.c) {
            console.log(data.c, data.s)
        }
    }

    ws.onerror = (event) => {
        console.log(event)
        alert(`[error] ${error.message}`);
    };

}


app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname, teste: "teste" })
});

app.get('/profile', (req, res) => {
    res.sendFile('views/users-profile.html', { root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile('views/pages-contact.html', { root: __dirname })
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await api.allOrders();
        orders.forEach(order => onConnectWS((order.symbol).toLowerCase()));
        orders.map(order => order.formatTime = moment(order.time).format("DD/MM/YYYY"))
        orders.sort((a, b) => {
            return moment(b.formatTime, "DD/MM/YYYY") - moment(a.formatTime, "DD/MM/YYYY")
        });
        const html = await ejs.renderFile("views/orders.ejs", { orders: orders, coin: coin }, { async: true });
        res.send(html)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`))