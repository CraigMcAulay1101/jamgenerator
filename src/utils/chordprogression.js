import ChordOption from '../models/ChordOption';
import ScaleGenerator from '../models/ScaleGenerator';
import { modes, notes } from './musicConstants';

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function buildChord(scale, degree, type) {
    const note = scale[degree];
    return `${note}${type}`;    
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

    const chordOption = new ChordOption(mode, advanced);
    const chordOptions = chordOption.getChordOptions();

    const scaleGenerator = new ScaleGenerator(mode, root, advanced)
    const scale = scaleGenerator.generateScale(root, mode);
    const compatibleScales = scaleGenerator.getCompatibleScales(mode, true);

    const progressionDegrees = getProgressionDegrees();

    const chords = progressionDegrees.map(degree => buildChord(scale, degree, getRandomElement(chordOptions[degree])));
    const romanNumerals = progressionDegrees.map(degree => chordOption.degreeToRoman(degree, mode));

    return {
        key: `${root} ${mode}`,
        degrees: progressionDegrees.map(d => d + 1),
        chords,
        romanNumerals,
        compatibleScales: compatibleScales
    };
}