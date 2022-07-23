const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

socket.on('chat message', function(msg) {
    var item = document.createElement('p');
    // console.log(msg.c)
    if(msg.c) {
        item.textContent = Number(msg.c).toLocaleString("en-US", {style:"currency", currency:"USD"});;
        messages.appendChild(item);
    }
    window.scrollTo(0, document.body.scrollHeight);
});