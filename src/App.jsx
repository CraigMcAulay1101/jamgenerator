import React, { useState, useEffect, captureOwnerStack } from 'react';
import generateProgression from './utils/chordprogression';

import MyChord from './Chord';
import getChords from './utils/chords';
import './App.css';

function App() {
  const [advanced, setAdvanced] = useState(true);
  const [numChords, setNumChords] = useState(4);
  const [progression, setProgression] = useState(() => generateProgression(advanced));
  const [chords, setChords] = useState([]);
  const [currentPositions, setCurrentPositions] = useState({});

  useEffect(() => {
    setProgression(generateProgression(advanced, numChords));
  }, [advanced, numChords]);

  useEffect(() => {
    function fetchChords() {
      const fetchedChords = getChords(progression.chords);
      const merged = fetchedChords.map((chord, index) => ({
        ...chord,
        degree: progression.romanNumerals[index]
      }));

      setChords(merged);
    }
    fetchChords();
  }, [progression]);

  const changePosition = (index) => {
    setCurrentPositions((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1 >= chords[index]?.positions?.length
        ? 0
        : (prev[index] || 0) + 1,
    }));
  };

  return (
    <>
        <button onClick={() => setAdvanced((prev) => !prev)}>
          Jazzy Chords (Currently: {advanced ? 'Enabled' : 'Disabled'})
        </button>
        <button onClick={() => setProgression(generateProgression(advanced, numChords))}>
          Generate New Progression
        </button>
        <label>
          Number of Chords:
          <select value={numChords} onChange={(e) => setNumChords(Number(e.target.value))}>
            {[4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <p>Key: {progression.key}</p>
        <span class="helper">Click on a chord to view alternate positions.</span>
        <div class="chord-row">
          {chords.map((chord, index) => (
            <div key={index} class="chords">
              <div class="titlebox">
                <span class="chordDegree">{chord.degree}</span>
                <span class="chordName">{chord.key}{chord.suffix}</span>
              </div>

              <MyChord
                data={chord?.positions?.[currentPositions[index] || 0]}
                onClick={() => changePosition(index)}
              />           
            </div>
          ))}
        </div>

        Compatible Scales:
        <ul>
        {progression.compatibleScales.map((scale, index) => (
            <li key={index}>{scale}</li>
          ))}
        </ul>
    </>
  );
}

export default App;