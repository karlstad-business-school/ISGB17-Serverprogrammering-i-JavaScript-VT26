'use strict';
const fs = require('fs');
const http = require('http');

exports.myBestWebAServerEver = function() {
  http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html' });
    //res.write('Tjio!');

    let html = fs.readFileSync("index.html").toString();
    res.write(html);

    res.end();
    

  }).listen(3001);

}