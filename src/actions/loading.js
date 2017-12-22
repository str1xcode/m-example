import * as ACTIONS from '../constants/actions';

export function loadedClear() {
  return {
    type: ACTIONS.LOADING_LOADED_CLEAR,
    payload: null
  }
}

export function loadedAdd(dataKey) {
  return {
    type: ACTIONS.LOADING_LOADED_ADD,
    payload: dataKey
  }
}

export function loadedRemove(dataKey) {
  return {
    type: ACTIONS.LOADING_LOADED_REMOVE,
    payload: dataKey
  }
}
