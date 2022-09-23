const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symbolSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    pair: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Symbols = mongoose.model("Symbol", symbolSchema)

module.exports = Symbols;