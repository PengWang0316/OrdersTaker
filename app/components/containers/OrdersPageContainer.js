import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchOrderAmount, fetchUnloginUserOrders, fetchLoginUserOrders } from '../../actions/OrdersActions';
import { removeTempOrderId, linkOrderToAccount } from '../../actions/TempOrderIdsActions';
import { fetchAllMenu } from '../../actions/MenuActions';
import OrderBrowser from '../OrderBrowser';
import OrdersPageContext from '../../contexts/OrdersPageContext';
import OrderDetailDialog from '../OrderDetailDialog';
import AlertDialog from '../AlertDialog';
import CheckCircleIconSnackbar from '../snackbars/CheckCircleIconSnackbar';

/**
 * The component shows a user's order records.
 * This component will show both login user records and the orders were saved to Redux state when the user was not login.
 */
export class OrdersPageContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    tempOrderIds: PropTypes.array.isRequired,
    menuItems: PropTypes.object.isRequired,
    fetchOrderAmount: PropTypes.func.isRequired,
    fetchAllMenu: PropTypes.func.isRequired,
    loginUserOrderAmount: PropTypes.number,
    removeTempOrderId: PropTypes.func.isRequired
  };

  static defaultProps = {
    loginUserOrderAmount: null
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
    isDetailedDialogOpen: false, // The indicator of showing the detailed order dialog.
    isRemoveAlertOpen: false, // The indicator of showing the remove alert dialog.
    isLinkAlertOpen: false, // The indicator of showing the link alert dialog.
    isSnackbarOpen: false,
    snackbarMessage: '',
    // loginUserOrderOffset: 0,
    // unLoginUserOrderOffset: 0,
    loginUserOrders: [],
    unloginUserOrders: []
  }

  /**
   * Calling the fetchOrderAmount if the user has already logged in and the amount is still be null.
   * @return {null} No return.
   */
  componentDidMount() {
    if (this.props.user._id) {
      this.fetchLoginUserOrders(0);
      if (this.props.orders.loginUserOrderAmount === null) this.props.fetchOrderAmount(this.props.user);
    }
    if (this.props.tempOrderIds.length !== 0) this.fetchUnloginUserOrders(0);
  }

  /**
   * Removing the element has _id equal deleteOrderId
   * @param {array} unloginUserOrders is the old order array.
   * @param {string} deleteOrderId is the order id will be removed from the original array.
   * @return {array} Return an array without the element that has _id equal deleteOrderId.
   */
  static getNewUnloginOrdersArray = (unloginUserOrders, deleteOrderId) => {
    const newArray = [];
    unloginUserOrders.forEach(element => { if (element._id !== deleteOrderId) newArray.push(element); });
    return newArray;
  };

  /**
   * Fetching the orders for a login user.
   * @param {int} offset is the how many order will be skipped.
   * @return {null} No return.
   */
  fetchLoginUserOrders = offset => fetchLoginUserOrders(offset, this.props.user)
    .then(loginUserOrders => this.setState({ loginUserOrders })).catch(err => console.error(err));

  /**
   * Fetching the orders for a unlogin user.
   * @param {int} offset is the how many order will be skipped.
   * @return {null} No return.
   */
  fetchUnloginUserOrders = offset => fetchUnloginUserOrders(offset, this.props.tempOrderIds)
    .then(unloginUserOrders => this.setState({ unloginUserOrders })).catch(err => console.error(err));

  /**
   * Toggling the isOpenDetailDialog state.
   * @return {null} No return.
   */
  toggleDetailDialog = () => this.setState(({ isDetailedDialogOpen }) => ({ isDetailedDialogOpen: !isDetailedDialogOpen }));

  /**
   * Setting up the order to currentOrder state and call toggleDetailDialog function.
   * @param {object} order is the current order will be showed in the detailed dailog
   * @return {null} No return
   */
  handleShowDetail = order => this.setState({ currentOrder: order }, () => this.toggleDetailDialog());

  /**
   * Showing the confirm dailog and handle the remove process
   * @return {null} No return
   */
  handleRmoveUnloginOrder = () => {
    const orderId = this.unloginOrderId;
    this.props.removeTempOrderId(this.unloginOrderId);
    this.handleToggleRemoveAlertDialog(null);
    return this.setState(({ unloginUserOrders }) => ({ unloginUserOrders: OrdersPageContainer.getNewUnloginOrdersArray(unloginUserOrders, orderId), snackbarMessage: 'Removed Successfully' }), () => this.handleToggleSnackbar());
  }

  /**
   * Showing a confirm dailog and handle the linking process
   * @return {null} No return
   */
  handleLinkOrder = () => {
    const orderId = this.unloginOrderId;
    this.props.linkOrderToAccount(orderId, this.props.user.jwt);
    this.handleToggleLinkAlertDialog(null);
    return this.setState(({ unloginUserOrders }) => ({ unloginUserOrders: OrdersPageContainer.getNewUnloginOrdersArray(unloginUserOrders, orderId), snackbarMessage: 'Linked to your account sccessfully' }), () => this.handleToggleSnackbar());
  };

  /**
   * Setting the isLinkAlertOpen state to the opposite value.
   * @param {string} orderId is the id of the unlogin order.
   * @return {null} No return.
   */
  handleToggleRemoveAlertDialog = orderId => {
    this.unloginOrderId = orderId;
    return this.setState(({ isRemoveAlertOpen }) => ({ isRemoveAlertOpen: !isRemoveAlertOpen }));
  }

  /**
   * Setting the isRemoveAlertOpen state to the opposite value.
   * @param {string} orderId is the id of the unlogin order.
   * @return {null} No return.
   */
  handleToggleLinkAlertDialog = orderId => {
    this.unloginOrderId = orderId;
    return this.setState(({ isLinkAlertOpen }) => ({ isLinkAlertOpen: !isLinkAlertOpen }));
  }

  /**
   * Setting up the state isSnackbarOpen to an opposite value.
   * @return {null} No return.
   */
  handleToggleSnackbar = () => this.setState(({ isSnackbarOpen }) => ({ isSnackbarOpen: !isSnackbarOpen }));

  /**
   * The render method
   * @return {jsx} Return the jsx for the component
   */
  render() {
    const { tempOrderIds, loginUserOrderAmount, menuItems, user } = this.props;
    const { loginUserOrders, unloginUserOrders, currentOrder, isDetailedDialogOpen, isRemoveAlertOpen, isLinkAlertOpen, isSnackbarOpen, snackbarMessage } = this.state;
    return (
      <OrdersPageContext.Provider value={{ handleShowDetail: this.handleShowDetail, handleRmoveUnloginOrder: this.handleToggleRemoveAlertDialog, handleLinkOrder: this.handleToggleLinkAlertDialog }}>
        {loginUserOrders.length !== 0 && loginUserOrderAmount !== null && (
          <OrderBrowser
            orders={loginUserOrders}
            title={`Orders for ${this.props.user.displayName}`}
            // onShowDetail={this.handleShowDetail}
            // onRemoveOrder={this.handleRmoveUnloginOrder}
            // onLinkOrder={this.handleLinkOrder}
            totalOrder={loginUserOrderAmount}
            offset={0}
            onPageNumberClick={this.fetchLoginUserOrders}
          />
        )}
        {unloginUserOrders.length !== 0 && (
          <OrderBrowser
            orders={unloginUserOrders}
            title="Unsaved Orders"
            // onShowDetail={this.handleShowDetail}
            // onRemoveOrder={this.handleRmoveUnloginOrder}
            // onLinkOrder={this.handleLinkOrder}
            totalOrder={tempOrderIds.length}
            offset={0}
            onPageNumberClick={this.fetchUnloginUserOrders}
          />
        )}
        <OrderDetailDialog order={currentOrder} open={isDetailedDialogOpen} onClose={this.toggleDetailDialog} menuItems={menuItems} />
        {tempOrderIds.length !== 0 && (
          <Fragment>
            <AlertDialog
              open={isRemoveAlertOpen}
              onClose={this.handleToggleRemoveAlertDialog}
              title="Remove this order from this device?"
              content="After remove this order, you will no longer see it in this device."
              onFirstButton={this.handleRmoveUnloginOrder}
              onSecondButton={this.handleToggleRemoveAlertDialog}
              firstButtonText="Remove"
              secondButtonText="Cancel"
            />
            {user._id && (
              <AlertDialog
                open={isLinkAlertOpen}
                onClose={this.handleToggleLinkAlertDialog}
                title="Is it your order?"
                content="Link this order to your account."
                onFirstButton={this.handleLinkOrder}
                onSecondButton={this.handleToggleLinkAlertDialog}
                firstButtonText="Link"
                secondButtonText="Cancel"
              />
            )}
            <CheckCircleIconSnackbar open={isSnackbarOpen} onClose={this.handleToggleSnackbar} message={snackbarMessage} />
          </Fragment>
        )}
      </OrdersPageContext.Provider>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user,
  tempOrderIds: state.tempOrderIds,
  menuItems: state.menuItems,
  loginUserOrderAmount: state.orders.loginUserOrderAmount
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchOrderAmount: jwtMessage => dispatch(fetchOrderAmount(jwtMessage)),
  fetchAllMenu: () => dispatch(fetchAllMenu()),
  removeTempOrderId: orderId => dispatch(removeTempOrderId(orderId)),
  linkOrderToAccount: (orderId, jwt) => dispatch(linkOrderToAccount(orderId, jwt)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPageContainer);
