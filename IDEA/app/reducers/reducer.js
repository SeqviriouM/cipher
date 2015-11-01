import {combineReducers} from 'redux';
import {crypt} from './crypt';
import {local} from './local';

export const appReducer = combineReducers({
  crypt,
  local,
});
