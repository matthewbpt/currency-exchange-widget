export const changeCurrencyReducer = (state, action) => {
  const { selectedExchangeCurrencies: currentSelectedExchangeCurrencies } = state;

  if (currentSelectedExchangeCurrencies[action.payload.buyOrSell].currency === action.payload.currency) {
    return {
      ...state,
      changeCurrencyDialog: {
        open: false,
      }
    };
  }

  const otherCurrencyMode = action.payload.buyOrSell === 'buy' ? 'sell' : 'buy'; 
  const shouldSwap = currentSelectedExchangeCurrencies[otherCurrencyMode].currency === action.payload.currency
  
  const selectedExchangeCurrencies = {
    [action.payload.buyOrSell]: shouldSwap ? currentSelectedExchangeCurrencies[otherCurrencyMode] : {
      currency: action.payload.currency,
      amount: 0
    },
    [otherCurrencyMode]: shouldSwap ? currentSelectedExchangeCurrencies[action.payload.buyOrSell]  : {
      ...currentSelectedExchangeCurrencies[otherCurrencyMode],
      amount: 0
    },
  }

  return {
    ...state,
    selectedExchangeCurrencies,
    changeCurrencyDialog: {
      open: false,
    },
  };
}