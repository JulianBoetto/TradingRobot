import { klines as _klines } from '../api.js';
import Candle from "../../src/lib/candle.js";
import { sma } from "../lib/indicators.js";

let data = [];

class ChartController {
    async klines(req, res) {
        const { symbol, interval } = req.body;
        try {
            const klines = await _klines(symbol, interval);
            const formatedKlines = klines.map(k => {
                return new Candle(k[0], k[1], k[2], k[3], k[4]);
            });
            const sma_historic = await sma(formatedKlines);
            res.status(200).send(sma_historic);
        } catch (error) {
            res.status(401).send(error);
        }    
    };

    // async 
}

export default ChartController;