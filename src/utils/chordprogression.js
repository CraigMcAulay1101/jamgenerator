import Chord from '../models/chord';

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

function getCompatibleScales(mode, advanced = false) {
    const table = advanced ? compatibleScalesAdvanced : compatibleScalesBalanced;
    return table[mode] || ['Unknown mode'];
}

function getProgressionDegrees() {
    const progressionDegrees = [];
    const usedDegrees = new Set();

    const degrees = [0, 1, 2, 3, 4, 5, 6];

    while (progressionDegrees.length < 4) {
        let next;
        do {
            next = getRandomElement(degrees);
        } while (progressionDegrees.length > 0 && next === progressionDegrees[progressionDegrees.length - 1] || usedDegrees.has(next));
        progressionDegrees.push(next);
        usedDegrees.add(next);
    }

    return progressionDegrees;
}

export default function generateProgression(advanced) {
    const root = getRandomElement(notes);
    const mode = getRandomElement(Object.keys(modes));

    const chord = new Chord(mode, advanced);
    const chordOptions = chord.getChordOptions();

    const scale = generateScale(root, mode);
    const compatibleScales = getCompatibleScales(mode, true);

    const progressionDegrees = getProgressionDegrees();

    const chords = progressionDegrees.map(degree => chord.buildChord(scale, degree, getRandomElement(chordOptions[degree])));
    const romanNumerals = progressionDegrees.map(degree => chord.degreeToRoman(degree, mode));

    return {
        key: `${root} ${mode}`,
        degrees: progressionDegrees.map(d => d + 1),
        chords,
        romanNumerals,
        compatibleScales: compatibleScales
    };
}