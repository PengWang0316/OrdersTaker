import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = {
  flexEndDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  fontBold: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }
};

export const OrderSummaryPrice = ({ orders, classes }) => (
  <div>
    <div className={classes.flexEndDiv}><Typography color="primary">Order Price:&nbsp;&nbsp;</Typography><Typography color="textSecondary">${orders.price}</Typography></div>
    <div className={classes.flexEndDiv}><Typography color="primary">Tax:&nbsp;&nbsp;</Typography><Typography color="textSecondary">${orders.tax}</Typography></div>
    <div className={classes.flexEndDiv}><Typography className={classes.fontBold} color="primary">Total Price:&nbsp;&nbsp;</Typography><Typography className={classes.fontBold} color="textSecondary">${orders.totalPrice}</Typography></div>
  </div>
);
OrderSummaryPrice.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};
export default withStyles(styles)(OrderSummaryPrice);
