const api = require('./api');
const express = require('express')
const moment = require('moment')
const port = 3000
const app = express()
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);
const coin = process.env.COIN;
const goodBuy = process.env.GOOD_BUY;
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

let data;
app.get('/', async (req,res) =>{
    const result = await api.historicData(symbol)
    data = result.map(result => ({ time: moment(result[0]).utc().format('YYYY-MM-DD'), open: parseFloat(result[1]), high: parseFloat(result[2]), low: parseFloat(result[3]), close: parseFloat(result[4]) }))

    // console.log({ time: moment(result[0][0]).format('YYYY-MM-DD'), open: parseFloat(result[0][1]), high: parseFloat(result[0][2]), low: parseFloat(result[0][3]), close: parseFloat(result[0][4]) })
    res.render('index', {data, symbol})
})

app.listen(port, () => console.log(`Servidor funcionando. http://localhost:${port}`))