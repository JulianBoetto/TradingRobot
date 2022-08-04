const WebSocket = require('ws');
const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);

function onConnectWS(symbol) {

    ws.onopen = () => {
        ws.send(JSON.stringify({
            "method": "SUBSCRIBE",
            "params": [
                `${symbol}@ticker`
            ],
            "id": 1
        }));
    };

    ws.onmessage = (event) => {
        console.log(event)
        const data = JSON.parse(event.data)
        if (data.c) {
            console.log(data.c)
        }
    }

    ws.onerror = (event) => {
        console.log(event)
        alert(`[error] ${error.message}`);
    };

}

module.exports = {
    onConnectWS
}