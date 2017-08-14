# Term Generator API

A simple NodeJS API to generate generate usernames, filler sentences, memorable passphrases, Heroku-style server ids, and much more.

Visit https://generator.patricktriest.com for a simple example web app showing a few of the possibilities for how to use this API.

The server uses the Tiny-PRNG library (https://github.com/triestpa/Tiny-PRNG) as a pseudorandom number generator, along with lists of various "things" scraped from across the web.  See the comments in `generate.js` for more information on where the terms come from.

## API

The server exposes a very simple HTTP GET interface, taking 6 optional url parameters -
- `seed` (optional) - The pseudorandom seed value to use when generating terms.  The same seed value will always return the same results.
- `offset` (optional) - The pseudorandom number generator offset to use.
- `letter` (optional) - The first letter of each generator word.  Useful for generating alliteration terms.
- `minYear` (optional) - The min year for the generated date.
- `maxYear` (optional) - The max year for the generated date.

## Example Requests
##### https://generator.patricktriest.com/api?seed=12345
```
{
  "name": "Sharde",
  "attribute": "Unreflective",
  "animal": "Rattlesnake",
  "creature": "Amarok",
  "noun": "Meat",
  "city": "Shenzhen",
  "country": "Mexico",
  "year": 2567,
  "month": "August",
  "day": 1,
  "hour": 22,
  "minute": 47,
  "second": 27,
  "decimal": 0.3331466120045135
}
```

##### https://generator.patricktriest.com/api?seed=12345&offset=5&letter=A
```
{
  "name": "Arlo",
  "attribute": "Anxious",
  "animal": "African Penguin",
  "creature": "Axehandle Hound",
  "noun": "Author",
  "city": "Alexandria",
  "country": "Andorra",
  "year": 2967,
  "month": "September",
  "day": 26,
  "hour": 13,
  "minute": 28,
  "second": 14,
  "decimal": 0.14888672218554347
}
```

##### https://generator.patricktriest.com/api?seed=12345&offset=294&letter=F&minYear=1992&maxYear=2017
```
{
  "name": "Foye",
  "attribute": "Forceful",
  "animal": "Ferret",
  "creature": "Feng Huang",
  "noun": "Farmer",
  "city": "Foshan",
  "country": "Fiji",
  "year": 2009,
  "month": "December",
  "day": 23,
  "hour": 16,
  "minute": 40,
  "second": 41,
  "decimal": 0.759980030599963
}
```


### Example Generated Phrases
The pseudo-random terms can be used to generate countless identifiers and phrases.
Visit https://generator.patricktriest.com to generate your own.

##### API Response
```
http://localhost:3000/api
{
  "name": "Elvie",
  "attribute": "Intense",
  "animal": "Pig",
  "creature": "Boggart",
  "noun": "Outcome",
  "city": "Semarang",
  "country": "Timor-Leste",
  "year": 1602,
  "month": "October",
  "day": 6,
  "hour": 5,
  "minute": 47,
  "second": 24,
  "decimal": 0.6269482701336483
}
```
##### Unique Username

`Intense Elvie`

##### Unique Animal

`Intense Pig`

##### Unique Animal With Name

`Elvie the Intense Pig`

##### Unique Animal With Title

`Elvie the Intense Pig of Semarang`

##### Mythical Creature

`Intense Boggart`

##### Mythical Creature Name

`Elvie the Intense Boggart`

##### Mythical Creature With Title

`Elvie the Intense Boggart of Semarang`

##### Datetime

`05:47:24, October 6, 1602`

##### Date-Place

`October 1602 in Timor-Leste`

##### Statement

`The Intense Pig Stole My Outcome in Semarang`

##### Statement Long

`The Intense Pig of Timor-Leste Stole Elvie's Outcome in Semarang during October, 1602`