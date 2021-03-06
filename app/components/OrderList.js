import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OrderItem from './OrderItem';

const styles = {
  root: {
    marginBottom: 30
  },
  boldFont: {
    fontWeight: 'bold'
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  line: {
    width: '100%'
  },
  flexDiv: {
    display: 'flex',
    alignItems: 'center'
  }
};

export const OrderList = ({ orders, classes, orderItems, isHistoryOrder }) => (
  <Fragment>
    {Object.keys(orders.categories).map(key => (
      <div className={classes.root} key={key}>
        <div className={classes.titleDiv}>
          <div className={classes.flexDiv}><Typography className={classes.boldFont} variant="headline" color="primary">{key}</Typography><div>&nbsp;&nbsp;&times;&nbsp;&nbsp;{orders.categories[key].qty}</div></div>
          <div><Typography className={classes.boldFont} color="textSecondary" variant="subheading">$ {orders.categories[key].price}</Typography></div>
        </div>
        <div><hr className={classes.line} /></div>
        {[...orders.categories[key].ids].map(itemId => <OrderItem key={itemId} itemId={itemId} orderItems={orderItems} isHistoryOrder={isHistoryOrder} />)}
      </div>
    ))}
  </Fragment>
);
OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  orderItems: PropTypes.object.isRequired,
  isHistoryOrder: PropTypes.bool
};
OrderList.defaultProps = {
  isHistoryOrder: false
};
export default withStyles(styles)(OrderList);
