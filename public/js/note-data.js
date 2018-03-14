//Place to store lookup tables for notes, frets and colors.

const sciPitchToHertz = {
  c2: 65.406,
  db2: 69.296,
  d2: 73.416,
  eb2: 77.782,
  e2: 82.407,
  f2: 87.307,
  gb2: 92.499,
  g2: 97.999,
  ab2: 103.83,
  a2: 110.00,
  bb2: 116.54,
  b2: 123.47,
  c3: 130.81,
  db3: 138.59,
  d3: 146.83,
  eb3: 155.56,
  e3: 164.81,
  f3: 174.61,
  gb3: 185.00,
  g3: 196.00,
  ab3: 207.65,
  a3: 220.00,
  bb3: 233.08,
  b3: 246.94,
  c4: 261.63,
  db4: 277.18,
  d4: 293.66,
  eb4: 311.13,
  e4: 329.63,
  f4: 349.23,
  gb4: 369.99,
  g4: 392.00,
  ab4: 415.30,
  a4: 440.00,
  bb4: 466.16,
  b4: 493.88,
  c5: 523.25,
  db5: 554.37,
  d5: 587.33,
  eb5: 622.25,
  e5: 659.26,
  f5: 698.46,
  gb5: 739.99,
  g5: 783.99,
  ab5: 830.61,
  a5: 880.00,
  bb5: 932.33,
  b5: 987.77
}

const midiToHertz = {
  36: 65.406,
  37: 69.296,
  38: 73.416,
  39: 77.782,
  40: 82.407,
  41: 87.307,
  42: 92.499,
  43: 97.999,
  44: 103.83,
  45: 110.00,
  46: 116.54,
  47: 123.47,
  48: 130.81,
  49: 138.59,
  50: 146.83,
  51: 155.56,
  52: 164.81,
  53: 174.61,
  54: 185.00,
  55: 196.00,
  56: 207.65,
  57: 220.00,
  58: 233.08,
  59: 246.94,
  60: 261.63,
  61: 277.18,
  62: 293.66,
  63: 311.13,
  64: 329.63,
  65: 349.23,
  66: 369.99,
  67: 392.00,
  68: 415.30,
  69: 440.00,
  70: 466.16,
  71: 493.88,
  72: 523.25,
  73: 554.37,
  74: 587.33,
  75: 622.25,
  76: 659.26,
  77: 698.46,
  78: 739.99,
  79: 783.99,
  80: 830.61,
  81: 880.00,
  82: 932.33,
  83: 987.77
}

const sciPitchToStrAndFretViolin = {
  g3: {
    color: 'yellow',
    fret: 0
  },
  ab3: {
    color: 'yellow',
    fret: 1
  },
  a3: {
    color: 'yellow',
    fret: 2
  },
  bb3: {
    color: 'yellow',
    fret: 3
  },
  b3: {
    color: 'yellow',
    fret: 4
  },
  c4: {
    color: 'yellow',
    fret: 5
  },
  db4: {
    color: 'yellow',
    fret: 6
  },
  d4: {
    color: 'blue',
    fret: 0
  },
  eb4: {
    color: 'blue',
    fret: 1
  },
  e4: {
    color: 'blue',
    fret: 2
  },
  f4: {
    color: 'blue',
    fret: 3
  },
  gb4: {
    color: 'blue',
    fret: 4
  },
  g4: {
    color: 'blue',
    fret: 5
  },
  ab4: {
    color: 'blue',
    fret: 6
  },
  a4: {
    color: 'red',
    fret: 0
  },
  bb4: {
    color: 'red',
    fret: 1
  },
  b4: {
    color: 'red',
    fret: 2
  },
  c5: {
    color: 'red',
    fret: 3
  },
  db5: {
    color: 'red',
    fret: 4
  },
  d5: {
    color: 'red',
    fret: 5
  },
  eb5: {
    color: 'red',
    fret: 6
  },
  e5: {
    color: 'green',
    fret: 0
  },
  f5: {
    color: 'green',
    fret: 1
  },
  gb5: {
    color: 'green',
    fret: 2
  },
  g5: {
    color: 'green',
    fret: 3
  },
  ab5: {
    color: 'green',
    fret: 4
  },
  a5: {
    color: 'green',
    fret: 5
  },
  bb5: {
    color: 'green',
    fret: 6
  },
  b5: {
    color: 'green',
    fret: 7
  },
  rest: {
    color: 'none',
    fret: ''
  }
}

