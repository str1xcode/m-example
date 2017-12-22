import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers';
import { Map, fromJS, Iterable } from 'immutable';

const initialState = Map(fromJS({}));

let enhancers = [
  applyMiddleware(thunk)
];

if (__DEV__ === true) {
  const logger = createLogger({
    stateTransformer: (state) => {
      if (Iterable.isIterable(state)) return state.toJS();
      else return state;
    }
  });
  enhancers.push(applyMiddleware(logger));
}

const Store = createStore(rootReducer, initialState, compose(...enhancers));

export default Store;
