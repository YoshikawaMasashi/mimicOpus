import Immutable from 'immutable';

import actionTypes from '../actions/actionTypes';
import MusicState from '../data/musicState';


export default function (state = new MusicState(), action) {
  switch (action.type) {
    case actionTypes.CLEAR_NOTES:
      return state.set('notes', Immutable.List());

    case actionTypes.ADD_NOTE:
      return state.update('notes', notes => notes.push(action.note));

    case actionTypes.DEL_NOTE:
      return state.update('notes', notes => notes.delete(action.idx));

    case actionTypes.SHIFT_PITCH_RANGE: {
      let newPitchRange = [state.pitchRange[0] + action.delta,
        state.pitchRange[1] + action.delta];
      if (newPitchRange[0] < 0) {
        newPitchRange = [0, newPitchRange[1] - newPitchRange[0]];
      } else if (newPitchRange[1] > 127) {
        newPitchRange = [127 - newPitchRange[1] + newPitchRange[0], 127];
      }
      return state.set('pitchRange', newPitchRange);
    }

    case actionTypes.SET_QUESTION:
      return state.set('question', action.question);

    case actionTypes.SET_BPM:
      return state.set('bpm', action.bpm);

    case actionTypes.ADD_QUESTION_TO_LIST:
      return state.update('questionsList', ql => ql.set(action.id, action.question));

    default:
      return state;
  }
}
