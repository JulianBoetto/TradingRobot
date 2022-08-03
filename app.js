// const app = require("./index");
const database = require('./src/config/database');

class App {
    async readyDB() {
        try {
            const connection = await database();
            return "Database is connected!"
        } catch (error) {
            console.log(error)
        }
    }

    async listen() {
        return `App starting in ${process.env.NODE_ENV} mode`;
    }
}

module.exports = App;