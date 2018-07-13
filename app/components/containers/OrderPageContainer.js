import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import OrderSummary from '../OrderSummary';
import OrderList from '../OrderList';
import ItemDetailDialog from '../ItemDetailDialog';
import { fetchAllMenu } from '../../actions/MenuActions';
import ShowDetailDialogContext from '../../contexts/ShowDetailDialogContext'; // Import the context to pass the function.

const styles = {
  root: {
    maxWidth: 1200,
    padding: '10px 20px',
    margin: '15px auto',
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '"listPanel summaryPanel"',
    gridGap: '2em'
  },
  listPanel: {
    gridArea: 'listPanel'
  },
  summaryPanel: {
    gridArea: 'summaryPanel'
  },
  summaryContent: {
    position: 'sticky',
    top: 70
  },
  '@media (max-width: 668px)': {
    root: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '100% 1fr',
      gridTemplateAreas: `"summaryPanel"
                          "listPanel"`
    }
  }
};

/**
 * Showing the customers' order detail and allow them to add number for items, remove items, clear orders, scan QR code for the table, and place orders.
 */
export class OrderPageContainer extends Component {

  /**
   * Parsing the Redux state orders to an object this component can use. Also calculate the price for the order.
   * @param {object} orders comes from Redux's state.
   * @param {object} menuItems has all items' information.
   * @return {object} Return an object that is sorted to use category to be the key.
   * The return object structure is like below:
   * {
   *    categories: {
   *      categoryA: { price: xx, qty: xx, ids: [id1, id2, ...] }, // ids is a Set
   *      ...
   *    },
   *    totalQty: xxx,
   *    price: xxx,
   *    tax: xxx,
   *    totalPrice: xxx,
   * }
   */
  static parseOrders = (orders, menuItems) => {
    const newOrders = { // Initial some properties
      totalQty: 0, price: 0, tax: 0, totalPrice: 0, categories: {}
    };
    // price and tax will use cent in order to avoid the inaccurace.
    Object.keys(orders).forEach(key => {
      if (key === 'qty') return;
      Object.keys(orders[key].qty).forEach(priceKey => { // Adding all price
        const category = newOrders.categories[menuItems[key].category];
        const price = menuItems[key].prices[priceKey];
        const qty = orders[key].qty[priceKey];
        // Calculating the value for a specific category
        newOrders.categories[menuItems[key].category] = category ?
          { price: ((category.price * 100) + (price * 100 * qty)) / 100, qty: category.qty + qty, ids: category.ids } :
          { price: (price * 100 * qty) / 100, qty, ids: new Set() }; // If the category is empty, initialize a empty ids set. Using Set to prevent duplicated ids.
        newOrders.categories[menuItems[key].category].ids.add(key); // Saving the id to the ids field.
        // Calculating the total value
        newOrders.totalQty += qty; // Adding the total quantity
        newOrders.price = ((newOrders.price * 100) + (price * 100 * qty)) / 100; // Adding the price up
        newOrders.tax = (((newOrders.tax * 100) + (((menuItems[key].taxRate * 100) * (price * 100 * qty)) / 10000)) / 100).toFixed(2);
      });
    });
    newOrders.totalPrice = ((newOrders.price * 100) + (newOrders.tax * 100)) / 100;
    return newOrders;
  };

  static propTypes = {
    menuItems: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    fetchAllMenu: PropTypes.func.isRequired
  };

  /**
   * Call the fetchAllMenu to get Redux state for its children components if the menus is still null.
   * @param {object} props contains the value for the componnet.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    if (Object.keys(props.menuItems).length === 0) props.fetchAllMenu();
  }

  state = {
    isDialogOpen: false,
    currentItem: null
  }

  /**
   * Showing the item detail dialog.
   * Making sure the currentItem has been setup before open the dialog.
   * @param {string} itemId is the id of an item.
   * @return {null} No return.
   */
  showDetailDialog = itemId => this.setState(
    { currentItem: this.props.menuItems[itemId] },
    () => this.handleDialogToggle()
  );

  /**
   * Setting the isDialogOpen state to a opposite value.
   * @return {null} Ignore tht return.
   */
  handleDialogToggle = () => this.setState(({ isDialogOpen }) => ({ isDialogOpen: !isDialogOpen }));

  /**
   * The render method
   * @return {jsx} Return the jsx for the component.
   */
  render() {
    const { classes, menuItems, orders } = this.props;
    const { currentItem, isDialogOpen } = this.state;
    const isMenuItemsReady = Object.keys(menuItems).length !== 0;
    const newOrders = isMenuItemsReady ? OrderPageContainer.parseOrders(orders, menuItems) : {};
    return (
      <div className={classes.root}>
        <div className={classes.summaryPanel}>
          <div className={classes.summaryContent}>{isMenuItemsReady && <OrderSummary orders={newOrders} />}</div>
        </div>
        <div className={classes.listPanel}>
          {isMenuItemsReady && (
            <ShowDetailDialogContext.Provider value={this.showDetailDialog}>
              <OrderList orders={newOrders} />
            </ShowDetailDialogContext.Provider>
          )}
        </div>
        {isMenuItemsReady && <ItemDetailDialog onClose={this.handleDialogToggle} open={isDialogOpen} item={currentItem} />}
      </div>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  menuItems: state.menuItems,
  orders: state.orders
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderPageContainer));
