const socket = io();
const Pusher = require('pusher');

const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');
// console.log(atualValue)



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


document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#reportsChart"), {
      series: [{
        name: 'Sales',
        data: [31, 40, 28, 51, 42, 82, 56],
      }],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false
        },
      },
      markers: {
        size: 4
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d'],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    }).render();
  });


// form.addEventListener("submit", (event) => {
//     getCoin(event)
// });