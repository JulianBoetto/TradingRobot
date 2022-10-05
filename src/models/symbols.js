import mongoose from "mongoose";

const symbolSchema = mongoose.Schema({
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

export default Symbols;