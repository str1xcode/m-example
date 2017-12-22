import * as ACTIONS from '../constants/actions';
import * as EXCHANGE from '../constants/exchange';
import storage from '../utils/storage';
import { Map, List, fromJS } from 'immutable';

const initialState = Map(fromJS({
  exchange: EXCHANGE.COINCAMP,
  data: [],
  list: [],
  listRevision: {},
}));

export default function currencies(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CURRENCIES_INIT:
      return init(state, action);
    case ACTIONS.CURRENCIES_UPDATE:
      return update(state, action);
    case ACTIONS.CURRENCIES_SET_EXCHANGE:
      return setExchange(state, action);
    case ACTIONS.CURRENCIES_SET_LIST:
      return setList(state, action);
    case ACTIONS.CURRENCIES_SET_LIST_REVISION:
      return setListRevision(state, action);
    default:
      return state;
  }
}

function init(state, action) {
  const {list, listRevision} = action.payload;
  let _s = state;
  _s = _s.set('list', fromJS(list));
  _s = _s.set('listRevision', fromJS(listRevision));
  return _s;
}

function update(state, action) {
  const data = action.payload;
  let _s = state;
  _s = _s.set('data', fromJS(data));
  return _s;
}

function setExchange(state, action) {
  const val = action.payload;
  let _s = state;
  _s = _s.set('exchange', val);
  return _s;
}

function setList(state, action) {
  const list = action.payload;
  let _s = state;
  _s = _s.set('list', fromJS(list));
  storage.setItem('currencies:list', list);
  return _s;
}

function setListRevision(state, action) {
  const data = action.payload;
  let _s = state;
  _s = _s.set('listRevision', fromJS(data));
  storage.setItem('currencies:listRevision', data);
  return _s;
}
