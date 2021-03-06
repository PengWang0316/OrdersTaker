import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { RemoveShoppingCart, Send } from '@material-ui/icons';
import { Card, CardContent, Button, CircularProgress, Tooltip } from '@material-ui/core';

import QRCodeScanner from './QRCodeScanner';
import { clearCart, placeOrder } from '../actions/CartActions';
import { addTempOrderId } from '../actions/TempOrderIdsActions';
import { increaseOrderAmount } from '../actions/OrdersActions';
import AlertDialog from './AlertDialog';
import { HOME_PAGE_URL, ORDERS_PAGE_URL } from '../config';
import LoginDialogContext from '../contexts/LoginDialogContext';
import OrderSummaryCategories from './OrderSummaryCategories';
import OrderSummaryPrice from './OrderSummaryPrice';

/* istanbul ignore next */
const styles = theme => ({
  card: {
    padding: '10px 5px'
  },
  flexEndDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  placeBtn: {
    fontSize: 12
  },
  clearBtn: {
    fontSize: 12,
    margin: '0 10px',
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900]
    }
  },
  icon: {
    marginLeft: 6,
    fontSize: 16
  },
  buttonDiv: {
    marginTop: 20
  },
  flexBetweenDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

/**
 * Showing the order summary information and allow users to scan table number as well as place the order.
 */
export class OrderSummary extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    clearCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    addTempOrderId: PropTypes.func.isRequired,
    increaseOrderAmount: PropTypes.func.isRequired
  };

  state = {
    isBtnDisable: false,
    isAlertDialogOpen: false, // The state for clear order alert
    isLoginSuggestionDialogOpen: false, // The state for login suggestion dialog
    isShowProgress: false
  };

  /**
   * Set the isAlertDialogOpen state to the opposite value.
   * @return {null} No return.
   */
  handleToggleAlertDialog = () => this.setState(({ isAlertDialogOpen }) => ({ isAlertDialogOpen: !isAlertDialogOpen }));

  /**
   * Set the isLoginSuggestionDialogOpen state to the opposite value.
   * @return {null} No return.
   */
  handleToggleLoginSuggestionDialog = () => this.setState(({ isLoginSuggestionDialogOpen }) => ({ isLoginSuggestionDialogOpen: !isLoginSuggestionDialogOpen }));

  /**
   * Calling the clearCart action and redirect to the home page
   * @return {null} No Return.
   */
  handleClearCart = () => {
    this.props.clearCart();
    this.props.history.push(HOME_PAGE_URL);
  };

  /**
   * Showing the cricular progress, disable the place button, and call the placeOrder action.
   * After placeOrder action run, clear order state in the Redux and redirect the page to the order state page.
   * @return {Promise} Return a promise.
   */
  placeOrder = () => {
    const { cart, orders, user, reduxOrders, history } = this.props;
    this.setState({ isShowProgress: true, isBtnDisable: true });
    return placeOrder({ ...cart, price: orders.price, tax: orders.tax, totalPrice: orders.totalPrice }, user.jwt)
      .then(data => {
        this.props.clearCart();
        if (!user._id) this.props.addTempOrderId(data); // If the user has not logged in, call the addTempOrderId action.
        else if (reduxOrders.amount !== null) this.props.increaseOrderAmount(); // If the user has logged in and the fetchOrderAmount action has already initialized amount, increase amount.
        history.push(ORDERS_PAGE_URL);
      }).catch(err => console.error(err));
  };

  /**
   * If the user has already logged in, Call the placeOrder action and push the page to the order status checking page.
   * Otherwise, show the user a suggest login dialog.
   * @return {null} No return.
   */
  handlePlaceBtnClick = () => {
    if (this.props.user._id) this.placeOrder();
    else this.handleToggleLoginSuggestionDialog();
  };

  /**
   * Closing the login suggestion alert dialog and call the function that retreived from context to show the login dialog.
   * @return {null} No return.
   */
  handleShowLoginDialog =() => {
    this.handleToggleLoginSuggestionDialog();
    this.handleToggleLoginDialog();
  };

  /**
   * The render method for the component.
   * @return {jsx} Return the jsx.
   */
  render() {
    const { classes, orders, cart } = this.props;
    const {
      isAlertDialogOpen, isBtnDisable, isShowProgress, isLoginSuggestionDialogOpen
    } = this.state;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <OrderSummaryCategories orders={orders} />
            <div className={classes.flexBetweenDiv}>
              <QRCodeScanner />
              <OrderSummaryPrice orders={orders} />
            </div>

            <div className={`${classes.flexEndDiv} ${classes.buttonDiv}`}>
              {isShowProgress && <CircularProgress size={30} thickness={6} />}
              <Button onClick={this.handleToggleAlertDialog} variant="contained" size="small" className={classes.clearBtn}>Clear<RemoveShoppingCart className={classes.icon} /></Button>
              <Tooltip title={cart.tableNumber ? 'After place your order, the kitchen will start to cook your meal' : 'Please scan the QR code ont the table first'}>
                <div><Button onClick={this.handlePlaceBtnClick} variant="contained" size="small" color="primary" className={classes.placeBtn} disabled={!cart.tableNumber || isBtnDisable}>Place<Send className={classes.icon} /></Button></div>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
        <AlertDialog
          open={isAlertDialogOpen}
          onClose={this.handleToggleAlertDialog}
          title="Clear all item in the order"
          content="This action will clear all item you has already add in the order."
          onFirstButton={this.handleToggleAlertDialog}
          onSecondButton={this.handleClearCart}
          secondButtonText="Clear"
        />
        <LoginDialogContext.Consumer>
          {({ handleToggleLoginDialog }) => {
            this.handleToggleLoginDialog = handleToggleLoginDialog;
            return (
              <AlertDialog
                open={isLoginSuggestionDialogOpen}
                onClose={this.handleToggleLoginSuggestionDialog}
                title="Would you like to login?"
                content="If you login your account, the order can be tracked easier. Would you like to login first?"
                onFirstButton={this.placeOrder}
                onSecondButton={this.handleShowLoginDialog}
                firstButtonText="Place Order Without Login"
                secondButtonText="Login First"
              />);
          }}
        </LoginDialogContext.Consumer>
      </Fragment>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
  reduxOrders: state.orders
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
  addTempOrderId: orderId => dispatch(addTempOrderId(orderId)),
  increaseOrderAmount: () => dispatch(increaseOrderAmount())
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(OrderSummary))));
// export default withStyles(styles)(OrderSummary);
