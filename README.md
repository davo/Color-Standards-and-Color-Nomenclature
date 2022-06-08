# Robert Ridgway's: Color Standards and Color Nomenclature
Converting a 100 year old book into a set of colors and color names.

## Motivation

Color Standards and Color Nomenclature, by Robert Ridgway (1850-1929) was published in Washignton, DC in 1912, it's part of the public domain in the USA. In August 31, 2020 was added to the Gutenberg Project.

The book full title "Color Standards and Color Nomenclature: With fifty-three colored plates and eleven hundred and fifteen named colors" clearly informs about the magnitud and spectrum of pigments, naming conventions and categories embedded in the book.

The end goal is to add the collection to [@meodai's Color Names](https://github.com/meodai/color-names).

## Data

The parsed colors are exported into [colornames.json](./dist/colornames.json). 
It is an array of objects sorted by the color names.

```js
[
  {
    // Normalized Color-Name
    "name": "Absinthe Green",
    
    // Dominant color extracted from the original color-swatch
    "hex": "#a6b46c",
    
    // The color-swatches are grouped by hue on organized on plates
    // labeled using roman numbers (the parsed int is contained in parsed.plateInt)
    "plate": "XXXI",
    
    // The hue as in the "maxwell tops" unlike more modern color-model
    // the colors range from 0-100. It used different primary colors than the color-wheels we know today
    // even though this information is parsed into parsed: parsed.hueBase100 I am not sure what to make 
    // out of it yet. The "`" indicates the amount of "grey" mixed into the hue parsed as "neutralGreyPercent" 
    "hue": "29′′",
    
    // the tone describes the amount of black and white mixed into the colors
    // this information is parsed in parsed.toneWhitePercent and parsed.toneBlackPercent
    "tone": "—",
    
    // the reference to the orignal image, contained in the SRC folder
    "image": "xxxi_29pp___absinthe_green.jpg",
    
    // object containing all the parsed information
    "parsed": {
      "hueBase100": 29,
      "hueBase360": 104.4,
      "toneWhitePercent": 0,
      "toneBlackPercent": 0,
      "neutralGreyPercent": 58,
      
      // domainant color
      "dominantColor": "#a6b46c",
      
      // parsed plate number
      "plateInt": 31,
      
      // original color-swatch position in the book
      "originalPosition": 641
    }
  },//...
]
```

### Data Sources

- https://www.gutenberg.org/ebooks/63087
- https://www.gutenberg.org/files/63087/63087-h/63087-h.htm
- https://archive.org/details/colorstandardsc00ridg/mode/2up
- https://archive.org/details/mobot31753002026018/mode/2up
- https://archive.org/details/gri_c00033125001039383/mode/2up


### Parsed Data (in progress)

- [Color Names with Links (Table)](https://airtable.com/shrabAncr9wXCgE3T)
- [Color Names (Grid View)](https://airtable.com/shrgNqiOZmtuqdD7W/tblC7IMejtiLBmUm6)

### Collaborators

- https://github.com/meodai/
- https://github.com/davo/
