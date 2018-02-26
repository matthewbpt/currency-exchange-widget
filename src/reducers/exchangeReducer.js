import find from 'lodash/find';

export const exchangeReducer = (state) => {
  const { wallet, selectedExchangeCurrencies } = state;

  // get wallet for buy currency, create new one with zero balance if no wallet for currency
  const buyCurrency = find(wallet, {
    currency: selectedExchangeCurrencies.buy.currency,
  }) || { currency: selectedExchangeCurrencies.buy.currency, balance: 0 };

  const sellCurrency = find(wallet, {
    currency: selectedExchangeCurrencies.sell.currency,
  }) || { currency: selectedExchangeCurrencies.sell.currency, balance: 0 };

  // can't perform exchange if you have no balance
  if (sellCurrency.balance === 0) {
    return state;
  }

  return {
    ...state,
    wallet: [{
      ...buyCurrency,
      // update balance of buy currency
      balance: buyCurrency.balance + selectedExchangeCurrencies.buy.amount,
    }, {
      ...sellCurrency,
      // update balance of sell currency
      balance: sellCurrency.balance - selectedExchangeCurrencies.sell.amount,
    },
    ...wallet.filter(c => c.currency !== buyCurrency.currency && c.currency !== sellCurrency.currency)
    ]
  };
};