import { klines as _klines } from '../api.js';
import Candle from "../../src/lib/candle.js";
import { sma, ema, rsi, macd } from "../lib/indicators.js";
import { onConnectWS } from "../websocket.js";

let data = [];

class ChartController {
    async klines(req, res) {
        const { symbol, interval } = req.body;
        try {
            // onConnectWS(symbol, interval);
            const klines = await _klines(symbol, interval);
            const formatedKlines = klines.map(k => {
                return new Candle(k[0], k[1], k[2], k[3], k[4]);
            });
            const sma_historic = await sma(formatedKlines);
            const ema_historic = await ema(sma_historic);
            const rsi_historic = await rsi(ema_historic);
            const historic = await macd(rsi_historic);

            res.status(200).send(historic);
        } catch (error) {
            res.status(401).send(error);
        }    
    };
}

export default ChartController;