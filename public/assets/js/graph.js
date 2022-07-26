const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');

let coinName = "btcusdt";

function showEle(elementId) {
  document.getElementById(elementId).style.display = 'flex';
}

function hideEle(elementId) {
  document.getElementById(elementId).style.display = 'none';
}

var ctx = document.getElementById("weatherChart").getContext("2d");
var options = {};

const weatherChartRef = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Coin graph",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
      spanGaps: false,
    }]
  },
  options: options
});

function onFetchTempSuccess() {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);

  ws.onopen = () => {
    connections = true
    ws.send(JSON.stringify({
      "method": "SUBSCRIBE",
      "params": [
        `${coinName}@ticker`
      ],
      "id": 1
    }));
  }

  let num = 0;

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if(data.c) {
      hideEle("loader");
      num += 1
      data.time = num
      weatherChartRef.data.labels.push(num);
      weatherChartRef.data.datasets[0].data.push(Number(data.c));
      weatherChartRef.update();
      coinNameElement.innerHTML = data.s
      atualValue.innerHTML = Number(data.c).toLocaleString("en-US", { style: "currency", currency: "USD" });
      if (data.p < 0) {
        percentual.classList.remove("text-success");
        percentual.classList.add("text-danger");
      } else {
        percentual.classList.remove("text-danger");
        percentual.classList.add("text-success");
      }
      percentual.innerHTML = `${data.P} %`
    }
  }
}

(
  showEle("loader"),
  onFetchTempSuccess
())