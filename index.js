import { join } from "path";
import express, { json } from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express(json);
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.set("view engine","jade");
const PORT = process.env.PORT || 3000;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;
import { allOrders } from "./api.js"


app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname, teste: "teste" })
});

app.get('/profile', (req, res) => {
    res.sendFile('views/users-profile.html', { root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile('views/pages-contact.html', { root: __dirname })
});

app.get('/orders', async (req, res) => {
    try {
        // const allOrdersData = await allOrders()
        // console.log(allOrdersData)
        res.sendFile('views/orders.html', { root: __dirname })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`))