const database = require('./src/config/database');

class App {
    async readyDB() {
        try {
            return await database();
        } catch (error) {
            console.log(error)
        }
    }

    async listen() {
        return console.log(`App starting in ${process.env.NODE_ENV} mode`);
    }
}

module.exports = App;