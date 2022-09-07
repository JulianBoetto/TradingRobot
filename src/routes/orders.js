const express = require("express");
const router = express.Router();
const api = require('../api');
const moment = require("moment");

router.get('/allOrders', async (req, res) => {
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

// router.post('/:id', async (req, res) => {
//     try {
//         const symbol = req.params.id;

//         let historic = await api.allTrades(symbol);
//         // historic.map(history => {
//         //   let quoteQty = Number(history.quoteQty);
//         //   let commission = Number(history.commission);
//         //   let qty = Number(history.qty);
//         //   if (history.isBuyer) {
//         //     totalValue -= quoteQty;
//         //     // totalQty += qty;
//         //     totalQty += (qty - commission);
//         //   } else {
//         //     totalValue += quoteQty;
//         //     totalQty -= qty;
//         //     // totalQty -= (qty + commission);
//         //   }
//         //   history.time = moment(history.time).format("DD/MM/YY")
//         //   history.price = parseFloat((Number(history.price)).toFixed(5))
//         //   history.commission = parseFloat((Number(history.commission)).toFixed(5))
//         //   history.qty = parseFloat((Number(history.qty)).toFixed(5))
//         //   history.quoteQty = parseFloat((Number(history.quoteQty)).toFixed(5))
//         // });

//         // totalValue = parseFloat(totalValue.toFixed(5));
//         // totalQty = parseFloat(totalQty.toFixed(5));

//         // res.status(200).send({ historic, totalValue, totalQty });
//     } catch (error) {
//         res.status(401).send(error);
//     }
// });

router.post('/historic/:id', async (req, res) => {
    try {
        const symbol = req.params.id;
        const { price, origQty } = req.body;
        let totalValue = 0;
        let totalQty = 0;
        let historic = await api.allTrades(symbol);
        historic.map(history => {
            let quoteQty = Number(history.quoteQty);
            let commission = Number(history.commission);
            let qty = Number(history.qty);
            if (history.isBuyer) {
                totalValue -= quoteQty;
                // totalQty += qty;
                totalQty += (qty - commission);
            } else {
                totalValue += quoteQty;
                totalQty -= qty;
                // totalQty -= (qty + commission);
            }
            history.time = moment(history.time).format("DD/MM/YY")
            history.price = parseFloat((Number(history.price)).toFixed(5))
            history.commission = parseFloat((Number(history.commission)).toFixed(5))
            history.qty = parseFloat((Number(history.qty)).toFixed(5))
            history.quoteQty = parseFloat((Number(history.quoteQty)).toFixed(5))
        });

        totalValue = parseFloat(totalValue.toFixed(5));
        totalQty = parseFloat(totalQty.toFixed(5));

        res.status(200).send({ historic, totalValue, totalQty });
    } catch (error) {
        res.status(401).send(error);
    }
});

module.exports = router;