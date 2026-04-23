'use strict';

const fs = require('fs');

let filnamn = 'test.txt';

//Kolla att filen finns
fs.stat(filnamn, function (err, stats) {
    if(err) {
        err.message = "filen finns eh";
        return(console.error(err));
    }
    else {
        //Filen finns
        //Lägg lyssnare på filen
        fs.watch(filnamn, function() {
            console.log('Filen har ändrats!');
            console.log(fs.readFileSync(filnamn).toString());
        });
    }
});

