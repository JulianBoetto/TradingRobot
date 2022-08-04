const mongoose = require("mongoose");

let uri = process.env.DB_MONGO_URI;

async function connectDB() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database is connected!")
        })
        .catch((error) => console.log(error))
};

module.exports = connectDB