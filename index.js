const api = require('./api');
const path = require("path");
const express = require("express");
const { json } = require('express');
const app = express(json);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
const PORT = process.env.PORT || 3000;
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;


app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname, teste: "teste" })
});

app.get('/profile', (req, res) => {
    res.sendFile('views/users-profile.html', { root: __dirname })
});

app.get('/contact', (req, res) => {
    res.sendFile('views/pages-contact.html', { root: __dirname })
});

app.get('/trading', async (req, res) => {
    try {
        res.sendFile('views/trading.html', { root: __dirname })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`))