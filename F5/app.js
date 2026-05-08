'use strict';

const express = require('express');
const app = express();
const { Server } = require('socket.io');

app.use('/silverfisk', express.static(__dirname + '/clientscripts'));

const httpServer = app.listen(3002, function() {
    console.log('Server igång!');
});

const io = new Server(httpServer);


app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(req,res) {
    res.sendFile(__dirname + '/favicon.ico');
});

io.on('connection', function(socket) {

    console.log('En klient har anslutit via socket');

    socket.on('silver', function(data) {
        //console.log('Tjo!');

        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        io.emit('color' , { 'red': r, 'green': g, 'blue': b });


    });




});