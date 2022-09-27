const api = require('../api');
const Symbols = require("../models/symbols");

class SymbolsController {
    async allSymbols(req, res) {
        try {
            const symbols = await Symbols.find();
            res.status(200).send(symbols);
        } catch (error) {
            res.status(401).send(error);
        }
    }

    async createSymbols(req, res) {
        try {
            const { symbol, pair } = req.body;
            symbol.toUpperCase();
            pair.toUpperCase();
            const newSymbol = `${symbol}${pair}`;
            const symbolIsValid = await api.priceTicker(newSymbol);
            if(symbolIsValid) {
                const symbols = await Symbols.create({ symbol, pair });
                res.status(200).send(symbols);
            } else {
                res.status(404).send("Symbol or pair not found")
            }
        } catch (error) {
            res.status(401).send(error);
        }
    }

    async removeSymbols(req, res) {
        try {
            const { symbol, pair } = req.params;
            symbol.toUpperCase();
            pair.toUpperCase();
            const symbols = await Symbols.deleteOne({ symbol: symbol, pair: pair });
            res.status(200).send(symbols);
        } catch (error) {
            res.status(401).send(error);
        }
    }
}

module.exports = SymbolsController;