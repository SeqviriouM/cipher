import {compose, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {appReducer} from 'reducers/reducer';


const store = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)(appReducer);

export default store;
