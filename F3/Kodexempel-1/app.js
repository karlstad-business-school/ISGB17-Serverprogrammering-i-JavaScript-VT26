'use strict';
const http = require('http');
const fs = require('fs');

  
  http.createServer(function (request, response) {

    let fileToSend = '';

    //console.log(request.url);

    if(request.url !== '/') {
      fileToSend = request.url.substring(1);
    } else {
      fileToSend = 'index.html';
    }

    fs.stat(fileToSend, function(err, stats) {

      if(err) {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end();
      } else {

        //Vilke filändelse har filen?
        let lastDot = fileToSend.lastIndexOf('.'); 
        let fileExtension = fileToSend.substring(lastDot + 1);

        switch(fileExtension) {

          case 'png':
            response.writeHead(200, {'Content-Type': 'image/png'});
            fileToSend = fs.readFileSync(fileToSend);
            break;
            
          default: 
            response.writeHead(200, {'Content-Type': 'text/html'});
            fileToSend = fs.readFileSync(fileToSend).toString();
            break;

        }

        response.write(fileToSend);
        response.end();

      }
    });

    
  }).listen(3000, function() {
    console.log('Servern körs på port 3000!');
  });



