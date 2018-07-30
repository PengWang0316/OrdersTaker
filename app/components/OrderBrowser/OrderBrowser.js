import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@kevinwang0316/react-materialui-pagination';
// import Pagination from '../Pagination';

import OrderCard from './OrderCard';
import { MAX_ORDER_AMOUNT } from '../../config';

const styles = {
  root: {
    width: '90%',
    margin: '40px auto'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardDiv: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

export const OrderBrowser = ({
  orders, classes, title, menuItems, offset, totalOrder, onPageNumberClick
}) => (
  <div className={classes.root}>
    <Typography color="primary" className={classes.title}>{title}</Typography>
    {Object.keys(menuItems).length !== 0 && (
      <div className={classes.cardDiv}>
        {orders.map(order => <OrderCard order={order} menuItems={menuItems} key={order._id} />)}
      </div>
    )}
    <Pagination
      offset={offset}
      limit={MAX_ORDER_AMOUNT}
      total={totalOrder}
      onClick={onPageNumberClick}
    />
  </div>
);
OrderBrowser.prototype = {
  orders: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.object.isRequired,
  onPageNumberClick: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  totalOrder: PropTypes.number.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  menuItems: state.menuItems
});
export default connect(mapStateToProps, null)(withStyles(styles)(OrderBrowser));
