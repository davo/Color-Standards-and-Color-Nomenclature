const fs = require('fs');

const {
  parseCSVString,
  convertHwbToRgb,
  rgbToHex
} = require ('./lib.js');

const RAWcsv = fs.readFileSync('./src/colornames.csv', 'utf8');
const list = parseCSVString(RAWcsv);

const wbMods = {
  'g': [70, 0],
  'f': [45, 0],
  'e': [32, 0],
  'd': [22.5, 0],
  'c': [15, 0],
  'b': [9.5,0],
  'a': [5, 0],
  '-': [0, 0],
  'h': [0, 26],
  'i': [0, 45],
  'j': [0, 49],
  'k': [0, 70.5],
  'l': [0, 80],
  'm': [0, 87.5],
  'n': [0, 94],
};

const neutralGreyPercents = [
  0, 32, 58, 77, 90, 95.5, 100
]

function wbModStringtoWB(str){
  if (wbMods.hasOwnProperty(str)){
    return wbMods[str];
  } else {
    return [0, 0];
  }
}

const exportList = list.entries.map(entry => {
  // https://www.gutenberg.org/files/63087/63087-h/63087-h.htm#tones
  const neutralGrey = neutralGreyPercents[entry["Color or Hue Number"].split(/\d+/g)[1].length];
  const hueBase100 = parseInt(/\d+/g.exec(entry["Color or Hue Number"])[0]);
  const hueBase360 = hueBase100 * 3.6;

  const tone = wbModStringtoWB(entry['Tone']);

  entry.parsed = {
    hueBase100,
    hueBase360,
    toneWhite: tone[0],
    toneBlack: tone[1],
  }
  return entry
});

// export the list as a JSON file
fs.writeFileSync('./dist/colornames.json', JSON.stringify(exportList, null, 2));
