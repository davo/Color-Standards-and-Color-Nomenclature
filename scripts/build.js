const fs = require('fs');

const {
  parseCSVString
} = require ('./lib.js');

const RAWcsv = fs.readFileSync('./src/colornames.csv', 'utf8');
const list = parseCSVString(RAWcsv);

fs.writeFileSync('./dist/colornames.json', JSON.stringify(list.entries, null, 2));