const fs = require('fs')
const readline = require('readline')


const readStream = fs.createReadStream('./data/characteristics.txt', 'utf8');
const lineReader = readline.createInterface({ input: readStream })

const wstream = fs.createWriteStream('./data/characteristics-tmp.txt');

lineReader.on('line', function (line) {
    line = titleCase(line)
    wstream.write(`${line}\n`);
})

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
}
