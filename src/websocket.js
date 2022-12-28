import WebSocket, { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });
// let ws_send_kline;

// wss.on('connection', function connection(ws) {
//     console.log("conectado Front")
//     // console.log(wss)
//     // ws.on('message', function message(data) {
//         //     console.log('received: %s', data);
//         // });
        
//         // ws.send('something');

//     ws_send_kline = ws
//     // setInterval(() => {
//     //     console.log(symbol, interval)
//     //     ws.send(kline);
//     // }, 1000)
// });

let kline = [];

function onConnectWS(symbol, interval) {

    const ws_binance = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

    ws_binance.on('open', function open() {
        // ws.send('something');
        console.log("conected to Binance")
    });

    ws_binance.on('message', function message(event) {
        const data = JSON.parse(event)
        // kline = JSON.stringify(data)
        // ws_send_kline.send(kline);
        // console.log(kline);
    });
    
    

}

export {
    onConnectWS
}