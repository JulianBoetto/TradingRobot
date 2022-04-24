const api = require('./api');
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;
var WebSocketClient = require('websocket').client;

setInterval(async () => {
    // let buy = 0, sell = 0;
    // const result = await api.depth(symbol);
    // if(result.bids && result.bids.length ){
    //     console.log(`Maior preço de compra: ${result.bids[0][0]}`);
    //     buy = parseFloat(result.bids[0][0]);
    // }

    // if(result.asks && result.asks.length){
    //     console.log(`Menor preço de venda: ${result.asks[0][0]}`);
    //     sell = parseFloat(result.asks[0][0]);
    // }

    //     const account = await api.accountInfo();
    //     console.log(account)

    const result = await api.historicData(symbol)
    console.log(result)
    // var client = new WebSocketClient();

    // client.on('connectFailed', function(error) {
    //     console.log('Connect Error: ' + error.toString());
    // });
    
    // client.on('connect', function(connection) {
    //     console.log('WebSocket Client conectado');
    //     connection.on('error', function(error) {
    //         console.log("Connection Error: " + error.toString());
    //     });
    //     connection.on('close', function() {
    //         console.log('Binance Connection Closed');
    //     });
    //     connection.on('message', function(message) {
    //         if (message.type === 'utf8') {
    //             console.log("Received: '" + message.utf8Data + "'");
    //         }
    //     });
        
    //     // function sendNumber() {
    //     //     if (connection.connected) {
    //     //         var number = Math.round(Math.random() * 0xFFFFFF);
    //     //         connection.sendUTF(number.toString());
    //     //         setTimeout(sendNumber, 1000);
    //     //     }
    //     // }
    //     // sendNumber();
    // });
    
    // client.connect('wss://stream.binance.com:9443/ws/btcusdt@trade');



    // const binanceSocket = new WebSocketClient('wss://stream.binance.com:9443/ws/btcusdt@trade')
    // binanceSocket.onmessage = function (event) {
    //     console.log(data)
    // }

    // if(sell && sell < goodBuy ) {
    //     console.log('Hora de comprar!!')

    //     const account = await api.accountInfo();
    //     const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1);
    //     console.log(`POSIÇÃO DA CARTEIRA`)
    //     console.log(coins);
        
    //     console.log('Verificando o meu dinheiro...')
    //     const walletCoin = parseFloat(coins.find(c => c.asset === coin).free)
    //     console.log(walletCoin)
    //     if(sell <= walletCoin){
    //         console.log('Temos dinheiro, comprando agora...')
    //         const buyOrder = await api.newOrder(symbol, 1)
    //         console.log(`orderId: ${buyOrder.orderId}`);
    //         console.log(`status: ${buyOrder.status}`);

    //         if(buyOrder.status === 'FILLED') {
    //             console.log('Posicionando venda futura');
    //             const price = parseFloat(sell * profitability).toFixed(5);
    //             console.log(`Vendendo por ${price} (${profitability})`)
    //             const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'LIMIT');
    //             console.log(`orderId: ${sellOrder.orderId}`);
    //             console.log(`status: ${sellOrder.status}`);
    //         }

    //     }
    // }

    // else if(buy && buy > goodBuy ) {
    //     console.log('Hora de vender!!')
    // } 

    // else {
    //     console.log('Esperando...')
    // }
}, process.env.CRAWLER_INTERVAL);
