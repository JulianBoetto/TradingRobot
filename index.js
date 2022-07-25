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

// const coinName = document.getElementById('coinName');


let cryptoData = "";

app.get('/', (req, res) => {
    res.sendFile('views/index.html', {root: __dirname, teste: "teste"})
});

app.get('/profile', (req, res) => {
    res.sendFile('views/users-profile.html', {root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile('views/pages-contact.html', {root: __dirname })
});

app.get('/trading', async (req, res) => {
    try {
// const result = await api.depth(symbol);
        
        getCriptoValue()
        
        res.sendFile('views/trading.html', {root: __dirname })
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
        socket.on("coin name", (name) => {
            coinName = name
            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);
            if(connections === false) {
                ws.onopen = () => {
                    connections = true
                    // if(ws.readyState > 0) {
                    //     ws.CLOSED
                    // } else {
                        ws.send(JSON.stringify({
                            "method": "SUBSCRIBE",
                            "params": [
                                `${coinName}@ticker`
                            ],
                            "id": 1
                        }))
                    // }
                }

                ws.onmessage = (event) => {
                    process.stdout.write("\033c")
                    data = JSON.parse(event.data)
                    // console.log(data.c)
                    // cryptoData = data.c
                    io.emit('chat message', data);
                }
            } else {
                ws.CLOSED
                ws.onopen = () => {
                    connections = true
                    // if(ws.readyState > 0) {
                    //     ws.CLOSED
                    // } else {
                        ws.send(JSON.stringify({
                            "method": "SUBSCRIBE",
                            "params": [
                                `${coinName}@ticker`
                            ],
                            "id": 1
                        }))
                    // }
                }

                ws.onmessage = (event) => {
                    process.stdout.write("\033c")
                    data = JSON.parse(event.data)
                    // console.log(data.c)
                    // cryptoData = data.c
                    io.emit('chat message', data);
                }

                
            }
            console.log(name)
            let data = [];
            // ws.close();
            // const account = await api.accountInfo();
            console.log(ws.readyState)
            // ws.onopen = () => {
            //     connections = true
            //     // if(ws.readyState > 0) {
            //     //     ws.CLOSED
            //     // } else {
            //         ws.send(JSON.stringify({
            //             "method": "SUBSCRIBE",
            //             "params": [
            //                 `${coinName}@ticker`
            //             ],
            //             "id": 1
            //         }))
            //     // }
            // }
            // console.log(ws.readyState)

            
        })
    })
    // console.log(data)
    // return data
}

const teste = getCriptoValue()
// io.on('connection', (socket) => {
//     console.log("cliente conectado", socket.id)
//     // io.emit('chat message', getCriptoValue());
//     // RECEBENDO DADOS DO HTML
//     // socket.on('chat message', (msg) => {
//     //     io.emit('chat message', cryptoData);
//     // });
//         // socket.on('client_data', function () {
//         //     console.log("connected client")
//         //     // console.log('A user disconnected');
//         //     io.emit('client_data', teste)
//         // });
    
    
//     // socket.on('disconnect', function () {
//     //     console.log('A user disconnected');
//     // });
// });


// setInterval(async () => {
//     let buy = 0, sell = 0;
//     const result = await api.depth(symbol);
//     if(result.bids && result.bids.length ){
//         console.log(`Maior preço de compra: ${result.bids[0][0]}`);
//         buy = parseFloat(result.bids[0][0]);
//     }

//     if(result.asks && result.asks.length){
//         console.log(`Menor preço de venda: ${result.asks[0][0]}`);
//         sell = parseFloat(result.asks[0][0]);
//     }

//     if(sell && sell < goodBuy ) {
//         console.log('Hora de comprar!!')

//         const account = await api.accountInfo();
//         const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1);
//         console.log(`POSIÇÃO DA CARTEIRA`)
//         console.log(coins);
        
//         console.log('Verificando o meu dinheiro...')
//         const walletCoin = parseFloat(coins.find(c => c.asset === coin).free)
//         console.log(walletCoin)
//         if(sell <= walletCoin){
//             console.log('Temos dinheiro, comprando agora...')
//             const buyOrder = await api.newOrder(symbol, 1)
//             console.log(`orderId: ${buyOrder.orderId}`);
//             console.log(`status: ${buyOrder.status}`);

//             if(buyOrder.status === 'FILLED') {
//                 console.log('Posicionando venda futura');
//                 const price = parseFloat(sell * profitability).toFixed(5);
//                 console.log(`Vendendo por ${price} (${profitability})`)
//                 const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'LIMIT');
//                 console.log(`orderId: ${sellOrder.orderId}`);
//                 console.log(`status: ${sellOrder.status}`);
//             }

//         }
//     }

//     else if(buy && buy > goodBuy ) {
//         console.log('Hora de vender!!')
//     } 

//     else {
//         console.log('Esperando...')
//     }
// }, process.env.CRAWLER_INTERVAL);
