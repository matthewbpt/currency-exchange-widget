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
import find from 'lodash/find';

const exchangeReducer = ({ wallet, selectedExchangeCurrencies, currencyRates }) => {  

  const buyCurrency = find(wallet, { 
    currency: selectedExchangeCurrencies.buy.currency,
  }) || { currency: selectedExchangeCurrencies.buy.currency, balance: 0 };

  const sellCurrency = find(wallet, {
    currency: selectedExchangeCurrencies.sell.currency,
  }) || { currency: selectedExchangeCurrencies.sell.currency, balance: 0 };

  return [{
      ...buyCurrency,
      balance: buyCurrency.balance + selectedExchangeCurrencies.buy.amount,
    },{
      ...sellCurrency,
      balance: sellCurrency.balance - selectedExchangeCurrencies.sell.amount,
    },
    ...wallet.filter(c => c.currency !== buyCurrency.currency && c.currency !== sellCurrency.currency)
  ];

  // return wallet.map(curr => {
  //     if (curr.currency === selectedExchangeCurrencies.sell.currency) {
  //       return Object.assign({}, curr, {
  //         balance: curr.balance - selectedExchangeCurrencies.sell.amount,
  //       });
  //     }

  //     if (curr.currency === selectedExchangeCurrencies.buy.currency) {
  //       return Object.assign({}, curr, {
  //         balance: curr.balance + selectedExchangeCurrencies.buy.amount,
  //       });
  //     }

  //     return curr;
  //   });
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