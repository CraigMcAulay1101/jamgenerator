import { modes, notes } from '../utils/musicConstants';

export default class ScaleGenerator {
    constructor(mode, root, advanced) {
        this.mode = mode;
        this.root = root;
        this.advanced = advanced;
        this.scaleOptions = this.setScaleOptions();
    }

    setScaleOptions() {
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

        return this.advanced ? compatibleScalesAdvanced : compatibleScalesBalanced;
    }

    getCompatibleScales() {
        return this.scaleOptions[this.mode];
    }

    generateScale(root, mode) {
        const intervals = modes[mode];
        return intervals.map(semitones => notes[(notes.indexOf(root) + semitones) % 12]);
    }
    
}