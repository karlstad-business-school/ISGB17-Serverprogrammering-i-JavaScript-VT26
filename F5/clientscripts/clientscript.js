'use strict';
const socket = io();

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('.btn').addEventListener('click', buttonClicked);
});

function buttonClicked() {

    socket.emit('silver', null);

}

socket.on('color', function(data) {
    document.querySelector('body').style.backgroundColor = 'rgb(' + data.red + ',' + data.green + ',' + data.blue + ')';
});

