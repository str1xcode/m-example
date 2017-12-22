import { combineReducers } from 'redux-immutable';

import keyboard from './keyboard';
import alerts from './alerts';
import wallets from './wallets';
import user from './user';
import currencies from './currencies';
import menu from './menu';
import nav from './nav';
import loading from './loading';

const rootReducer = combineReducers({
  keyboard,
  alerts,
  user,
  wallets,
  currencies,
  menu,
  nav,
  loading,
});

export default rootReducer;
