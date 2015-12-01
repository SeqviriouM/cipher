import {Map} from 'immutable';

const EMPTY_MAP = Map();

export function local(state = EMPTY_MAP, action) {
  switch (action.type) {
  default:
    return state;
  }
}
