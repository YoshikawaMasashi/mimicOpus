import { connect } from 'react-redux';

import { setUser, loadMe } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  mode: state.display.mode,
});

const mapDispatchToProps = dispatch => ({
  loadMe: () => loadMe(dispatch),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);