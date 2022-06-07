

/**
 * takes a CSV string an parse it
 * @param   {String} csvString    CSV file contents
 * @param   {String} csvDelimitor
 * @param   {String} csvNewLine
 * @return {Object} Object with all entries, headers as Array,
 *                   and entires per header as Array
 */
function parseCSVString (csvString, csvDelimitor = ',', csvNewLine = '\r\n') {
  const rows = csvString.split(csvNewLine);

  // remove last empty row (if there is any)
  if (!rows.slice(-1)[0]) {
    rows.pop();
  }

  // extracts all the CSV headers
  const headers = rows.shift().split(csvDelimitor);

  // collection of values per row
  const values = {};

  headers.forEach((header) => {
    values[header] = [];
  });

  const entries = rows.map((row) => {
    // decomposes each row into its single entries
    const rowArr = row.split(csvDelimitor);

    // creates an object for for each entry
    const entry = {};

    // populates the entries
    headers.forEach((header, i) => {
      const value = rowArr[i];
      entry[header] = value;

      // collects values
      values[header].push(value);
    });

    return entry;
  });

  return {
    headers,
    entries,
    values
  };
}

// https://jsfiddle.net/seamusleahy/12eL2qse/
function convertHwbToRgb(hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1] / 100;
  var bl = hwb[2] / 100;
  var ratio = wh + bl;
  var i;
  var v;
  var f;
  var n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  n = wh + f * (v - wh); // linear interpolation

  var r;
  var g;
  var b;
  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgbArr) {
  const [r, g, b] = rgbArr;
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


module.exports = {
  parseCSVString,
  convertHwbToRgb,
  rgbToHex
};