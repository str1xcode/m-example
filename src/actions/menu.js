import * as ACTIONS from '../constants/actions';

export function update(params) {
  return {
    type: ACTIONS.MENU_UPDATE,
    payload: params
  }
}
