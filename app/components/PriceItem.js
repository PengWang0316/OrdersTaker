import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { AddBox, KeyboardArrowDown } from '@material-ui/icons';

import { addItemToCart } from '../actions/OrdersActions';
import { animateOrderNumber } from '../utils/AnimationUtil';

const priceDiv = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center'
};

const styles = {
  addButton: {
    width: 40,
    height: 40
  },
  icon: {
    width: 20,
    height: 20
  },
  upperCase: {
    textTransform: 'uppercase'
  },
  priceDiv,
  multiplePriceDiv: {
    ...priceDiv,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  flexEnd: {
    justifyContent: 'flex-end'
  }
};

/**
 * Show the single price or a multiple price menu.
 */
export class PriceItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    flexEnd: PropTypes.bool,
    addItemToCart: PropTypes.func.isRequired
  };
  static defaultProps = { flexEnd: false };

  state = {
    anchorEl: null
  }

  /**
   * Changing anchorEl state to an click target element or null.
   * @return {null} No Return.
   */
  handleMenuIconClick = ({ currentTarget }) =>
    this.setState(({ anchorEl }) => {
      if (anchorEl) return { anchorEl: null };
      return { anchorEl: currentTarget };
    });

  /**
   * Handle adding item to the cart click
   * @param {string} priceKey contains the name of price
   * @return {null} No return
   */
  handleAddToCartClick = priceKey => {
    animateOrderNumber();
    this.props.addItemToCart({ item: this.props.item, priceKey });
  };

  /**
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, item, flexEnd } = this.props;
    const { anchorEl } = this.state;
    const pricesObjectKeys = Object.keys(item.prices); // Save the keys of prices.
    if (pricesObjectKeys.length === 1) return (
      <div className={`${classes.priceDiv} ${flexEnd ? classes.flexEnd : ''}`}>
        <Typography color="textSecondary">$ {item.prices[pricesObjectKeys[0]]}</Typography>
        <Tooltip id="tooltip-fab" title="Add to your order" placement="right-end">
          <IconButton onClick={() => this.handleAddToCartClick(pricesObjectKeys[0])} className={classes.addButton} aria-label="Add to your order" color="primary">
            <AddBox className={classes.icon} />
          </IconButton>
        </Tooltip>
      </div>
    );
    // Show a drop down menu and all price with add buttons.
    return (
      <Fragment>
        <Tooltip id="tooltip-fab" title="Check prices" placement="right-end">
          <div className={`${classes.multiplePriceDiv} ${flexEnd ? classes.flexEnd : ''}`} onClick={this.handleMenuIconClick} role="button" tabIndex="-1">
            <Typography color="textSecondary">More Choices</Typography>
            <KeyboardArrowDown className={classes.icon} color="primary" />
          </div>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuIconClick}
        >
          {pricesObjectKeys.map(key => (
            <MenuItem onClick={this.handleMenuIconClick} className={classes.priceDiv} key={key}>
              <Typography color="primary" className={classes.upperCase}>{key}&nbsp;&nbsp;</Typography>
              <Typography color="primary">${item.prices[key]}</Typography>
              <IconButton onClick={() => this.handleAddToCartClick(key)} className={classes.addButton} aria-label="Add to your order" color="primary">
                <AddBox className={classes.icon} />
              </IconButton>
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }
}
/* istanbul ignore next */
// const mapStateToProps = state => ({
//   user: state.user
// });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  addItemToCart: pramater => dispatch(addItemToCart(pramater))
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(PriceItem));
