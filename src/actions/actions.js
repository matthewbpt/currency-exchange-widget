import {
  CURRENCY_SELL_AMOUNT_CHANGE,
  CURRENCY_BUY_AMOUNT_CHANGE,
  EXCHANGE,
  SWAP_CURRENCY,
  SHOW_CHANGE_CURRENCY,
  CHANGE_CURRENCY,
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