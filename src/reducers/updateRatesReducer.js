export const updateRatesReducer = (state, action) => {
  return {
    ...state,
    currencyRates: action.payload,
  };
}