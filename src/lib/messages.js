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
                    client.messages
                        .create({
                            body: `${historical.symbol} subió un ${historical.priceChangePercent}%. Su precio actual es de u$d ${historical.weightedAvgPrice}`,
                            messagingServiceSid: 'MG1ae02ff712f65fbeacb271a7ec100b0b',
                            to: `${process.env.WA_NUMBER}`
                        })
                        .then(res => console.log(res))
                        .done()
                }
            }
        });
    };

    if (orders) {
        sendMessage();
    }
};



module.exports = message;