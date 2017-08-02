const fs = require('fs')
const readline = require('readline')
const PRNG = require('./prng')

// Read each line of a file into an array
function readNewlineDelimitedFile (filepath, encoding = 'utf8') {
  let content = fs.readFileSync(filepath, encoding).split('\n');
  return content
}

/** Get bounded random number */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/** Filter array by first letter */
function filterByFirstLetter (arr, letter) {
  return arr.filter(function(word) {
      return word.charAt(0) === letter;
  })
}

/**
 * Get a psuedo-random entry in the array
 *
 * @param {any} arr The array to retrieve an item from.
 * @param {any} generator A seeded pseudo-random number-generator (PRNG) instance
 * @param {any} letter Optional, pass an upper-case character to filter results by their first letter
 * @returns
 */
function getEntry (arr, generator, letter = null) {
  if (letter) {
    arr = filterByFirstLetter(arr, letter)
  }

  let index = Math.floor(generator.nextFloat() * arr.length)
  return arr[index]
}

/**
 * Javascript implementation of Java's 'hashCode()' String method.
 * NOT considered cryptographically secure or immune to hashtable collisions.
 * This is because there are near-infinite potential string inputs and only (2^53)-1 valid js integer outputs.
 */
function hashStringToInt(str) {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash<<5)-hash) + str.charCodeAt(i);
  }
  return hash;
}

/** Load datasets from newline delimited files */
const dataSets = {
  // 514 mythical creates scraped from - https://en.wikipedia.org/wiki/List_of_legendary_creatures_by_type
  creatures: readNewlineDelimitedFile('./data/mythological-creatures.txt'),

  // 1206 common nouns scraped from - http://www.talkenglish.com/vocabulary/top-1500-nouns.aspx
  nouns: readNewlineDelimitedFile('./data/nouns.txt'),

  // 31015 names queried from 'USA Name Data' table on Google BigQuery - https://cloud.google.com/bigquery/public-data/usa-names
  names: readNewlineDelimitedFile('./data/names.txt'),

  // 684 personality traits scraped from - http://ideonomy.mit.edu/essays/traits.html and http://grammar.yourdictionary.com/word-lists/
  attributes: readNewlineDelimitedFile('./data/characteristics.txt'),

  // 238 cities scraped from - https://en.wikipedia.org/wiki/List_of_largest_cities
  cities: readNewlineDelimitedFile('./data/cities.txt'),

  // 596 animals scraped from - https://a-z-animals.com/animals/
  animals: readNewlineDelimitedFile('./data/animals.txt'),

  // 204 countries scraped from - https://www.state.gov/misc/list/
  countries: readNewlineDelimitedFile('./data/countries.txt'),

  // 12 months of the Gregorian calendar, learned at Auburndale Community Nursery School, Newton MA, circa 1997
  months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
}

/**
 * Deterministically generate human-memorable identifiers based on an integer seed value.
 *
 * @param {any} seed Optional, A valid integer to seed the results generator.
 * @param {number} [offset=0] Optional, An integer, used to offset the PRNG.
 * @param {any} [letter=null] Optional, the starting letter of all results.
 * @param {number} [minYear=1000] Optional, the min year to be generated.
 * @param {number} [maxYear=3000] Optional, the max year to be generated.
 */
module.exports.getWords= function (seed, offset = 0, letter = null, minYear=1000, maxYear=3000) {
  if (!seed) { // Check if seed param was passed
    // If not, generate a Very Large random seed value
    seed = randomNumber(0, 10 ** 52)
  // Check if seed is an integer, using '==' type-coercing comparison
  } else if (seed != parseInt(seed, 10)) {
    // If not, hash it as a string
    seed = hashStringToInt(String(seed))
  } else {
    // Else, just verify the seed is already cast to integer
    seed = parseInt(seed, 10)
  }

  // Create new pseudo-random number generator based on seed value
  let generator = new PRNG(seed)

  // Increment the number generator to the offset value
  for (offset; offset >= 0; offset--) { generator.next() }

  // Get elements from corresponding arrays using pseudo-random indeces
  let name = getEntry(dataSets.names, generator, letter)
  let attribute = getEntry(dataSets.attributes, generator, letter)
  let creature = getEntry(dataSets.creatures, generator, letter)
  let noun = getEntry(dataSets.nouns, generator, letter)
  let city = getEntry(dataSets.cities, generator, letter)
  let animal = getEntry(dataSets.animals, generator, letter)
  let country = getEntry(dataSets.countries, generator, letter)


  // Generate a date based on a random offset from now
  let randomTimeOffset = generator.nextBoundedInt(0, 10 ** 12)
  let date = new Date(new Date().getTime() + randomTimeOffset)
  let month = dataSets.months[date.getMonth()]
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let year = generator.nextBoundedInt(minYear, maxYear)

  let decimal = generator.nextFloat()

  return { name, attribute,  animal, creature, noun, city, country, year, month, day, hour, minute, second, decimal  }
}