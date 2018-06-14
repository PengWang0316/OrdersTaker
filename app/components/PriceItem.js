import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { AddBox, KeyboardArrowDown } from '@material-ui/icons';

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
  }
};

/**
 * Show the single price or a multiple price menu.
 */
export class PriceItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

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
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, item } = this.props;
    const { anchorEl } = this.state;
    const pricesObjectKeys = Object.keys(item.prices); // Save the keys of prices.
    if (pricesObjectKeys.length === 1) return (
      <div className={classes.priceDiv}>
        <Typography color="textSecondary">$ {item.prices[pricesObjectKeys[0]]}</Typography>
        <Tooltip id="tooltip-fab" title="Add to your order" placement="right-end">
          <IconButton className={classes.addButton} aria-label="Add to your order" color="primary">
            <AddBox className={classes.icon} />
          </IconButton>
        </Tooltip>
      </div>
    );
    // Show a drop down menu and all price with add buttons.
    return (
      <Fragment>
        <Tooltip id="tooltip-fab" title="Check prices" placement="right-end">
          <div className={classes.multiplePriceDiv} onClick={this.handleMenuIconClick} role="button" tabIndex="-1">
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
              <IconButton className={classes.addButton} aria-label="Add to your order" color="primary">
                <AddBox className={classes.icon} />
              </IconButton>
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }
}
export default withStyles(styles)(PriceItem);
