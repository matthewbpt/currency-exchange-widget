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
import { changeCurrencyReducer } from './changeCurrencyReducer';
import { buyOrSellAmountReducer } from './buyOrSellAmountReducer';
import { exchangeReducer } from './exchangeReducer';
import { updateRatesReducer } from './updateRatesReducer';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_SELL_AMOUNT_CHANGE:
    case CURRENCY_BUY_AMOUNT_CHANGE:
    case REFRESH_AMOUNTS:
      return buyOrSellAmountReducer(state, action);
    case EXCHANGE:
      return exchangeReducer(state);
    case SWAP_CURRENCY:
      return {
        ...state,
        selectedExchangeCurrencies: {
          buy: state.selectedExchangeCurrencies.sell,
          sell: state.selectedExchangeCurrencies.buy,
        },
      };
    case SHOW_CHANGE_CURRENCY:
      return {
        ...state,
        changeCurrencyDialog: {
          open: true,
          buyOrSell: action.payload.buyOrSell,
          currentCurrency: action.payload.currentCurrency,
        },
      };
    case CHANGE_CURRENCY:
      return changeCurrencyReducer(state, action);
    case UPDATE_RATES:
      return updateRatesReducer(state, action);
    case SHOW_TOAST:
      return {
        ...state,
        toastMessage: action.payload,
      }
    default:
      return state;
  }
};