const socket = io();

const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');
// console.log(atualValue)


// const Pusher = require('pusher');

let coinName = "btcusdt";


socket.on('coin', function(msg) {        
    if(msg.c) {
        // console.log(msg)
        atualValue.innerHTML = Number(msg.c).toLocaleString("en-US", {style:"currency", currency:"USD"});
        if(msg.p < 0) {
            percentual.classList.remove("text-success");
            percentual.classList.add("text-danger");
        } else {
            percentual.classList.remove("text-danger");
            percentual.classList.add("text-success");
        }
        percentual.innerHTML = `${msg.P} %`
        coinNameElement.innerHTML = msg.s
        
    }
}); 

var londonTempData = {
    city: 'London',
    unit: 'celsius',
    dataPoints: [
      {
        time: 1130,
        temperature: 12 
      },
      {
        time: 1200,
        temperature: 13 
      },
      {
        time: 1230,
        temperature: 15 
      },
      {
        time: 1300,
        temperature: 14 
      },
      {
        time: 1330,
        temperature: 15 
      },
      {
        time: 1406,
        temperature: 12 
      },
    ]
  }

function showEle(elementId){
  document.getElementById(elementId).style.display = 'flex';
}

function hideEle(elementId){
  document.getElementById(elementId).style.display = 'none';
}

function renderWeatherChart(weatherData) {
    var ctx = document.getElementById("weatherChart").getContext("2d");
    var options = { };
    weatherChartRef = new Chart(ctx, {
      type: "line",
      data: weatherData,
      options: options
    });
 }

 var chartConfig = {
    labels: [],
    datasets: [
       {
          label: "London Weather",
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
       }
    ]
 };

 function onFetchTempSuccess(){
    hideEle("loader");
    // var londonTempData = londonTempData;
    console.log(londonTempData)
    chartConfig.labels = londonTempData.dataPoints.map(dataPoint => dataPoint.time);
    chartConfig.datasets[0].data = londonTempData.dataPoints.map(dataPoint => dataPoint.temperature);
    renderWeatherChart(chartConfig)
  }
  
  
(
  showEle("loader"),
  onFetchTempSuccess
())