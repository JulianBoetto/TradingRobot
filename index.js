const api = require('./src/api');
// const { onConnectWS } = require("./src/websocket");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const { json } = require('express');
const app = express(json);
const moment = require('moment');
const AuthController = require("./src/controllers/authController");
const authController = new AuthController;
let ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(require("cors")());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
//   res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("X-Powered-By", "ZendServer 8.5.0,ASP.NET");
  next();
});
const PORT = process.env.PORT || 3002;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;

// const tableBody = document.getElementById("tableBody");
// console.log(tableBody)

let coinData = "teste";


function onConnectWS(symbol, orders) {
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
        const number = 1
        if (data.c && data.s === orders[number].symbol) {
            const value = Number(data.c) - Number(orders[number].price)
            console.log(data.s, `Valor atual: ${value.toLocaleString()}`, data.c, orders[number].price )

        }
    }

    ws.onerror = (event) => {
        console.log(event)
        alert(`[error] ${error.message}`);
    };

}


app.get('/', (req, res) => {
    // res.sendFile('views/index.html', { root: __dirname })
});

app.post("/auth", async (req, res) => {
    const token = await authController.login(req.body)
    res.status(200).send(email)
})

app.get('/profile', (req, res) => {
    // res.sendFile('views/users-profile.html', { root: __dirname })
});

app.get('/contact', (req, res) => {
    // res.sendFile('views/pages-contact.html', { root: __dirname })
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await api.allOrders();
        // orders.forEach(order => onConnectWS((order.symbol).toLowerCase(), orders));
        orders.map(order => order.formatTime = moment(order.time).format("DD/MM/YYYY"))
        orders.sort((a, b) => {
            return moment(b.formatTime, "DD/MM/YYYY") - moment(a.formatTime, "DD/MM/YYYY")
        });
        const html = await ejs.renderFile("views/orders.ejs", { orders: orders }, { async: true });
        // res.send(html)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`))