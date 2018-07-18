import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';

import ShowDetailDialogContext from '../contexts/ShowDetailDialogContext'; // Import the context to pass the function.
import { ITEM_ONE_PRICE_KEY } from '../config';
import { addItemToCart, removeItemFromCart } from '../actions/CartActions';

const flex = {
  display: 'flex',
  alignItems: 'center'
};

/* istanbul ignore next */
const styles = theme => ({
  root: {
    ...flex,
    alignItems: 'flex-start',
    margin: '25px 0 10px 0'
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 18,
    transition: 'all 0.4s',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '4px 4px 12px 1px rgba(0, 0, 0, 0.4)',
      transform: 'scale(1.1, 1.1)'
    }
  },
  itemTitle: {
    fontWeight: 'bold'
  },
  priceDiv: {
    ...flex,
    flexWrap: 'wrap'
  },
  priceNumberDiv: {
    ...flex,
    marginRight: 15,
    border: `1px solid ${theme.palette.primary.light}`,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: 10,
    marginTop: 8
  },
  priceKeyWord: {
    fontWeight: 'bold',
    marginRight: 6,
    textTransform: 'uppercase'
  },
  icon: {
    width: 20,
    height: 20
  },
  iconButton: {
    width: 40,
    height: 40
  }
});

/**
 * Show the detailed information about the item.
 * @param {object} props contains values for the component
 * @return {jsx} Return jsx for the component.
 */
export const OrderItem = ({
  itemId, classes, orderItems, menuItems, addItemToCartProp, removeItemFromCartProp
}) => {
  const item = menuItems[itemId];
  return (
    <div className={classes.root}>
      <ShowDetailDialogContext.Consumer>
        { showDetailDialog => <Avatar src={item.photo} className={classes.avatar} onClick={() => showDetailDialog(itemId)} /> }
      </ShowDetailDialogContext.Consumer>
      <div>
        <Typography color="primary" variant="subheading" className={classes.itemTitle}>{item.name}</Typography>
        <div className={classes.priceDiv}>
          {Object.keys(item.prices).map(priceKey => (
            <div className={classes.priceNumberDiv} key={priceKey}>
              <Typography color="primary" className={classes.priceKeyWord}>{priceKey === ITEM_ONE_PRICE_KEY ? '' : priceKey}</Typography>
              <Typography color="textSecondary" className={classes.priceKeyWord}>${item.prices[priceKey]}</Typography>
              <IconButton onClick={() => addItemToCartProp({ item, priceKey })} className={classes.iconButton}><AddCircle className={classes.icon} color="primary" /></IconButton>
              <Typography color="textSecondary">{orderItems[itemId].qty[priceKey] || 0}</Typography>
              <IconButton onClick={() => removeItemFromCartProp({ item, priceKey })} className={classes.iconButton}><RemoveCircle className={classes.icon} color="primary" /></IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
OrderItem.propTypes = {
  classes: PropTypes.object.isRequired,
  orderItems: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  menuItems: PropTypes.object.isRequired,
  addItemToCartProp: PropTypes.func.isRequired,
  removeItemFromCartProp: PropTypes.func.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  orderItems: state.cart.items,
  menuItems: state.menuItems
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  addItemToCartProp: paramter => dispatch(addItemToCart(paramter)),
  removeItemFromCartProp: paramter => dispatch(removeItemFromCart(paramter))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderItem));
