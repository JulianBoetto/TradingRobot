const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import Symbols from "../models/symbols.js";
import { priceTicker24h } from "../api.js";
import Twilio from "twilio";

const client = new Twilio(accountSid, authToken);

async function message() {
    const orders = await Symbols.find();
    const getValue = symbol =>
        new Promise(resolve =>
            resolve(priceTicker24h(symbol))
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



export default message;