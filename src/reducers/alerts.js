import * as ACTIONS from '../constants/actions';
import { Map, List, fromJS } from 'immutable';

const MAX_ALERTS = 1;

const initialState = Map(fromJS({
  list: []
}));

export default function alerts(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ALERT_PUSH:
      return push(state, action);
    case ACTIONS.ALERT_REMOVE:
      return remove(state, action);
    default:
      return state;
  }
}


function push(state, action) {
  const data = action.payload;
  let _state = state;
  _state = _state.updateIn(['list'], arr => arr.unshift(data));
  if (_state.get('list').size > MAX_ALERTS) {
    _state = _state.set('list', _state.get('list').setSize(MAX_ALERTS));
  }
  return _state;
}

function remove(state, action) {
  const idx = action.payload;
  let _state = state;
  let list = _state.get('list').toJS();
  list.splice(idx, 1);
  _state = _state.set('list', fromJS(list));
  return _state;
}
