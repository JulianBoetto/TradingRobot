import mongoose from "mongoose";

const accessTockenSchema = mongoose.Schema({
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

export default AccessToken;