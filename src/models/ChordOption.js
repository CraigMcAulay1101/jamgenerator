export default class ChordOption {
    constructor(mode, advanced) {
        this.mode = mode;
        this.advanced = advanced;

        this.chordOptions = this.setChordOptions();
    }
    
    setChordOptions() {
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

        return this.advanced ? chordOptionsAdvanced : chordOptionsBalanced;
    }

    getChordOptions() {
        return this.chordOptions[this.mode];
    }
}
