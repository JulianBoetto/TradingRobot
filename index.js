const api = require('./api');
const symbol = process.env.SYMBOL

setInterval(async () => {
    const result = await api.depth();
    console.log(`Maior preço de compra: ${result.bids[0][0]}`);
    console.log(`Menor preço de venda: ${result.asks[0][0]}`);

    const sell = parseInt(result.asks[0][0]);
    const buy = parseInt(result.bids[0][0]);
    if(sell < 192300 ) {
        console.log('Hora de comprar!!')
    }

    else if(buy > 200000 ) {
        console.log('Hora de vender!!')
    } 

    else {
        console.log('Esperando...')
    }
}, process.env.CRAWLER_INTERVAL);
