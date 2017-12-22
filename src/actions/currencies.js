import * as ACTIONS from '../constants/actions';
import * as EXCHANGE from '../constants/exchange';
import * as API from '../constants/api';
import storage from '../utils/storage';
import {loadedClear, loadedRemove, loadedAdd} from './loading';

export function updateData() {
  return async (dispatch, getState) => {
    dispatch(loadedRemove('currencies:data'));
    const exchange = getState().get('currencies').get('exchange');
    if (exchange === EXCHANGE.COINCAMP) {
      const data = await updateFromCoincamp();
      dispatch({
        type: ACTIONS.CURRENCIES_UPDATE,
        payload: data
      });
      dispatch(loadedAdd('currencies:data'));
    }
  }
}

export function updateList() {
  return async (dispatch, getState) => {
    dispatch(loadedRemove('currencies:list'));
    const res = await fetch(API.GET_CURRENCY_FULL_LIST);
    const data = await res.json();
    dispatch({
      type: ACTIONS.CURRENCIES_SET_LIST,
      payload: data
    });
    dispatch(loadedAdd('currencies:list'));
  }
}

export function init() {
  return async (dispatch, getState) => {
    const list = await storage.getItem('currencies:list');
    const listRevision = await storage.getItem('currencies:listRevision');
    if (!list || !listRevision) return;
    dispatch({
      type: ACTIONS.CURRENCIES_INIT,
      payload: {
        list,
        listRevision,
      }
    });
    dispatch(loadedAdd('currencies:list'));
    dispatch(loadedAdd('currencies:listRevision'));
  }
}

export function updateListRevision() {
  return async (dispatch, getState) => {
    try {
      dispatch(loadedRemove('currencies:listRevision'));
      const res = await fetch(API.GET_CURRENCIES_REVISION);
      const data = await res.json();
      dispatch({
        type: ACTIONS.CURRENCIES_SET_LIST_REVISION,
        payload: data
      })
      dispatch(loadedAdd('currencies:listRevision'));
    } catch (err) {

    }
  }
}

export function updateListWithRevision() {
  return async (dispatch, getState) => {
    try {
      const revision = getState().get('currencies').get('listRevision');
      await dispatch(updateListRevision());
      const _revision = getState().get('currencies').get('listRevision');
      if (revision.get('number') !== _revision.get('number')) {
        await dispatch(updateList());
      }
    } catch (err) {

    }
  }
}

export function resetLoading() {
  return {
    type: ACTIONS.CURRENCIES_RESET_LOADING,
    payload: null
  }
}

export function updateLoading() {
  return {
    type: ACTIONS.CURRENCIES_UPDATE_LOADING,
    payload: null
  }
}

export function setExchange(val) {
  return {
    type: ACTIONS.CURRENCIES_SET_EXCHANGE,
    payload: val
  }
}


async function updateFromCoincamp() {
  try {
    const res = await fetch(API.COINCAMP_ALL_CURRENCIES);
    const data = await res.json();
    const normalizedData = normalizeCoincampData(data);
    return normalizedData;
  } catch (err) {

  }
}

function normalizeCoincampData(data) {
  let _data = data.map((item, idx) => ({
    name: item.short,
    fullName: item.long,
    change_24h_USD: item.cap24hrChange,
    price_USD: item.price
  }));
  return _data;
}
