import * as ACTIONS from '../constants/actions';
import { Map, List, fromJS } from 'immutable';
/*
loaded - array of loaded data keys
currencies:list
currencies:listRevision
currencies:data
*/
const initialState = Map(fromJS({
  loaded: [],
}));

export default function loading(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOADING_LOADED_CLEAR:
      return loadedClear(state, action);
    case ACTIONS.LOADING_LOADED_ADD:
      return loadedAdd(state, action);
    case ACTIONS.LOADING_LOADED_REMOVE:
      return loadedRemove(state, action);
    default:
      return state;
  }
}

function loadedClear(state, action) {
  let _s = state;
  _s = _s.get('loaded').clear();
  return _s;
}

function loadedAdd(state, action) {
  const dataKey = action.payload;
  let _s = state;
  _s = _s.set('loaded', _s.get('loaded').push(dataKey));
  return _s;
}

function loadedRemove(state, action) {
  const dataKey = action.payload;
  let _s = state;
  const _dataIndex = _s.get('loaded').findIndex(i => i === dataKey);
  if (_dataIndex !== -1) {
    _s = _s.set('loaded', _s.get('loaded').delete(_dataIndex));
  }
  return _s;
}
