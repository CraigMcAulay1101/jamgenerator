import Chord from '@tombatossals/react-chords/lib/Chord'

export default function MyChord({data, onClick}){
    const chord = {
      frets: data.frets,
      fingers: data.fingers,
      barres: data.barres,
      capo: data.capo,
      baseFret: data.baseFret,
  }
  const instrument = {
      strings: 6,
      fretsOnChord: 4,
      name: 'Guitar',
      keys: [],
      tunings: {
          standard: ['E', 'A', 'D', 'G', 'B', 'E']
      }
  }
  const lite = false
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Chord chord={chord} instrument={instrument} lite={lite} />
    </div>
  )
}