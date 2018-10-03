import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import SignIn from '../containers/SignIn';
import Header from '../containers/Header';

import MakeQuestion from '../containers/MakeQuestion';
import PlayQuestion from '../containers/PlayQuestion';
import Search from '../containers/Search';
import User from '../containers/User';

import displayModes from '../data/displayModes';


class App extends React.Component {
  componentDidMount() {
    const { setUid, setUimage, loadQuestionsList } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null && user !== undefined) {
        setUid(user.uid);
        setUimage(user.photoURL);
      } else {
        setUid('');
        setUimage('');
      }
    });
    loadQuestionsList();
  }

  render() {
    const { mode } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          margin: '0px auto',
          width: 1000,
        }}
      >
        <Header />
        <div
          id="contents"
          style={{
            position: 'absolute',
            top: 50,
          }}
        >
          {(mode === displayModes.MAKE_QUESTION) ? (<MakeQuestion />) : null}
          {(mode === displayModes.PLAY_QUESTION) ? (<PlayQuestion />) : null}
          {(mode === displayModes.SEARCH) ? (<Search />) : null}
          {(mode === displayModes.USER) ? (<User />) : null}
        </div>
        <SignIn />
      </div>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string.isRequired,
  setUid: PropTypes.func.isRequired,
  setUimage: PropTypes.func.isRequired,
  loadQuestionsList: PropTypes.func.isRequired,
};

export default App;
