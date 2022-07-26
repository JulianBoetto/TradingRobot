const socket = io();

const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinNameElement = document.getElementById('coinName');
// console.log(atualValue)



// function getCoin(e) {
    let coinName = "btcusdt";

    // e.preventDefault()
    // if(form.query.value) {
    //     coinName = form.query.value
    // }
    // console.log(form.query.value)
    // socket.on("coin name", function() {
        // socket.emit("coin name", coinName)
    // })
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
// }


// form.addEventListener("submit", (event) => {
//     getCoin(event)
// });