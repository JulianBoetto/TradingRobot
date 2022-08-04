const mongoose = require("mongoose");

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const database = process.env.DB_NAME



let uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

async function connectDB() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database is connected!")
        })
        .catch((error) => console.log(error))
};

module.exports = connectDB