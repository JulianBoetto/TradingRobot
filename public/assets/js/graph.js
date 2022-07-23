const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

const atualValue = document.getElementById('atualValue');
const percentual = document.getElementById('percentual');
// console.log(atualValue)

socket.on('chat message', function(msg) {
    // var item = document.createElement('p');
    console.log(msg)
    if(msg.c) {
        atualValue.innerHTML = Number(msg.c).toLocaleString("en-US", {style:"currency", currency:"USD"});
        percentual.innerHTML = `${msg.P} %`
    }
    window.scrollTo(0, document.body.scrollHeight);
});