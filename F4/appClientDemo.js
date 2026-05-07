'use strict';

//En enkel klient som genomför GET anrop.
//Inspirerad av nodes egen webb

/*
  1. Inkludera http
  2. Skapa objektet options (ett object literal)
  3. Anropa request med options och callback function
  4. Lyssna för data på response
  5. Lyssna för error på request
  6. Avsluta request

  Öppna två terminaler och starta er webbserver via en:
  node --watch app.js
  
  och er klient via den andra terminalen
  node appClientDemo.js

  Studera vad du får tillbaka i terminalen för appClientDemo
*/
//1.
const http = require('http');

//2.
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST'
};

//3.
let httpRequest = http.request( options, function( response ) {

  //4.
  response.on('data', function (data) {
    console.log(data);
    console.log(data, data.toString() ); 
    console.log('Data mottagen! ', new Date().toUTCString() );
  });

});

//5.
httpRequest.on('error', function (error) {
  console.log('Något gick fel!');
  console.log(error);
});


//6.
httpRequest.end();
