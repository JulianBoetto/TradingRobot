const { MongoClient } = require('mongodb');

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;



let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
    
        const database = client.db("teste");
        const filmes_db = database.collection("filmes");

        const filmes = filmes_db.find({}); 

        await filmes.forEach(doc => console.dir(doc));
    } 
    finally {
        await client.close();
    }
}

module.exports = connectDB