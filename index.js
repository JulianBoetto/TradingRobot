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
    const smaData = calculateSMA(data, 10);
    bollingerBands(data)
       
    // console.log({ time: moment(result[0][0]).format('YYYY-MM-DD'), open: parseFloat(result[0][1]), high: parseFloat(result[0][2]), low: parseFloat(result[0][3]), close: parseFloat(result[0][4]) })
    res.render('index', {data, symbol, smaData})
})
//@version=5
function bollingerBands(data) {
    indicator(shorttitle="BB", title="Bollinger Bands", overlay=true, timeframe="", timeframe_gaps=true)
    length = input.int(20, minval=1)
    // src = input(close, title="Source")
    // mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
    // basis = ta.sma(src, length)
    // dev = mult * ta.stdev(src, length)
    // upper = basis + dev
    // lower = basis - dev
    // offset = input.int(0, "Offset", minval = -500, maxval = 500)
    // plot(basis, "Basis", color=#FF6D00, offset = offset)
    // p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
    // p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
    // fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))




}

function calculateSMA(data, count){
    var avg = function(data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].close;
        }

        return sum / data.length;
    };
    var result = [];
    for (var i=count - 1, len=data.length; i < len; i++){
        var val = avg(data.slice(i - count + 1, i));
        result.push({ time: data[i].time, value: val});
    }

    return result;
}

app.listen(port, () => console.log(`Servidor funcionando. http://localhost:${port}`))