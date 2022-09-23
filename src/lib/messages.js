const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const Symbols = require("../models/symbols");
const api = require("../api");


async function message() {
    const orders = await Symbols.find();
    const getValue = symbol =>
        new Promise(resolve =>
            resolve(api.priceTicker24h(symbol))
        );

    const sendMessage = async () => {
        orders.forEach(async order => {
            const symbol = `${order.symbol}${order.pair}`;
            const historical = await getValue(symbol);
            if (historical) {
                if (parseFloat(historical.priceChangePercent) >= 10) {
                    console.log(historical.symbol)
                    client.messages
                        .create({
                            body: `${historical.symbol} subió un ${historical.priceChangePercent}%. Su precio actual es de u$d ${historical.weightedAvgPrice}`,
                            from: 'whatsapp:+14155238886',
                            to: `whatsapp:${process.env.WA_NUMBER}`
                        })
                        .done()
                }
            }
        });
    };

    if (orders) {
        sendMessage();
    }


    // {
    //     symbol: 'QTUMBTC',
    //     orderId: 323477904,
    //     orderListId: -1,
    //     clientOrderId: 'web_603d63b175bf4c038d3ba28a70d02bf1',
    //     price: '0.00021900',
    //     origQty: '2.70000000',
    //     executedQty: '0.00000000',
    //     cummulativeQuoteQty: '0.00000000',
    //     status: 'NEW',
    //     timeInForce: 'GTC',
    //     type: 'LIMIT',
    //     side: 'SELL',
    //     stopPrice: '0.00000000',
    //     icebergQty: '0.00000000',
    //     time: 1660824709647,
    //     updateTime: 1660824709647,
    //     isWorking: true,
    //     origQuoteOrderQty: '0.00000000'
    //   }
};



module.exports = message;