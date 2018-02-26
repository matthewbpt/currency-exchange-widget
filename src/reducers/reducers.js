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
} from '../actions/actionTypes';
import { initialState } from '../store/initialState';
import { changeCurrencyReducer, showChangeCurrencyReducer } from './changeCurrencyReducer';
import { buyOrSellAmountReducer } from './buyOrSellAmountReducer';
import { exchangeReducer } from './exchangeReducer';
import { updateRatesReducer } from './updateRatesReducer';
import { swapCurrencyReducer } from './swapCurrencyReducer';
import { showToastReducer } from './showToastReducer';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_SELL_AMOUNT_CHANGE:
    case CURRENCY_BUY_AMOUNT_CHANGE:
    case REFRESH_AMOUNTS:
      return buyOrSellAmountReducer(state, action);
    case EXCHANGE:
      return exchangeReducer(state, action);
    case SWAP_CURRENCY:
      return swapCurrencyReducer(state, action);
    case SHOW_CHANGE_CURRENCY:
      return showChangeCurrencyReducer(state, action);
    case CHANGE_CURRENCY:
      return changeCurrencyReducer(state, action);
    case UPDATE_RATES:
      return updateRatesReducer(state, action);
    case SHOW_TOAST:
      return showToastReducer(state, action);
    default:
      return state;
  }
};