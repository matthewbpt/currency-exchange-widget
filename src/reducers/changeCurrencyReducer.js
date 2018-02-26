export const changeCurrencyReducer = (state, action) => {
  const { selectedExchangeCurrencies: currentSelectedExchangeCurrencies } = state;

  // if currency is already selected then simply close the dialog
  if (currentSelectedExchangeCurrencies[action.payload.buyOrSell].currency === action.payload.currency) {
    return {
      ...state,
      changeCurrencyDialog: {
        open: false,
      }
    };
  }

  const otherCurrencyMode = action.payload.buyOrSell === 'buy' ? 'sell' : 'buy';

  // if opposite currency is selected we can perform a swap
  // otherwise we zero out the currency exchange amounts
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

export const showChangeCurrencyReducer = (state, action) => {
  return {
    ...state,
    changeCurrencyDialog: {
      open: true,
      buyOrSell: action.payload.buyOrSell,
      currentCurrency: action.payload.currentCurrency,
    },
  };
};