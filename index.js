const api = require('./api');
const path = require("path")
const express = require("express")
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const PORT = 3000;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;

app.get('/', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname })
});

app.listen(process.env.PORT || PORT, () => console.log(`Server run in port: ${process.env.PORT || PORT}`))

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
