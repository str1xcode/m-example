import * as ACTIONS from '../constants/actions';

export function updateState(state) {
  return {
    type: ACTIONS.NAV_UPDATE_STATE,
    payload: state
  }
}
