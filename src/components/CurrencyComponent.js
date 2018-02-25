import React, { Component } from 'react';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import getSymbolFromCurrency from 'currency-symbol-map'
import ContentEditable from 'react-contenteditable'
import striptags from 'striptags';

const precision = (a) => {
  if (!isFinite(a)) return 0;
  let e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}

const formatMax2Decimal = (n) => {
  const num = parseFloat(n);
  if (precision(num) > 2) {
    return num.toFixed(2);
  }

  return n.toString();
}

export const CurrencyComponent = (props) => {
  const balance = formatMax2Decimal(props.wallet ? props.wallet.balance : 0);
  const symbol = getSymbolFromCurrency(props.currency) || props.currency;
  const handleChange = (event) => props.onChange(parseFloat(striptags(event.target.value) || 0));
  const handleCurrencyClick = () => props.onCurrencyClick(props.buy ? 'buy' : 'sell', props.currency);
  return (
    <div className={`currency ${props.buy ? 'currency-buy' : 'currency-sell'}`}>
      <div className="currency-name" onClick={handleCurrencyClick}>
        {props.currency}<MdKeyboardArrowDown/>
        <div className="currency-exchange-balance">Balance: {`${symbol}${balance}`}</div>
      </div>
      <ContentEditable
        className={`currency-input currency-input-${props.buy ? 'buy' : 'sell'}`}
        html={formatMax2Decimal(props.amount)}
        onChange={handleChange} />
    </div>
  );
};