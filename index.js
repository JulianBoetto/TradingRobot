const api = require('./src/api');
const App = require("./app");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer();
const { json } = require('express');
const app = express(json);
const moment = require('moment');
const AuthController = require("./src/controllers/authController");
const authController = new AuthController;
const validateToken = require("./src/lib/password");
app.use(bodyParser.json());
app.use(require("cors")());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  //   res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("X-Powered-By", "ZendServer 8.5.0,ASP.NET");
  next();
});
const PORT = process.env.PORT || 3002;

const appInstance = new App();

(async () => {
  await appInstance.readyDB();
  appInstance.listen();
})();


app.get('/', (req, res) => {
  res.status(200).send("Server run!")
});

app.post("/auth", async (req, res) => {
  const token = await authController.login(req.body)
  if (token.statusCode) {
    res.status(token.statusCode).send({ error: token.message })
  } else {
    res.status(200).send(token)
  };
});

// app.post("/register", async (req, res) => {
//     const token = await authController.register(req.body)
//     if (token.statusCode) {
//         res.status(token.statusCode).send(token.message)
//     } else {
//         res.status(200).send(token)
//     };
// });

// app.get('/profile', (req, res) => {
//     // res.sendFile('views/users-profile.html', { root: __dirname })
// });

// app.get('/contact', (req, res) => {
//     // res.sendFile('views/pages-contact.html', { root: __dirname })
// });

app.get('/orders', async (req, res) => {
  try {
    const orders = await api.allOrders();
    orders.map(order => {
      order.formatTime = moment(order.time).format("DD/MM/YYYY"),
        order.total = parseFloat((Number(order.price) * Number(order.origQty)).toFixed(5)),
        order.price = parseFloat(Number(order.price).toFixed(5))
      order.origQty = parseFloat(Number(order.origQty).toFixed(5))
    });
    orders.sort((a, b) => {
      return moment(b.formatTime, "DD/MM/YYYY") - moment(a.formatTime, "DD/MM/YYYY")
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(401).send(error);
  }
});

app.post('/order/:id', async (req, res) => {
  try {
    const symbol = req.params.id;
    const { price, origQty } = req.body;
    let totalValue = 0;
    let historic = await api.allTrades(symbol);
    historic.map(history => {
      let quoteQty = Number(history.quoteQty);
      let commission = Number(history.commission);
      if (history.isBuyer) {
        totalValue -= quoteQty
      } else {
        totalValue += quoteQty
      }
      history.time = moment(history.time).format("DD/MM/YY")
      history.price = parseFloat((Number(history.price)).toFixed(5))
      history.commission = parseFloat((Number(history.commission)).toFixed(5))
      history.qty = parseFloat((Number(history.qty)).toFixed(5))
      history.quoteQty = parseFloat((Number(history.quoteQty)).toFixed(5))
    });

    totalValue = parseFloat(totalValue.toFixed(2))
    // const orderPrice = parseFloat(Number(price).toFixed(5));
    // const actualPrice = parseFloat(Number(coinPrice.price).toFixed(5));
    // const diff = parseFloat((actualPrice - orderPrice).toFixed(5));
    // const percentualDiff = (diff * 100) / actualPrice
    // const order = {
    //   symbol,
    //   actualPrice,
    //   diff,
    //   percentualDiff,
    //   orderPrice,
    // }

    // console.log(coinPrice);

    res.status(200).send({ historic, totalValue });
  } catch (error) {
    res.status(401).send(error);
  }
});



app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`));

module.exports = appInstance