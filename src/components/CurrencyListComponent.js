import React, { Component } from 'react';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { Dialog, DialogTitle } from 'react-mdl/lib/Dialog';
import Icon from 'react-icons/lib/md/dashboard';
import MdCheck from 'react-icons/lib/md/check';
import FaGlobe from 'react-icons/lib/fa/globe';

const CurrencyItem = (props) => {
  return (
    <ListItem      
      onClick={props.onClick}
      className={`currency-list-item ${props.selected ? 'currency-list-item-selected' : ''}`}
      >
      <ListItemContent icon={<Icon/>}>{`${props.currency} · ${props.balance}`}</ListItemContent>
      <ListItemAction>
      {props.selected && <MdCheck />}
      </ListItemAction>
    </ListItem>
  );
};

export class CurrencyListComponent extends Component {
  onCurrencyClick = (buyOrSell, currency) => {
    return () => this.props.onCurrencyChange(buyOrSell, currency);
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
          <ListItem className="currency-list-item-selected">
            <ListItemContent icon={<FaGlobe/>}>Other</ListItemContent>
          </ListItem>    
        </List>
      </Dialog>
    ); 
  };
};