import React from 'react';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import getSymbolFromCurrency from 'currency-symbol-map'
import ContentEditable from 'react-contenteditable'
import striphtml from 'string-strip-html';
import { formatMax2Decimal } from '../helpers/formatNumber';

export const CurrencyComponent = (props) => {
  const balance = formatMax2Decimal(props.wallet ? props.wallet.balance : 0);
  const symbol = getSymbolFromCurrency(props.currency) || props.currency;
  const handleChange = (event) => props.onChange(parseFloat(striphtml(event.target.value) || 0));
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