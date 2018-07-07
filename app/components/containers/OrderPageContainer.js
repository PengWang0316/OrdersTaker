import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import OrderSummary from '../OrderSummary';
import { fetchAllMenu } from '../../actions/MenuActions';

const styles = {
  root: {
    maxWidth: 1200,
    padding: '10px 20px',
    margin: '15px auto'
  },
  listPanel: {
    
  },
  summaryPanel: {
    float: 'right',
    position: 'sticky',
    top: 70
  },
  '@media (max-width: 600px)': {
    summaryPanel: {
      float: 'none'
    }
  }
};

/**
 * Showing the customers' order detail and allow them to add number for items, remove items, clear orders, scan QR code for the table, and place orders.
 */
export class OrderPageContainer extends Component {
  static propTypes = {
    menus: PropTypes.array.isRequired,
    fetchAllMenu: PropTypes.func.isRequired
  };

  /**
   * Call the fetchAllMenu to get Redux state for its children components if the menus is still null.
   * @param {object} props contains the value for the componnet.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    if (!props.menus) props.fetchAllMenu();
  }

  state = {
    isOpen: false
  }

  /**
   * Parsing the Redux state orders to an object this component can use. Also calculate the price for the order.
   * @param {object} orders comes from Redux's state.
   * @return {object} Return an object that is sorted to use category to be the key.
   * The return object structure is like below:
   * {
   *    categories: {
   *      categoryA: { price: xx, qty: xx },
   *      ...
   *    },
   *    totalQty: xxx,
   *    price: xxx,
   *    tax: xxx,
   *    totalPrice: xxx,
   * }
   */
  parseOrders = orders => {
    const newOrders = { // Initial some properties
      totalQty: 0, price: 0, tax: 0, totalPrice: 0, categories: {}
    };
    // price and tax will use cent in order to avoid the inaccurace.
    Object.keys(orders).forEach(key => {
      if (key === 'qty') return;
      const category = newOrders.categories[orders[key].category];
      Object.keys(orders[key].qty).forEach(priceKey => { // Adding all price
        const price = orders[key].prices[priceKey];
        const qty = orders[key].qty[priceKey];
        // Calculating the value for a specific category
        newOrders.categories[orders[key].category] = category ?
          { price: ((category.price * 100) + (price * 100 * qty)) / 100, qty: category.qty + qty } :
          { price: (price * 100 * qty) / 100, qty };
        // Calculating the total value
        newOrders.totalQty += qty; // Adding the total quantity
        newOrders.price = ((newOrders.price * 100) + (price * 100 * qty)) / 100; // Adding the price up
        newOrders.tax = (((newOrders.tax * 100) + (((orders[key].taxRate * 100) * (price * 100 * qty)) / 10000)) / 100).toFixed(2);
      });
    });
    newOrders.totalPrice = ((newOrders.price * 100) + (newOrders.tax * 100)) / 100;
    return newOrders;
  };

  /**
   * The render method
   * @return {jsx} Return the jsx for the component.
   */
  render() {
    const { classes, menus, orders } = this.props;
    const newOrders = this.parseOrders(orders);
    return (
      <div className={classes.root}>
        {menus && (
          <Fragment>
            <div className={classes.summaryPanel}>
              <OrderSummary orders={newOrders} />
            </div>
            <div className={classes.listPanel}>a</div>
          </Fragment>
        )}
      </div>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  menus: state.menus,
  orders: state.orders
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderPageContainer));
