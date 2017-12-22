import * as ACTIONS from '../constants/actions';
import { Navigator } from '../../Navigator';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  state: fromJS(Navigator.router.getStateForAction({type: "Navigation/NAVIGATE", routeName: "Intro"}))
});

export default ( state = initialState, action ) => {
  switch (action.type) {
    case ACTIONS.NAV_UPDATE_STATE:
      return updateState(state, action);
    default:
      return state;
  }
}

function updateState(state, action) {
  const data = action.payload;
  let _state = state;
  _state = _state.set('state', fromJS(data));
  return _state;
}
