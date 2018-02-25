const openExchangeUrl = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_OPENEXCHANGERATES_KEY}`;

export const fetchCurrentRates = async () => {
  const response = await fetch(openExchangeUrl);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};