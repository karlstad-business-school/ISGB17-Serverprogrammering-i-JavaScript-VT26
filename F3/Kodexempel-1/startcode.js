const http = require('http');
const fs = require('fs');

http.createServer(function (request,response) {

    let fileToSend = '';

    if(request.url == '/') {
        fileToSend = 'index.html';
    } else {
        fileToSend = request.url;
        fileToSend = fileToSend.substring(1);

        console.log(request.url, fileToSend);
    }

    fs.stat(fileToSend, function(err, stats) {

        if(err) {
            response.writeHead(404, { 'Content-Type': 'text/html'}); //Response status code 404 Mediatype text/html
            response.end(err.message);
        } else {

            console.log(stats.isFile(), stats.size, stats.atime); 

            response.writeHead(200, {'Content-Type' : 'text/html'}); //Response status code 200, Mediatype text/html
            response.write(fs.readFileSync(fileToSend).toString());
            response.end();
        }
    });

}).listen(3000, function() {
    console.log('Webbserver uppe på port 3000!');
});
