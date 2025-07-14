const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const modes = {
    Ionian:     [0, 2, 4, 5, 7, 9, 11],
    Dorian:     [0, 2, 3, 5, 7, 9, 10],
    Phrygian:   [0, 1, 3, 5, 7, 8, 10],
    Lydian:     [0, 2, 4, 6, 7, 9, 11],
    Mixolydian: [0, 2, 4, 5, 7, 9, 10],
    Aeolian:    [0, 2, 3, 5, 7, 8, 10],
    Locrian:    [0, 1, 3, 5, 6, 8, 10]
};

const chordOptionsAdvanced = {
    Ionian:     [['major', 'maj7'], ['minor', 'm7'], ['minor', 'm7'], ['major', 'maj7'], ['major', '7'], ['minor', 'm7'], ['dim', 'm7b5']],
    Dorian:     [['minor', 'm7'], ['minor', 'm7'], ['major', 'maj7'], ['7'], ['minor', 'm7'], ['dim', 'm7b5'], ['major', 'maj7']],
    Phrygian:   [['minor', 'm7'], ['major', 'maj7'], ['7'], ['minor', 'm7'], ['dim', 'm7b5'], ['major', 'maj7'], ['minor', 'm7']],
    Lydian:     [['major', 'maj7'], ['7'], ['minor', 'm7'], ['dim', 'm7b5'], ['major', 'maj7'], ['minor', 'm7'], ['minor', 'm7']],
    Mixolydian: [['major', '7'], ['minor', 'm7'], ['dim', 'm7b5'], ['major', 'maj7'], ['minor', 'm7'], ['minor', 'm7'], ['major', 'maj7']],
    Aeolian:    [['minor', 'm7'], ['dim', 'm7b5'], ['major', 'maj7'], ['minor', 'm7'], ['minor', 'm7'], ['major', 'maj7'], ['7']],
    Locrian:    [['dim', 'm7b5'], ['major', 'maj7'], ['minor', 'm7'], ['minor', 'm7'], ['major', 'maj7'], ['7'], ['minor', 'm7']]
};

const chordOptionsBalanced = {
    Ionian: [['major', 'maj7'], ['minor', 'm7'], ['minor'], ['major'], ['major', '7'], ['minor'], ['dim']],
    Dorian: [['minor', 'm7'], ['minor'], ['major'], ['major', '7'], ['minor'], ['dim'], ['major']],
    Phrygian: [['minor'], ['major'], ['major', 'maj7'], ['minor'], ['dim'], ['major'], ['minor']],
    Lydian: [['major', 'maj7'], ['major'], ['minor'], ['dim'], ['major'], ['minor'], ['minor', 'm7']],
    Mixolydian: [['major', '7'], ['minor'], ['dim'], ['major'], ['minor', 'm7'], ['minor'], ['major']],
    Aeolian: [['minor'], ['dim'], ['major'], ['minor', 'm7'], ['minor'], ['major'], ['major']],
    Locrian: [['dim', 'm7b5'], ['major'], ['minor'], ['minor'], ['dim'], ['major'], ['minor']]
};
const compatibleScalesBalanced = {
    Ionian:     ['Major Scale', 'Major Pentatonic'],
    Dorian:     ['Dorian Mode', 'Minor Pentatonic'],
    Phrygian:   ['Phrygian Mode'],
    Lydian:     ['Lydian Mode'],
    Mixolydian: ['Mixolydian Mode', 'Dominant Pentatonic'],
    Aeolian:    ['Natural Minor', 'Minor Pentatonic'],
    Locrian:    ['Locrian Mode', 'Half-Diminished Scale']
};

const compatibleScalesAdvanced = {
    Ionian:     ['Major Scale', 'Major Pentatonic', 'Lydian', 'Mixolydian'],
    Dorian:     ['Dorian Mode', 'Minor Pentatonic', 'Blues Scale'],
    Phrygian:   ['Phrygian Mode', 'Phrygian Dominant', 'Minor Pentatonic'],
    Lydian:     ['Lydian Mode', 'Major Pentatonic', 'Whole Tone Scale'],
    Mixolydian: ['Mixolydian Mode', 'Minor Pentatonic', 'Blues Scale', 'Dominant Bebop Scale'],
    Aeolian:    ['Natural Minor', 'Harmonic Minor', 'Melodic Minor', 'Minor Pentatonic', 'Blues Scale'],
    Locrian:    ['Locrian Mode', 'Half-Diminished Scale', 'Altered Scale']
};


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateScale(root, mode) {
    const intervals = modes[mode];
    return intervals.map(semitones => notes[(notes.indexOf(root) + semitones) % 12]);
}

function buildRandomChord(scale, degree, options) {
    const note = scale[degree];
    const type = getRandomElement(options[degree]);
    return `${note}${type}`;
}

function getChordOptions(mode, advanced = false) {
    const table = advanced ? chordOptionsAdvanced : chordOptionsBalanced;
    return table[mode] || ['Unknown mode'];
}

function getCompatibleScales(mode, advanced = false) {
    console.log(advanced)
    const table = advanced ? compatibleScalesAdvanced : compatibleScalesBalanced;
    return table[mode] || ['Unknown mode'];
}

function degreeToRoman(degree, mode) {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    const quality = chordOptionsBalanced[mode][degree][0];

    let numeral = romanNumerals[degree];
    if (quality === 'major') {
        return numeral;
    } else if (quality === 'minor') {
        return numeral.toLowerCase();
    } else if (quality === 'diminished') {
        return numeral.toLowerCase() + '°';
    } else {
        return numeral;
    }
}

export default function generateProgression(advanced) {
    
    const root = getRandomElement(notes);
    const mode = getRandomElement(Object.keys(modes));
    const scale = generateScale(root, mode);

    const compatibleScales = getCompatibleScales(mode, true);
    const options = getChordOptions(mode, advanced);

    const degrees = [0, 1, 2, 3, 4, 5, 6];
    const progressionDegrees = [];
    const usedDegrees = new Set();

    while (progressionDegrees.length < 4) {
        let next;
        do {
            next = getRandomElement(degrees);
        } while (progressionDegrees.length > 0 && next === progressionDegrees[progressionDegrees.length - 1] || usedDegrees.has(next));
        progressionDegrees.push(next);
        usedDegrees.add(next);
    }

    const chords = progressionDegrees.map(degree => buildRandomChord(scale, degree, options));
    const romanNumerals = progressionDegrees.map(degree => degreeToRoman(degree, mode));

    return {
        key: `${root} ${mode}`,
        degrees: progressionDegrees.map(d => d + 1),
        chords,
        romanNumerals,
        compatibleScales: compatibleScales
    };
}