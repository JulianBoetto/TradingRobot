const api = require('./api');
const path = require("path");
const ejs = require("ejs")
const WebSocket = require("ws")
const express = require("express");
const { json } = require('express');
const app = express(json);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = 3000;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;
const moment = require("moment");

// const coinName = document.getElementById('coinName');


let cryptoData = "";

app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname, teste: "teste" })
});

app.get('/profile', (req, res) => {
    res.sendFile('views/users-profile.html', { root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile('views/pages-contact.html', { root: __dirname })
});

app.get('/trading', async (req, res) => {
    try {
        // const result = await api.depth(symbol);

        getCriptoValue()

        res.sendFile('views/trading.html', { root: __dirname })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


server.listen(process.env.PORT || PORT, () => console.log(`Server run in port: ${process.env.PORT || PORT}`))

let connections = false;

async function getCriptoValue() {
    let coinName;

    io.on("connection", (socket) => {
        console.log("cliente conectado", socket.id)

        coinName = "btcusdt"
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);

        ws.onopen = () => {
            connections = true
            ws.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params": [
                    `${coinName}@ticker`
                ],
                "id": 1
            }));
        }

        let num = 0;

        ws.onmessage = (event) => {
            process.stdout.write("\033c")
            data = JSON.parse(event.data)
            num += 1
            data.time = num
            io.emit('coin', data);
        }
    })
}

const teste = getCriptoValue()