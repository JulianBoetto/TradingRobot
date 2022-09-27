const App = require("./app");
const express = require("express");
const bodyParser = require('body-parser');;
const { json } = require('express');
const app = express(json);
const router = require("./src/routes/index");
const auth = require("./src/routes/auth");
const order = require("./src/routes/orders");
const chart = require("./src/routes/chart");
const symbol = require("./src/routes/symbols");
const cors = require("./src/config/cors")
const cron = require('node-cron');
const message = require("./src/lib/messages");

app.use(bodyParser.json());
// app.use(require("cors")());
app.use(cors);

const PORT = process.env.PORT || 3002;

const appInstance = new App();

(async () => {
  await appInstance.readyDB();
  appInstance.listen();

  cron.schedule('20 * * * * *', () => {
    message();
  });
})();

app.use("/", router);
app.use("/auth", auth);
app.use("/order", order);
app.use("/klines", chart);
app.use("/symbols", symbol);

app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`));

module.exports = appInstance;