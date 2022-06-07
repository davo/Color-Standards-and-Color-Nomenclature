

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

module.exports = {
  parseCSVString
};