import React from 'react';
// import firebase from 'firebase';
import PropTypes from 'prop-types';

import SignIn from '../containers/SignIn';
import Header from '../containers/Header';

import EditQuestion from '../containers/EditQuestion';
import MakeQuestion from '../containers/MakeQuestion';
import PlayQuestion from '../containers/PlayQuestion';
import Search from '../containers/Search';
import Profile from '../containers/Profile';

import displayModes from '../data/displayModes';


class App extends React.Component {
  componentDidMount() {
    const method = 'GET';
    fetch('./api/getMe', { method })
      .then(res => res.json())
      .then((results) => {
        console.log(results);
      });
    /* const { setUser } = this.props;
    // TODO: action creatorに移動した方が良い？？
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null && user !== undefined) {
        setUser(user);
      } else {
        // TODO: エラー処理
        firebase.auth().signInAnonymously();
      }
    }); */
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
          {(mode === displayModes.EDIT_QUESTION) ? (<EditQuestion />) : null}
          {(mode === displayModes.SEARCH) ? (<Search />) : null}
          {(mode === displayModes.USER) ? (<Profile />) : null}
        </div>
        <SignIn />
      </div>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default App;
