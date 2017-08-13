/** The core Vue instance controlling the UI */
const vm = new Vue ({
  el: '#vue-instance',
  data () {
    return {
      seed: null,
      offset: null,
      letter: null,


      error: null,
      requestURL: null,

      words: null,
      username: null,
      animal: null,
      animalName: null,
      animalLong: null,
      creature: null,
      creatureName: null,
      creatureLong: null,
      dateTimePlace: null,
      statement: null,
      statementLong: null
    }
  },
  computed: {
    wordObjectString () {
      return JSON.stringify(this.words, false, 2)
    },
  },
  async created () {
    this.baseUrl = 'http://localhost:3000/'
    this.generate()
  },
  methods: {
    async generate () {
      this.words = await await this.getRandomWords({ seed: this.seed, offset: this.offset, letter: this.letter })

      if (this.words) {
        this.getPhrases(this.words)
      }
    },
    async getRandomWords (params) {
      try {
        const response = await axios.get(this.baseUrl, { params })
        this.requestURL = response.request.responseURL
        return response.data
      } catch (err) {
        console.error(err)
        if (err.response) {
          this.error = err.response.data
        }
      }
    },
    getPhrases (words) {
      this.username = `${words.attribute} ${words.name}`
      this.animal = `${words.attribute} ${words.animal}`
      this.animalName = `${words.name} the ${words.attribute} ${words.animal}`
      this.animalLong = `${words.name} the ${words.attribute} ${words.animal} of ${words.city}`
      this.creature = `${words.attribute} ${words.creature}`
      this.creatureName = `${words.name} the ${words.attribute} ${words.creature}`
      this.creatureLong = `${words.name} the ${words.attribute} ${words.creature} of ${words.city}`
      this.dateTime= `${String(words.hour).padStart(2, '0')}:${String(words.minute).padStart(2, '0')}:${String(words.second).padStart(2, '0')}, ${words.month} ${words.day}, ${words.year}`
      this.dateTimePlace = `${words.month} ${words.year} in ${words.country}`
      this.statement = `The ${words.attribute} ${words.animal} Stole My ${words.noun} in ${words.city}`
      this.statementLong = `The ${words.attribute} ${words.animal} of ${words.country} Stole ${words.name}'s ${words.noun} in ${words.city} during ${words.month}, ${words.year}`
    }
  }
})

