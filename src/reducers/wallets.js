import * as ACTIONS from '../constants/actions';
import { Map, List, fromJS } from 'immutable';

/*
  wallet list item {
    _id
    added
    address
    currency
    finalBalance
    name
    userId
    __v
  }
*/

const initialState = Map(fromJS({
  loading: null,
  list: [],
  currency: 'USD',
}));

export default function wallets(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.WALLETS_LIST_UPDATE:
      return listUpdate(state, action);
    case ACTIONS.WALLETS_ADD:
      return add(state, action);
    case ACTIONS.WALLETS_SET_LOADING:
      return setLoading(state, action);
    case ACTIONS.WALLETS_CHANGE_CURRENCY:
      return changeCurrency(state, action);
    default:
      return state;
  }
}

function listUpdate(state, action) {
  const data = action.payload;
  let _s = state;
  _s = _s.set('list', fromJS(data));
  return _s;
}


function add(state, action) {

  return state;
}

function setLoading(state, action) {
  const val = action.payload;
  let _state = state;
  _state = _state.set('loading', val);
  return _state;
}

function changeCurrency(state, action) {
  const val = action.payload;
  let _state = state;
  _state = _state.set('currency', val);
  return _state;
}
