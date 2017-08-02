/** Seedable psuedo-random number generator class */
class PRNG {
  /**
   * Create a pseudo-random number generator. The seed must be an integer.
   *
   * Originally adapted from https://gist.github.com/blixt/f17b47c62508be59987b
   *
   * Uses an optimized version of the Lehmer / Park-Miller PRNG.
   * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
   */
  constructor (seed) {
    // Verify that seed is an integer
    if (seed % 1 === 0) {
      this.seed = seed % 2147483647
      if (this.seed <= 0) {
        this.seed += 2147483646
      }
    } else {
      throw new Error('Seed value must be an integer.')
    }
  }

  /** Return a pseudo-random value between 1 and 2^32 - 2. */
  next () {
    return this.seed = this.seed * 16807 % 2147483647
  }

  /** Return a pseudo-random floating point number in range [0, 1). */
  nextFloat () {
    // We know that result of next() will be 1 to 2147483646 (inclusive).
    return (this.next() - 1) / 2147483646
  }

  /** Return pseudo-random int between 0 and the specified max */
  nextBoundedInt(min, max) {
    return Math.floor(this.nextFloat() * (max - min) + min)
  }
}

module.exports = PRNG