const sciPitchToStrAndFretViola = {
  c3: {
    color: 'yellow',
    fret: 0
  },
  db3: {
    color: 'yellow',
    fret: 1
  },
  d3: {
    color: 'yellow',
    fret: 2
  },
  eb3: {
    color: 'yellow',
    fret: 3
  },
  e3: {
    color: 'yellow',
    fret: 4
  },
  f3: {
    color: 'yellow',
    fret: 5
  },
  gb3: {
    color: 'yellow',
    fret: 6
  },
  g3: {
    color: 'blue',
    fret: 0
  },
  ab3: {
    color: 'blue',
    fret: 1
  },
  a3: {
    color: 'blue',
    fret: 2
  },
  bb3: {
    color: 'blue',
    fret: 3
  },
  b3: {
    color: 'blue',
    fret: 4
  },
  c4: {
    color: 'blue',
    fret: 5
  },
  db4: {
    color: 'blue',
    fret: 6
  },
  d4: {
    color: 'red',
    fret: 0
  },
  eb4: {
    color: 'red',
    fret: 1
  },
  e4: {
    color: 'red',
    fret: 2
  },
  f4: {
    color: 'red',
    fret: 3
  },
  gb4: {
    color: 'red',
    fret: 4
  },
  g4: {
    color: 'red',
    fret: 5
  },
  ab4: {
    color: 'red',
    fret: 6
  },
  a4: {
    color: 'green',
    fret: 0
  },
  bb4: {
    color: 'green',
    fret: 1
  },
  b4: {
    color: 'green',
    fret: 2
  },
  c5: {
    color: 'green',
    fret: 3
  },
  db5: {
    color: 'green',
    fret: 4
  },
  d5: {
    color: 'green',
    fret: 5
  },
  eb5: {
    color: 'green',
    fret: 6
  },
  e5: {
    color: 'green',
    fret: 7
  },
  rest: {
    color: 'none',
    fret: ''
  }
}

const sciPitchToStrAndFretCello = {
  c2: {
    color: 'yellow',
    fret: 0
  },
  db2: {
    color: 'yellow',
    fret: 1
  },
  d2: {
    color: 'yellow',
    fret: 2
  },
  eb2: {
    color: 'yellow',
    fret: 3
  },
  e2: {
    color: 'yellow',
    fret: 4
  },
  f2: {
    color: 'yellow',
    fret: 5
  },
  gb2: {
    color: 'yellow',
    fret: 6
  },
  g2: {
    color: 'blue',
    fret: 0
  },
  ab2: {
    color: 'blue',
    fret: 1
  },
  a2: {
    color: 'blue',
    fret: 2
  },
  bb2: {
    color: 'blue',
    fret: 3
  },
  b2: {
    color: 'blue',
    fret: 4
  },
  c3: {
    color: 'blue',
    fret: 5
  },
  db3: {
    color: 'blue',
    fret: 6
  },
  d3: {
    color: 'red',
    fret: 0
  },
  eb3: {
    color: 'red',
    fret: 1
  },
  e3: {
    color: 'red',
    fret: 2
  },
  f3: {
    color: 'red',
    fret: 3
  },
  gb3: {
    color: 'red',
    fret: 4
  },
  g3: {
    color: 'red',
    fret: 5
  },
  ab3: {
    color: 'red',
    fret: 6
  },
  a3: {
    color: 'green',
    fret: 0
  },
  bb3: {
    color: 'green',
    fret: 1
  },
  b3: {
    color: 'green',
    fret: 2
  },
  c4: {
    color: 'green',
    fret: 3
  },
  db4: {
    color: 'green',
    fret: 4
  },
  d4: {
    color: 'green',
    fret: 5
  },
  eb4: {
    color: 'green',
    fret: 6
  },
  e4: {
    color: 'green',
    fret: 7
  },
  rest: {
    color: 'none',
    fret: ''
  }
}
