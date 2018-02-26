export const swapCurrencyReducer = (state) => {
  return {
    ...state,
    selectedExchangeCurrencies: {
      buy: state.selectedExchangeCurrencies.sell,
      sell: state.selectedExchangeCurrencies.buy,
    }
  };
};