import * as ACTIONS from '../constants/actions';
import { Map, List, fromJS } from 'immutable';

const initialState = Map(fromJS({
  isOpen: false,
  height: null,
  width: null,
  screenX: null,
  screenY: null
}));

export default function keyboard(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.KEYBOARD_UPDATE:
      return update(state, action);
    default:
      return state;
  }
}


function update(state, action) {
  const data = action.payload;
  let _state = state;
  _state = _state.set('isOpen', data.isOpen);
  _state = _state.set('height', data.height);
  _state = _state.set('width', data.width);
  _state = _state.set('screenX', data.screenX);
  _state = _state.set('screenY', data.screenY);
  return _state;
}
