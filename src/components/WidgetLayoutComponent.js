import React from 'react';
import MdClose from 'react-icons/lib/md/close';
import { CurrencyComponent } from './CurrencyComponent';
import { CurrencyListComponent } from './CurrencyListComponent';
import MdTrendingUp from 'react-icons/lib/md/trending-up';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Button from 'react-mdl/lib/Button';
import find from 'lodash/find';
import MdSwapVert from 'react-icons/lib/md/swap-vert';
import getSymbolFromCurrency from 'currency-symbol-map';
import { getExchangeRate } from '../helpers/getExchangeRate';
import Snackbar from 'react-mdl/lib/Snackbar';

const noop = () => {};

export const WidgetLayoutComponent = (props) => {
  const buySymbol =  getSymbolFromCurrency(props.buy.currency) || props.buy.currency;
  const sellSymbol = getSymbolFromCurrency(props.sell.currency) || props.sell.currency;
  return (
    <div className="currency-exchange-widget" style={{ height: props.height, width: props.width}}>
      <div className="currency-exchange-widget-top">
      <div style={{fontSize: '15px'}}>
        <MdClose /> Exchange
      </div>
      <div class="trending-button">
        <MdTrendingUp />
      </div>
      </div>
      <CurrencyComponent
        amount={props.sell.amount}
        currency={props.sell.currency}
        onChange={props.onSellAmountChange}
        wallet={props.sellWallet}
        onCurrencyClick={props.onShowCurrencyClick}
        sell
      />
      <div className="divider">
        <div className="currency-swap" onClick={props.onSwapClick}>
          <MdSwapVert />
        </div>
        <div className="exchange-rate">&nbsp;&nbsp;&nbsp;<MdTrendingUp />&nbsp;{`${sellSymbol}1 = ${buySymbol}${props.currentRate.toFixed(4)}`}&nbsp;&nbsp;&nbsp;</div>
        <div style={{height: '20px', width: '20px', margin: '0 5px 0 5px'}}/>
      </div>
      <CurrencyComponent
        amount={props.buy.amount}
        currency={props.buy.currency}
        onChange={props.onBuyAmountChange}
        wallet={props.buyWallet}
        onCurrencyClick={props.onShowCurrencyClick}
        buy
      />
      <div className="button-area">
        <Button
          disabled={props.exchangeDisabled}
          raised
          accent
          className="button-exchange"
          onClick={props.onExchangeClick}>
          Exchange
        </Button>
      </div>
      <CurrencyListComponent
        {...props.changeCurrencyDialog}
        onCurrencyChange={props.onCurrencyChange}
        wallet={props.wallet}
        availableCurrencies={props.availableCurrencies}/>

      <Snackbar active={!!props.toastMessage} onTimeout={noop}>{props.toastMessage}</Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  const sellWallet = find(state.wallet, a => a.currency === state.selectedExchangeCurrencies.sell.currency) || { currency: state.selectedExchangeCurrencies.sell.currency, balance: 0 };
  const buyWallet = find(state.wallet, a => a.currency === state.selectedExchangeCurrencies.buy.currency) || { currency: state.selectedExchangeCurrencies.buy.currency, balance: 0 };

  return {
    sell: state.selectedExchangeCurrencies.sell,
    buy: state.selectedExchangeCurrencies.buy,
    sellWallet,
    buyWallet,
    exchangeDisabled: sellWallet.balance === 0 || sellWallet.balance < state.selectedExchangeCurrencies.sell.amount,
    currentRate: getExchangeRate(state.selectedExchangeCurrencies.sell.currency, state.selectedExchangeCurrencies.buy.currency, state.currencyRates),
    changeCurrencyDialog: state.changeCurrencyDialog,
    wallet: state.wallet,
    availableCurrencies: Object.keys(state.currencyRates.rates),
    toastMessage: state.toastMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSellAmountChange: (value) => dispatch(actions.currencyFromAmountAction(value)),
    onBuyAmountChange: (value) => dispatch(actions.currencyTomountAction(value)),
    onExchangeClick: () => dispatch(actions.exchangeAction()),
    onSwapClick: () => dispatch(actions.swapCurrencyAction()),
    onShowCurrencyClick: (buyOrSell, currencyCurrency) => dispatch(actions.showChangeCurrencyAction(buyOrSell, currencyCurrency)),
    onCurrencyChange: (buyOrSell, currency) => dispatch(actions.changeCurrencyAction(buyOrSell, currency)),
  };
};

export const WidgetLayoutConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetLayoutComponent);

