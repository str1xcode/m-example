import * as ACTIONS from '../constants/actions';

export function update(data) {
  return {
    type: ACTIONS.KEYBOARD_UPDATE,
    payload: data
  }
}
