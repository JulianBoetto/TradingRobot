const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessTockenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    authorizationToken: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AccessToken = mongoose.model("AccessToken", accessTockenSchema);

module.exports = AccessToken;