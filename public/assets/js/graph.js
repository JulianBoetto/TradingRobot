const socket = io();

const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');

let coinName = "btcusdt";

function showEle(elementId){
  document.getElementById(elementId).style.display = 'flex';
}

function hideEle(elementId){
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

 function onFetchTempSuccess(){
  }

socket.on('coin', function(msg) {        
  if(msg.c) {
    coinNameElement.innerHTML = msg.s
    weatherChartRef.data.labels.push(msg.time);
    weatherChartRef.data.datasets[0].data.push(msg.c);
    
    // if(weatherChartRef.data.datasets[0].data.length === 30) {
    //   weatherChartRef.data.labels = [];
    //   weatherChartRef.data.datasets[0].data = [];
    // }

    weatherChartRef.update();
    atualValue.innerHTML = Number(msg.c).toLocaleString("en-US", {style:"currency", currency:"USD"});
    hideEle("loader");
    if(msg.p < 0) {
        percentual.classList.remove("text-success");
        percentual.classList.add("text-danger");
    } else {
        percentual.classList.remove("text-danger");
        percentual.classList.add("text-success");
    }
    percentual.innerHTML = `${msg.P} %`
  }
}); 
  
  
(
  showEle("loader"),
  onFetchTempSuccess
())