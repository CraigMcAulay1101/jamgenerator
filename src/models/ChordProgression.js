import ChordOption from './ChordOption';
import ScaleGenerator from './ScaleGenerator';

import { getRandomElement, buildChord } from '../utils/helpers';

export default class chordprogression {
    constructor(totalChords, mode, root, advanced) {
        this.totalChords = totalChords;
        this.mode = mode;
        this.root = root;

        this.ChordOption = new ChordOption(mode, advanced);
        this.ScaleGenerator = new ScaleGenerator(mode, root, advanced);

        this.setProgressionDegrees();
    }

    setProgressionDegrees() {
        const degrees = [0, 1, 2, 3, 4, 5, 6];
        const shuffled = degrees.sort(() => Math.random() - 0.5);

        this.progressionDegrees = shuffled.slice(0, this.totalChords);
    }

    degreeToRoman(degree, chordOptions) {
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
        const quality = chordOptions[degree][0];

        let numeral = romanNumerals[degree];
        if (quality === 'major') {
            return numeral;
        } else if (quality === 'minor') {
            return numeral.toLowerCase();
        } else if (quality === 'dim' || quality === 'diminished') {
            return numeral.toLowerCase() + '°';
        } else {
            return numeral;
        }
    }

    generateProgression() {

        const chordOptions = this.ChordOption.getChordOptions();
        const scale = this.ScaleGenerator.generateScale();
        const compatibleScales = this.ScaleGenerator.getCompatibleScales();

        const chords = this.progressionDegrees.map(degree => buildChord(scale, degree, getRandomElement(chordOptions[degree])));
        const romanNumerals = this.progressionDegrees.map(degree => this.degreeToRoman(degree, chordOptions));
        const degrees = this.progressionDegrees.map(d => d + 1);

        return {chords, romanNumerals, degrees, compatibleScales};
    }
}