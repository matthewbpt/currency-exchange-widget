import find from 'lodash/find';

export const exchangeReducer = (state) => {
  const { wallet, selectedExchangeCurrencies } = state;

  const buyCurrency = find(wallet, {
    currency: selectedExchangeCurrencies.buy.currency,
  }) || { currency: selectedExchangeCurrencies.buy.currency, balance: 0 };

  const sellCurrency = find(wallet, {
    currency: selectedExchangeCurrencies.sell.currency,
  }) || { currency: selectedExchangeCurrencies.sell.currency, balance: 0 };

  return {
    ...state,
    wallet: [{
      ...buyCurrency,
      balance: buyCurrency.balance + selectedExchangeCurrencies.buy.amount,
    }, {
      ...sellCurrency,
      balance: sellCurrency.balance - selectedExchangeCurrencies.sell.amount,
    },
    ...wallet.filter(c => c.currency !== buyCurrency.currency && c.currency !== sellCurrency.currency)
    ]
  };
};