import * as ACTIONS from '../constants/actions';
import * as API from '../constants/api';

export function setLoading(val) {
  return {
    type: ACTIONS.WALLETS_SET_LOADING,
    payload: val
  }
}

export function getAll() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const token = getState().get('user').get('token');
    try {
      const res = await fetch(API.GET_WALLETS(token));
      const data = await res.json();
      // normalize data
      for (let item of data) {
        item.currency = item.currency.toUpperCase();
      }
      if (data) {
        const results = await Promise.all(data.map((item) => fetch(API.GET_WALLET(item._id, token))));
        let _data = results.map((i) => i.json());
        dispatch({
          type: ACTIONS.WALLETS_LIST_UPDATE,
          payload: data
        })
      }
    } catch (err) {
      if (typeof err === 'string') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'error',
            text: err
          }
        })
      }
    }
    dispatch(setLoading(false));
  }
}

export function changeCurrency(val) {
  return {
    type: ACTIONS.WALLETS_CHANGE_CURRENCY,
    payload: val
  }
}

export function addWallet(currencyKey, pubKey, walletName, isToken, cb) {
  return async (dispatch, getState) => {
    const token = getState().get('user').get('token');
    try {
      if (!pubKey || !walletName) throw 'empty field';
      const res = await fetch(API.ADD_WALLET(token, currencyKey, pubKey, walletName, isToken));
      const data = await res.json();
      if (data.error) throw data.error;
      if (data.status === 'OK') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'info',
            text: 'wallet added'
          }
        })
        dispatch(getAll())
        if (typeof cb === 'function') cb();
      }
    } catch (err) {
      if (typeof err === 'string') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'error',
            text: err
          }
        })
      }
    }
  }
}

export function removeWallet(walletId) {
  return async (dispatch, getState) => {
    const token = getState().get('user').get('token');
    try {
      const res = await fetch(API.REMOVE_WALLET(token, walletId));
      const data = await res.json();
      if (data.status === 'OK') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'info',
            text: 'wallet has been removed'
          }
        })
        dispatch(getAll())
      }
    } catch (err) {
      if (typeof err === 'string') {
        dispatch({
          type: ACTIONS.ALERT_PUSH,
          payload: {
            type: 'error',
            text: err
          }
        })
      }
    }
  }
}
