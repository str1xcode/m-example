import { createSelector } from 'reselect';
// import _ from 'lodash';
import randomColor from 'randomcolor';

export const getWallets = (state) => state.get('wallets');

export const getCurrencies = (state) => state.get('currencies');

export const getLoaded = (state) => state.get('loading').get('loaded');

export const getPortfolio = createSelector([getWallets, getCurrencies, getLoaded], (wallets, currencies, loaded) => {
  // if data not loaded
  if (
    !loaded.includes('currencies:data') ||
    !loaded.includes('currencies:list') ||
    // currencies.get('loaded') !== false ||
    currencies.get('data').size == 0 ||
    wallets.get('loading') !== false ||
    wallets.get('list').size === 0
  ) return false;

  //-- -- --
  let portfolio = {
    total_BTC: 0,
    total_BTC_old: 0,
    total_USD: 0,
    total_USD_old: 0,
    change_24h_BTC: 0,
    change_24h_USD: 0,
    BTC_USD: 0,
    wallets: [],
    currency: {}
  };
  //-- -- --

  const BTC_index = currencies.get('data').findIndex(i => i.get('name') === 'BTC');
  const BTC_data = currencies.get('data').get(BTC_index).toJS();
  const USD_BTC = 1 / BTC_data.price_USD;
  const BTC_USD_old = BTC_data.price_USD - (BTC_data.change_24h_USD * BTC_data.price_USD / 100);
  const USD_BTC_old = 1 / BTC_USD_old;

  portfolio.BTC_USD = BTC_data.price_USD;

  const wallets_list = wallets.get('list').toJS();
  // prepare walelts
  for (let idx in wallets_list) {
    let wallet_item = wallets_list[idx];
    portfolio.wallets.push(wallet_item);
    portfolio.currency[wallet_item.currency] = {
      name: wallet_item.currency,
      price_USD: null,
      change_24h_USD: null,
      price_USD_old: null,
      price_BTC: null,
      price_BTC_old: null,
      change_24h_BTC: null,
      total_USD: 0,
      total_BTC: 0,
      percent: 0,
      color: randomColor()
    };
  }

  // calc currencies
  for (let key in portfolio.currency) {
    let item = portfolio.currency[key];
    const currency_idx = currencies.get('data').findIndex(i => i.get('name') === item.name);
    const currency_data = currencies.get('data').get(currency_idx).toJS();
    item.price_USD = currency_data.price_USD;
    item.change_24h_USD = currency_data.change_24h_USD;
    item.price_USD_old = currency_data.price_USD - (currency_data.change_24h_USD * currency_data.price_USD / 100);
    item.price_BTC = USD_BTC * item.price_USD;
    item.price_BTC_old = USD_BTC_old * item.price_USD_old;
    item.change_24h_BTC = (item.price_BTC - item.price_BTC_old) / item.price_BTC * 100;
  }

  // calc  wallets and portfolio total
  for (let idx in portfolio.wallets) {
    let item = portfolio.wallets[idx];
    let currency = portfolio.currency[item.currency];
    item.total_BTC = currency.price_BTC * item.finalBalance;
    item.total_BTC_old = currency.price_BTC_old * item.finalBalance;
    item.total_USD = currency.price_USD * item.finalBalance;
    item.total_USD_old = currency.price_USD_old * item.finalBalance;
    currency.total_USD += item.total_USD;
    currency.total_BTC += item.total_BTC;
    portfolio.total_BTC += item.total_BTC;
    portfolio.total_BTC_old += item.total_BTC_old;
    portfolio.total_USD += item.total_USD;
    portfolio.total_USD_old += item.total_USD_old;
  }

  // calc currencies
  for (let key in portfolio.currency) {
    let item = portfolio.currency[key];
    item.percent = item.total_USD / portfolio.total_USD * 100;
  }

  // calc change portfolio
  portfolio.change_24h_USD = (portfolio.total_USD - portfolio.total_USD_old) / portfolio.total_USD * 100;
  portfolio.change_24h_BTC = (portfolio.total_BTC - portfolio.total_BTC_old) / portfolio.total_BTC * 100;

  return portfolio;
});
