import * as ACTIONS from '../constants/actions';

export function push(type, text) {
  return {
    type: ACTIONS.ALERT_PUSH,
    payload: {
      type,
      text
    }
  }
}

export function remove(idx) {
  return {
    type: ACTIONS.ALERT_REMOVE,
    payload: idx
  }
}
