import ChordProgression from '../models/ChordProgression';

import { modes, notes } from './musicConstants';
import { getRandomElement } from './helpers';

export default function generateProgression(advanced, totalChords) {
    const root = getRandomElement(notes);
    const mode = getRandomElement(Object.keys(modes));

    const chordprogression = new ChordProgression(totalChords, mode, root, advanced).generateProgression();

    const chords = chordprogression.chords
    const romanNumerals = chordprogression.romanNumerals;

    return {
        key: `${root} ${mode}`,
        degrees: chordprogression.degrees,
        chords,
        romanNumerals,
        compatibleScales: chordprogression.compatibleScales
    };
}