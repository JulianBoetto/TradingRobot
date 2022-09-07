const express = require("express");
const router = express.Router();
const api = require('../api');
const Candle = require("../../src/lib/candle");

router.post("/", async (req, res) => {
    const { symbol, interval } = req.body;
    try {
        const klines = await api.klines(symbol, interval);
        const formatedKlines = klines.map(k => {
            return new Candle(k[0], k[1], k[2], k[3], k[4]);
        })
        res.status(200).send(formatedKlines);
    } catch (error) {
        res.status(401).send(error);
    }

})

module.exports = router;
