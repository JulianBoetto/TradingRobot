const socket = io();

const form = document.getElementById('searchForm');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
const coinName = document.getElementById('coinName');
// console.log(atualValue)



function getCoin(e) {
    e.preventDefault()
    if(form.query.value) {
        const coinName = form.query.value
    }
    // console.log(form.query.value)
    // socket.on("coin name", function() {
        socket.emit("coin name", "teste")
    // })
    socket.on('chat message', function(msg) {        
        if(msg.c) {
            // console.log(msg)
            atualValue.innerHTML = Number(msg.c).toLocaleString("en-US", {style:"currency", currency:"USD"});
            percentual.innerHTML = `${msg.P} %`
            coinName.innerHTML = msg.s
        }
    });    
}


form.addEventListener("submit", (event) => {
    getCoin(event)
});