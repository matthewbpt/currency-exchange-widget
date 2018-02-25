import {
  CURRENCY_SELL_AMOUNT_CHANGE,
  CURRENCY_BUY_AMOUNT_CHANGE,
  EXCHANGE,
  SWAP_CURRENCY,
  SHOW_CHANGE_CURRENCY,
  CHANGE_CURRENCY,
} from '../actions/actionTypes';
import { initialState } from '../store/initialState';
import { changeCurrencyReducer } from './changeCurrencyReducer';
import { buyOrSellAmountReducer } from './buyOrSellAmountReducer';

const updateBuyOrSellAmount = ({ selectedExchangeCurrencies, currentRate }, action) => {
  const { sell, buy } = selectedExchangeCurrencies;

  if (action.type === CURRENCY_SELL_AMOUNT_CHANGE) {
    return {
      sell: Object.assign({}, sell, { amount: action.payload.amount }),
      buy: Object.assign({}, buy, {
        amount: action.payload.amount * currentRate //calculateAmount(sell.currency, buy.currency, action.payload.amount, currencyRates)
      }),
    };
  } else {
    return {
      buy: Object.assign({}, buy, { amount: action.payload.amount }),
      sell: Object.assign({}, sell, {
        amount: action.payload.amount / currentRate // calculateAmount(buy.currency, sell.currency, action.payload.amount, currencyRates)
      }),
    };
  }
}

const exchangeReducer = ({ wallet, selectedExchangeCurrencies, currencyRates }) => {  
  return wallet.map(curr => {
      if (curr.currency === selectedExchangeCurrencies.sell.currency) {
        return Object.assign({}, curr, {
          balance: curr.balance - selectedExchangeCurrencies.sell.amount,
        });
      }

      if (curr.currency === selectedExchangeCurrencies.buy.currency) {
        return Object.assign({}, curr, {
          balance: curr.balance + selectedExchangeCurrencies.buy.amount,
        });
      }

      return curr;
    });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_SELL_AMOUNT_CHANGE:
    case CURRENCY_BUY_AMOUNT_CHANGE:
      return {
        ...state,
        selectedExchangeCurrencies: buyOrSellAmountReducer(state, action),
      };
    case EXCHANGE:
      return {
        ...state,
        wallet: exchangeReducer(state),
      };
    case SWAP_CURRENCY:
      return {
        ...state,
        selectedExchangeCurrencies: {
          buy: state.selectedExchangeCurrencies.sell,
          sell: state.selectedExchangeCurrencies.buy,
        },
        currentRate: 1 / state.currentRate,
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
    default:
      return state;
  }
};