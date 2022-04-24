const api = require('./api');
const symbol = process.env.SYMBOL

setInterval(async () => {
    let buy = 0, sell = 0;
    const result = await api.depth(symbol);
    if(result.bids && result.bids.length ){
        console.log(`Maior preço de compra: ${result.bids[0][0]}`);
        buy = parseInt(result.bids[0][0]);
    }

    if(result.asks && result.asks.length){
        console.log(`Menor preço de venda: ${result.asks[0][0]}`);
        sell = parseInt(result.asks[0][0]);
    }

    if(sell < 192300 ) {
        console.log('Hora de comprar!!')

        const account = await api.accountInfo();
        const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1);
        console.log(`POSIÇÃO DA CARTEIRA`)
        console.log(coins);

        console.log('Verificando o meu dinheiro...')
        if(sell <= parseInt(coins.find(c => c.asset === 'BUSD').free)){
            console.log('Temos dinheiro, comprando agora...')
            const buyOrder = await api.newOrder(symbol, 1)
            console.log(`orderId: ${buyOrder.orderId}`);
            console.log(`status: ${buyOrder.status}`);
        }
    }

    else if(buy > 200000 ) {
        console.log('Hora de vender!!')
    } 

    else {
        console.log('Esperando...')
    }
}, process.env.CRAWLER_INTERVAL);
