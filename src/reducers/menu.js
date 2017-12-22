import * as ACTIONS from '../constants/actions';
import { Map, List, fromJS } from 'immutable';

const initialState = Map(fromJS({
  open: false,
  disableGestures: false
}));

export default function menu(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.MENU_UPDATE:
      return update(state, action);
    default:
      return state;
  }
}


function update(state, action) {
  const data = action.payload;
  let _state = state;
  _state = _state.merge(data);
  return _state;
}
