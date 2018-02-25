import React, { Component } from 'react';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Dialog, DialogTitle } from 'react-mdl/lib/Dialog';
import Icon from 'react-icons/lib/md/dashboard';
import MdCheck from 'react-icons/lib/md/check';
import FaGlobe from 'react-icons/lib/fa/globe';
import { formatMax2Decimal } from '../helpers/formatNumber';

const CurrencyItem = (props) => {
  return (
    <ListItem      
      onClick={props.onClick}
      className={`currency-list-item ${props.selected ? 'currency-list-item-selected' : ''}`}
      >
      <ListItemContent icon={<Icon/>}>{`${props.currency} · ${formatMax2Decimal(props.balance)}`}</ListItemContent>
      <ListItemAction>
      {props.selected && <MdCheck />}
      </ListItemAction>
    </ListItem>
  );
};

export class CurrencyListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      other: false,
    };
  }

  onCurrencyClick = (buyOrSell, currency) => {
    return () => {
      this.props.onCurrencyChange(buyOrSell, currency);
      this.setState({
        other: false,
      });
    }
  }

  onOtherClick = () => {
    this.setState({
      other: !this.state.other,
    });
  }

  render() {
    return (
      <Dialog open={this.props.open}>
      <DialogTitle><span className="currency-list-title">Choose currency:</span></DialogTitle>
        <List>
          {this.props.wallet.map(currency => {
            return (
              <CurrencyItem
                {...currency}
                selected={currency.currency === this.props.currentCurrency}
                key={currency.currency}
                onClick={this.onCurrencyClick(this.props.buyOrSell, currency.currency)}              
                />              
            );
          })}
          <ListItem className="currency-list-item currency-list-item-other" onClick={this.onOtherClick}>
            <ListItemContent icon={<FaGlobe/>}>Other</ListItemContent>
          </ListItem>
          {this.state.other && this.props.availableCurrencies.map(currency =>{
            return (
              <CurrencyItem
                currency={currency}
                balance={0}
                key={currency}
                onClick={this.onCurrencyClick(this.props.buyOrSell, currency)}              
                /> 
            );
          })}
        </List>
      </Dialog>
    ); 
  };
};