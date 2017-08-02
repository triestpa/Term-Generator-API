const fs = require('fs')
const readline = require('readline')
const creatures = new Set()

const readStream = fs.createReadStream('./data/mythological-creatures.txt', 'utf8');
const lineReader = readline.createInterface({ input: readStream })
const wstream = fs.createWriteStream('./data/mythological-creatures-tmp.txt');

lineReader.on('line', function (line) {
    if (!creatures.has(line)) {
      creatures.add(line)
      wstream.write(`${line}\n`);
    }
})