import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import Tone from 'tone';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import Slider from '@material-ui/lab/Slider';
import Input from '@material-ui/core/Input';

import PianoRollGrid from '../ui/PianoRollGrid';
import Question from '../../data/question';

// サンプラー
const sampler = new Tone.Sampler({
  C2: 'C2.wav',
  E2: 'E2.wav',
  Ab2: 'Ab2.wav',
  C3: 'C3.wav',
  E3: 'E3.wav',
  Ab3: 'Ab3.wav',
  C4: 'C4.wav',
  E4: 'E4.wav',
  Ab4: 'Ab4.wav',
  C5: 'C5.wav',
  E5: 'E5.wav',
  Ab5: 'Ab5.wav',
  C6: 'C6.wav',
}, {
  release: 1,
  onload: () => {
    // sampler will repitch the closest sample
    sampler.toMaster();
    // console.log('sampler successfully loaded!');
  },
  baseUrl: './instrument_piano/',
});
Tone.Transport.start();


function noteNumberToPitchName(nn) {
  return ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][nn % 12] + (Math.floor(nn / 12) - 1);
}

class EditQuestion extends React.Component {
  static play(notes, bpm = 120) { // 一連の音符たちを鳴らしたい場合，Tone.Part が便利．（他に Tone.Sequence というのもあるようだ）
    // bpm 例外処理・・・
    const secPerBeat = 60 / bpm;
    const timeEventTupleList = [];
    for (let i = 0; i < notes.size; i += 1) {
      const note = notes.get(i);
      timeEventTupleList.push(
        [note.start * secPerBeat, [note.pitch, (note.end - note.start) * secPerBeat]],
      );
    }
    const melody = new Tone.Part(
      (time, event) => {
        sampler.triggerAttackRelease(
          noteNumberToPitchName(event[0]), event[1], time, 1,
        ); // 引数は，おそらく (音高，音長，絶対時刻[s]，ベロシティ[0~1])
      }, timeEventTupleList,
    );
    melody.start(Tone.now()); // 先に Tone.Transport.start() してある必要がある．
  }

  render() {
    const {
      notes, pitchRange, bpm, title, questionId, addNote, delNote, shiftPitchRange, setBPM,
      changeUploadedQuestion, setTitle,
    } = this.props;
    return (
      <div id="MakeQuestion">
        <Input
          placeholder="Untitled"
          inputProps={{
            'aria-label': 'Description',
          }}
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            position: 'absolute', top: 10, left: 10, height: 40, width: 180,
          }}
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="Play"
          style={{ position: 'absolute', top: 10, left: 210 }}
          onClick={() => EditQuestion.play(notes, bpm)}
        >
          <PlayArrowIcon />
        </Button>
        <Typography
          style={{ position: 'absolute', top: 10, left: 300 }}
        >
          BPM
          {bpm}
        </Typography>
        <Slider
          min={60}
          max={200}
          step={1}
          value={bpm}
          onChange={(e, v) => setBPM(v)}
          style={{
            position: 'absolute',
            top: 25,
            left: 300,
            width: 200,
          }}
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="Save"
          style={{ position: 'absolute', top: 10, left: 550 }}
          onClick={() => {
            changeUploadedQuestion(
              questionId,
              new Question({ notes, bpm, title: (title !== '') ? title : 'Untitled' }),
            );
          }}
        >
          <SaveIcon />
        </Button>

        <PianoRollGrid
          addNote={addNote}
          delNote={delNote}
          shiftPitchRange={shiftPitchRange}
          notes={notes}
          pitchRange={pitchRange}
        />
      </div>
    );
  }
}

EditQuestion.propTypes = {
  notes: PropTypes.instanceOf(Immutable.List).isRequired,
  pitchRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  bpm: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  shiftPitchRange: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  delNote: PropTypes.func.isRequired,
  setBPM: PropTypes.func.isRequired,
  changeUploadedQuestion: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default EditQuestion;