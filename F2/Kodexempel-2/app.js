'use strict';

/*
    Demo — async/await och icke-blockerande I/O
    --------------------------------------------
    Vi startar en async-funktion som läser en stor fil och gör en tung
    beräkning.

*/

const fs = require('fs').promises;

async function bearbetaFil() {
    console.log('[1] Påbörjar fil-läsning');

    let innehall = await fs.readFile('stor-fil.txt', 'utf-8');
    console.log('[2] Filläsning KLAR');
    console.log('[3] Påbörjar tung beräkning');

    let antalA = 0;
    for(let i=0;i<500;i++) {
        for(let j=0; j<innehall.length;j++) {
            if(innehall[j]==='a' || innehall[j]==='A') {
                antalA++;
            }
        }
    }
    console.log('[4] Beräkning färdig, hittade ' + antalA + ' st a eller A');

}

bearbetaFil();

console.log('tadaaaaa');