import {
  CURRENCY_SELL_AMOUNT_CHANGE,
  CURRENCY_BUY_AMOUNT_CHANGE,
  EXCHANGE,
  SWAP_CURRENCY,
  SHOW_CHANGE_CURRENCY,
  CHANGE_CURRENCY,
  UPDATE_RATES,
  SHOW_TOAST,
  REFRESH_AMOUNTS,
} from './actionTypes';

export const currencyFromAmountAction = (amount) => ({
  type: CURRENCY_SELL_AMOUNT_CHANGE,
  payload: {
    amount
  }
});

export const currencyTomountAction = (amount) => ({
  type: CURRENCY_BUY_AMOUNT_CHANGE,
  payload: {
    amount
  }
});

export const exchangeAction = () => ({
  type: EXCHANGE,
});

export const swapCurrencyAction = () => ({
  type: SWAP_CURRENCY,
});

export const showChangeCurrencyAction = (buyOrSell, currentCurrency) => ({
  type: SHOW_CHANGE_CURRENCY,
  payload: {
    buyOrSell,
    currentCurrency,
  }
});

export const changeCurrencyAction = (buyOrSell, currency) => ({
  type: CHANGE_CURRENCY,
  payload: {
    buyOrSell,
    currency,
  }
});

export const updateRatesAction = (currencyRates) => ({
  type: UPDATE_RATES,
  payload: currencyRates,
});

export const showToastAction = (message) => ({
  type: SHOW_TOAST,
  payload: message,
});

export const refreshAmountsActions = () => ({
  type: REFRESH_AMOUNTS,
});