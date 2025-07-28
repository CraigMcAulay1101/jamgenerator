import chorddb from '../data/chords.json';

const keys = {
    'A': 'A',
    'Ab': 'Ab',
    'B': 'B',
    'Bb': 'Bb',
    'C': 'C',
    'C#': 'Csharp',
    'D': 'D',
    'E': 'E',
    'Eb': 'Eb',
    'F': 'F',
    'F#': 'Fsharp',
    'G': 'G',
};

function chordFormat(chords) {
    let formattedChords = [];
    for (const chord of chords) {
        const split = splitChord(chord);
        formattedChords.push({
            key: keys[split.key],
            tonal: split.tonal,
        });
    }
    return formattedChords;
}

function splitChord(chord) {
    const index = chord[1].includes('#') || chord[1].includes('b') ? 1 : 0;
    const key = chord.slice(0, index + 1); 
    const tonal = chord.slice(index + 1);

    return { key, tonal };
}

export default function getChords(chords) {
    const formattedChords = chordFormat(chords);

    const chordObjects = [];
    let i = 0;

    while (i < formattedChords.length) {
        const key = formattedChords[i].key;
        const chordList = chorddb.chords[key];
        if (!chordList) {
            i++;
            continue;
        }

        let counter = 0;
        while (counter < chordList.length) {
            if (chordList[counter].suffix === formattedChords[i].tonal) {
                chordObjects.push(chordList[counter]);
            }
            counter++;
        }
        i++;
    }

    return chordObjects;
}