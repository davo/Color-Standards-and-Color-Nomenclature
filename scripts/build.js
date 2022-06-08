const fs = require('fs');
const PaletteExtractor = require("./palette-extractor.js");
const {
  getSync
} = require("@andreekeberg/imagedata");

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


const {
  parseCSVString,
  romanToInt,
} = require ('./lib.js');

const RAWcsv = fs.readFileSync('./src/colornames.csv', 'utf8');
const list = parseCSVString(RAWcsv);

const wbMods = {
  'g': [70   ,  0  ],
  'f': [45   ,  0  ],
  'e': [32   ,  0  ],
  'd': [22.5 ,  0  ],
  'c': [15   ,  0  ],
  'b': [ 9.5 ,  0  ],
  'a': [ 5   ,  0  ],
  '-': [ 0   ,  0  ],
  'h': [ 0   , 26  ],
  'i': [ 0   , 45  ],
  'j': [ 0   , 49  ],
  'k': [ 0   , 70.5],
  'l': [ 0   , 80  ],
  'm': [ 0   , 87.5],
  'n': [ 0   , 94  ],
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


const exportList = list.entries.map((entry) => {
  // https://www.gutenberg.org/files/63087/63087-h/63087-h.htm#tones
  const neutralGrey = neutralGreyPercents[entry["Color or Hue Number"].split(/\d+/g)[1].length];
  const hueBase100 = parseInt(/\d+/g.exec(entry["Color or Hue Number"])[0]);
  const hueBase360 = hueBase100 * 3.6;

  const filename = entry['Static Image Link'].split('/').pop();

  const imgData = getSync(`./src/plate_swatches/${filename}`);
  console.log(`extracting colors from ${filename}`);
  const paletteExtractor = new PaletteExtractor();
  const extractedColors = paletteExtractor.processImageData(imgData.data, 1);
  const tone = wbModStringtoWB(entry['Tone']);
  
  const parsed = {
    hueBase100,
    hueBase360,
    toneWhitePercent: tone[0],
    toneBlackPercent: tone[1],
    neutralGreyPercent: neutralGrey,
    dominantColor: extractedColors[0],
    plateInt: romanToInt(entry["Plate"]),
  };

  const sanitizedEntry = {
    name: entry["Processed Color Name"],
    hex: extractedColors[0],
    plate: entry["Plate"],
    hue: entry["Color or Hue Number"],
    tone: entry["Tone"],
    image: filename,
    parsed
  };

  return sanitizedEntry;
});

// export the list as a JSON file
fs.writeFileSync('./dist/colornames.json', JSON.stringify(exportList, null, 2));

console.log(`Successfully exported ${exportList.length} colors to ./dist/colors.json`);