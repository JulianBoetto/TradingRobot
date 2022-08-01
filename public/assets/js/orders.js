const tableBody = document.getElementById("tableBody");

console.log(tableBody.children)

// async function getOrders() {
//     const orders = await allOrders();
//     console.log(orders, "teste")
//     // console.log(teste())
// }

// getOrders()

// console.log( getOrders(), "teste")


// const allOrders = [
//     {
//         symbol: 'CVPUSDT',
//         orderId: 26836196,
//         orderListId: -1,
//         clientOrderId: 'web_5d10d14f95f347dea1c4dae2ca9796ef',
//         price: '0.90000000',
//         origQty: '27.60000000',
//         executedQty: '0.00000000',
//         cummulativeQuoteQty: '0.00000000',
//         status: 'NEW',
//         timeInForce: 'GTC',
//         type: 'LIMIT',
//         side: 'SELL',
//         stopPrice: '0.00000000',
//         icebergQty: '0.00000000',
//         time: 1657213741484,
//         updateTime: 1657213741484,
//         isWorking: true,
//         origQuoteOrderQty: '0.00000000'
//     },
//     {
//         symbol: 'MULTIUSDT',
//         orderId: 1956154,
//         orderListId: -1,
//         clientOrderId: 'electron_179b94fb621a4d56ac91c482c55',
//         price: '21.50000000',
//         origQty: '0.50300000',
//         executedQty: '0.00000000',
//         cummulativeQuoteQty: '0.00000000',
//         status: 'NEW',
//         timeInForce: 'GTC',
//         type: 'LIMIT',
//         side: 'SELL',
//         stopPrice: '0.00000000',
//         icebergQty: '0.00000000',
//         time: 1649252919980,
//         updateTime: 1649252919980,
//         isWorking: true,
//         origQuoteOrderQty: '0.00000000'
//     },
//     {
//         symbol: 'GALUSDT',
//         orderId: 6258749,
//         orderListId: -1,
//         clientOrderId: 'web_9ecb0b92b14d4cb1b5d656655b57397b',
//         price: '23.00000000',
//         origQty: '0.58900000',
//         executedQty: '0.00000000',
//         cummulativeQuoteQty: '0.00000000',
//         status: 'NEW',
//         timeInForce: 'GTC',
//         type: 'LIMIT',
//         side: 'SELL',
//         stopPrice: '0.00000000',
//         icebergQty: '0.00000000',
//         time: 1651803307776,
//         updateTime: 1651803307776,
//         isWorking: true,
//         origQuoteOrderQty: '0.00000000'
//     }
// ]


// allOrders.forEach((order, index) => {
//     console.log(order)
//     // const date = moment.unix(order.time).format("MM/DD/YYYY");
//     const total = Number(order.origQty) * Number(order.price)
//     let title = document.createElement("tr")
//     title.innerHTML = `<tr>
//     <th scope="row"></th>
//     <td>${order.symbol}</td>
//     <td>${order.side}</td>
//     <td>${Number(order.price.toLocaleString())}</td>
//     <td>${Number(order.origQty).toLocaleString()}</td>
//     <td>${total.toLocaleString()}</td>
// </tr>`;
//     tableTitle.appendChild(title);
// })
