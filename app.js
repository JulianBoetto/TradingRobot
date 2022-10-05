import database from './src/config/database.js';

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

export default App;