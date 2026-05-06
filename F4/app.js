'use strict';

/*
    Skapa ett projekt: npm init
    Installera express: npm install express
    Installera jsdom: npm install jsdom

    1. Starta en webbserver som svarar på port 3000
    2. Lägg till ett middleware för att exponera lämplig mapp (se form.html och katalogstruktur)
    3. Lägg till ett middleware för att kunna avkoda data från formulär (se form.html)

    4. Lägg till endpoint på / för get
    4.1 Vid anrop skicka asynkront form.html till klienten. 
    4.2 Om något går fel returnera felet till klienten och skriv lämlig utdata till konsolen.
    4.3 Om allt gick bra skriv lämplig utdata till konsolen.

    5. Lägg till endpoint på / för post
    5.1 Använd undantagshantering och kontrollera indata för undefined, tomt, numeriskt värde, värde mellan 0-255.
    5.2 Om något utvärderas till true ska ett undantag kastas. 
    5.3 Om ett undantag har kastas skapa en server DOM av form.html (läs in med asynkon metod och hantera enligt 4.2-4.3) och om det har inkommit några värden återplacera dessa i respektive element.
    5.4 Till elementet med id errorMsg skriv ut texten i undantaget som har kastats.
    5.5 Skicka den modifierade server DOM till anropande klient.
    5.6 Om inget har utvärderats till false skapa en server DOM av index.html (läs in med asynkon metod och hantera enligt 4.2-4.3).
    5.7 Modifiera elmentet med id status till att erhålla en backgrundsfärg (rgb()) baserad på inkommande värden.
    5.8 Skicka den modifierade server DOM till anropande klient.
    
    För att testa er lösning använd både webbläsare och Postman.

    F4
    1. Installer cookie-parser: npm install cookie-parser (titta i package.json om modulen nu finns med)
    2. Lägg till cookie-parser som middelware
    3. Till klienten skicka ner kakorna red, green och blue när alla villkor för valideringen uppfylls.
    4. Modifera endpoint /reset och endpoint /start så att kakor blir en del av dessa.

    node --watch app.js
    Vi testar med webbläsare, Postman och egen klient som vi skapar i node.js

*/

const express = require('express');
const jsdom = require('jsdom');

const fs = require('fs');

const app = express();

app.listen(3000, function() {
    console.log('Servern körs på port 3000!');
});

app.use('/openDir', express.static(__dirname + '/lostFiles'));
app.use(express.urlencoded( {extended : true} ));

app.get('/', function(request, response) {

    response.sendFile(__dirname + '/lostFiles/html/form.html', function( err) {

        if (err) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log('Det gick att skicka form.html till klienten!');
        }

    });

});

app.post('/', function( request, response) {

    let red = 0, green = 0, blue = 0;

    try {
        
        console.log( request.body );

        if( request.body === undefined) {
            throw new Error('Ingen data till servern!');
        }

        if( request.body.red === undefined || request.body.green === undefined || request.body.blue === undefined) {
            throw new Error('Saknar indata för röd, grön eller blå!');
        }

        red = request.body.red.trim();
        green = request.body.green.trim();
        blue = request.body.blue.trim();
        
        if( red.length === 0 || green.lenght === 0 || blue.length === 0) {
            throw new Error('Saknar fortfarande indata för röd, grön eller blå (ngt innehåll whitespace)!');
        }

        if( isNaN(red) || isNaN(green)|| isNaN(blue)) {
            throw new Error('Indata är inte ngt som går att ändra till heltal!');
        }

        red = parseInt(red);
        green = parseInt(green);
        blue = parseInt(blue);

        if( (red < 0 || red > 255) || (green < 0 || green > 255) || (blue < 0 || blue > 255) ) {
            throw new Error('Indata ska återfinnas mellan 0 och 255!');
        }

        fs.readFile(__dirname + '/lostFiles/html/index.html', function(err, data) {

            if( err ) {
                console.log(err.message);
                response.send(err.message)
            } else {

                console.log('Det gick att läsa index.html!');
                let serverDOM = new jsdom.JSDOM( data );

                serverDOM.window.document.querySelector('#status').style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')';

                data = serverDOM.serialize();

                console.log('Det gick att läsa filen index.html skickar nu till klienten!');
                response.send( data );
            }

        });


    } catch(oError) {
       fs.readFile(__dirname + '/lostFiles/html/form.html', function(err, data) {

            if( err ) {
                console.log(err.message);
                response.send(err.message)
            } else {

                let serverDOM = new jsdom.JSDOM( data );

                if(red !== undefined) {
                    serverDOM.window.document.querySelector('[name=red').setAttribute('value', red.toString());                
                }

                if(green !== undefined) {
                    serverDOM.window.document.querySelector('[name=green').setAttribute('value', green.toString());                
                }

                if(blue !== undefined) {
                    serverDOM.window.document.querySelector('[name=blue').setAttribute('value', blue.toString());                
                }

                serverDOM.window.document.querySelector('#errorMsg').textContent = oError.message;

                data = serverDOM.serialize();

                console.log( oError.message );
                console.log('Det gick att läsa form.html skickar nu till klienten!');

                response.send( data );
            }

        });
    }
});

app.get('/reset', function(request, response) {

    //Här kommer mer i samband med kakor!
    console.log('Skickar en redirect till rooten till klienten!');
    response.redirect('/');

});

app.get('/start', function(request, response) {
   
    //Här kommer vi ändra i samband med kakor!

    response.sendFile(__dirname + '/lostFiles/html/index.html', function( err) {

        if (err) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log('Det gick att skicka filen index.html till klienten!');
        }

    });
});

app.get('/favicon.ico', function(request, response) {

     response.sendFile(__dirname + '/lostFiles/ico/favicon.ico', function( err) {

        if (err) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log('Det gick att skicka filen favicon.ico till klienten!');
        }

    });

});


