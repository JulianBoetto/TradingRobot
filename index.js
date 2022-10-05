import App from "./app.js";
import express from "express";
const app = express();
import router from "./src/routes/index.js";
import auth from "./src/routes/auth.js";
import order from "./src/routes/orders.js";
import chart from "./src/routes/chart.js";
import symbol from "./src/routes/symbols.js";
import cors from "./src/config/cors.js";
import { schedule } from 'node-cron';
import message from "./src/lib/messages.js";

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// app.use(require("cors")());
app.use(cors);

const PORT = process.env.PORT || 3002;

const appInstance = new App();

(async () => {
  await appInstance.readyDB();
  appInstance.listen();

  schedule('20 * * * * *', () => {
    message();
  });
})();

app.use("/", router);
app.use("/auth", auth);
app.use("/order", order);
app.use("/klines", chart);
app.use("/symbols", symbol);

app.listen(PORT, () => console.log(`Server run in http://localhost:${PORT}`));

export default appInstance;