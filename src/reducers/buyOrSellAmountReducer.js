import { getExchangeRate } from '../helpers/getExchangeRate';
import {
  CURRENCY_SELL_AMOUNT_CHANGE,
  REFRESH_AMOUNTS,
} from '../actions/actionTypes';

export const buyOrSellAmountReducer = (state, action) => {
  const { selectedExchangeCurrencies, currencyRates } = state;
  const { sell, buy } = selectedExchangeCurrencies;

  const amount = action.type === REFRESH_AMOUNTS ? sell.amount : action.payload.amount;

  if (action.type === CURRENCY_SELL_AMOUNT_CHANGE || action.type === REFRESH_AMOUNTS) {
    return {
      ...state,
      selectedExchangeCurrencies: {
        sell: {
          ...sell,
          amount: amount
        },
        buy: {
          ...buy,
          amount: amount * getExchangeRate(sell.currency, buy.currency, currencyRates)
        },
      }
    };
  } else {
    return {
      ...state,
      selectedExchangeCurrencies: {
        buy: {
          ...buy,
          amount: amount
        },
        sell: {
          ...sell,
          amount: amount * getExchangeRate(buy.currency, sell.currency, currencyRates)
        },
      }
    }
  }
}