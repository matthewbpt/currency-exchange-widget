export const getExchangeRate = (from, to, currencyRates) => {
  const fromRate = currencyRates.base === from ? 1 : currencyRates.rates[from];
  const toRate = currencyRates.base === to ? 1 : currencyRates.rates[to];
  return (toRate / fromRate);
};