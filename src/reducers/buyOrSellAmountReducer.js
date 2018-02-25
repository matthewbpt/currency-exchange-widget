import { getExchangeRate } from '../helpers/getExchangeRate';
import {
  CURRENCY_SELL_AMOUNT_CHANGE,
  CURRENCY_BUY_AMOUNT_CHANGE,
} from '../actions/actionTypes';

export const buyOrSellAmountReducer = ({ selectedExchangeCurrencies, currentRate, currencyRates }, action) => {
  const { sell, buy } = selectedExchangeCurrencies;

  if (action.type === CURRENCY_SELL_AMOUNT_CHANGE) {
    return {
      sell: {
        ...sell,
        amount: action.payload.amount
      },
      buy: {
        ...buy,
        amount: action.payload.amount * getExchangeRate(sell.currency, buy.currency, currencyRates)
      },
    };
  } else {
    return {
      buy: { ...buy, amount: action.payload.amount },
      sell: {
        ...sell,
        amount: action.payload.amount * getExchangeRate(buy.currency, sell.currency, currencyRates)
      },
    };
  }
}