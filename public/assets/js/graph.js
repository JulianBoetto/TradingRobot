const form = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');
const ctx = document.getElementById("coinChart").getContext("2d");
document.getElementById("coinChart").style.display = 'none';
const spinner = document.getElementById("spinner");
spinner.style.display =  'none';

let coinName = "";
let connections = 0;


function showEle(elementId) {
  document.getElementById(elementId).style.display = 'flex';
}

function hideEle(elementId) {
  document.getElementById(elementId).style.display = 'none';
}

var options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        box1: {
          // Indicates the type of annotation
          type: 'box',
          xMin: 1,
          xMax: 2,
          yMin: 50,
          yMax: 70,
          backgroundColor: 'rgba(255, 99, 132, 0.25)'
        }
      }
    }
  }
};

const coinChartRef = new Chart(ctx, {
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

let ws;
function onConnectWS() {
  let num;

  if (connections && ws.readyState === 1) {
    ws.close()
    coinChartRef.data.labels = [];
    coinChartRef.data.datasets[0].data = [];
    coinNameElement.innerHTML = "";
    atualValue.innerHTML = "";
    percentual.innerHTML = "";
    showEle("spinner");
    hideEle("coinChart");
    coinChartRef.update();
    ws.onclose = (event) => {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        return onConnectWS()
      }
    }


  } else {
    ws = new WebSocket(`wss://stream.binance.com:9443/ws/ticker`);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [
          `${coinName}@ticker`
        ],
        "id": 1
      }));
    };


    num = 0;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.c) {
        connections = 1;
        num += 1
        data.time = num
        if(coinChartRef.data.labels.length - 1 >= 30) {
          coinChartRef.data.labels.shift();
          coinChartRef.data.datasets[0].data.shift();
          coinChartRef.data.labels.push(num);
          coinChartRef.data.datasets[0].data.push(Number(data.c));
          coinChartRef.update();
        } else {
          coinChartRef.data.labels.push(num);
          coinChartRef.data.datasets[0].data.push(Number(data.c));
          coinChartRef.update();
          showEle("coinChart");
          hideEle("spinner");
        }
        coinNameElement.innerHTML = data.s
        if(data.c < 10) {
          atualValue.innerHTML = Number(data.c).toLocaleString("en-US", { style: "currency", currency: "USD" , minimumFractionDigits: 6});
        } else {
          atualValue.innerHTML = Number(data.c).toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
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

    ws.onerror = function (event) {
      alert(`[error] ${error.message}`);
    };
  }
}


function getCoinName(event) {
  event.preventDefault()
  if (coinName !== form.query.value) {
    coinName = form.query.value
    hideEle("loader");
    showEle("spinner");
    onConnectWS();
  }
}

form.addEventListener("submit", (event) => getCoinName(event))