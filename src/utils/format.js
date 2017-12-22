import numeral from 'numeral';
import _ from 'lodash';

_.assign(numeral.localeData('en'), {
    abbreviations: {
        thousand: "k",
        million: "M",
        billion: "B",
        trillion: "T"
    }
});
numeral.locale('en');

export function price_USD (val, rate = false) {
  let num = numeral(val);
  if (rate > 1 || rate === false) {
    return num.format('$0,0.00a');
  } else {
    return num.format('$0,0.0000a');
  }
}

export function exchangeRate(val) {
  let num = numeral(val);
  return num.format('$0.00');
}

export function exchangeRate_BTC(val) {
  let num = numeral(val);
  return num.format('0.0000');
}

export function price_currency(val) {
  let num = numeral(val);
  return num.format('0,000.0000');
}

export function change(val) {
  let num = numeral(val);
  return num.format('0.00')+'%';
}
