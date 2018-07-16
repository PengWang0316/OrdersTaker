import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { RemoveShoppingCart, Send } from '@material-ui/icons';
import {
  Card, CardContent, Button, Typography, List, CircularProgress,
  ListItem, ListItemText, ListItemSecondaryAction, Tooltip
} from '@material-ui/core';

import QRCodeScanner from './QRCodeScanner/';
import { clearOrders, placeOrder } from '../actions/OrdersActions';
import AlertDialog from './AlertDialog';
import { HOME_PAGE_URL, ORDER_STATUS_PAGE_URL } from '../config';

/* istanbul ignore next */
const styles = theme => ({
  card: {
    padding: '10px 5px'
  },
  title: {
    fontWeight: 'bold',
    maringBottom: 20
  },
  categoryTitle: {
    fontSize: 14
  },
  flexEndDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  fontBold: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  hrStyle: {
    border: 0,
    borderBottom: '1px dotted #ccc',
    background: '#999',
    margin: '10px 0'
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
    reduxOrders: PropTypes.object.isRequired,
    clearOrders: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    isBtnDisable: false,
    isAlertDialogOpen: false,
    isShowProgress: false
  };

  /**
   * Set the isAlertDialogOpen state to the opposite value.
   * @return {null} No return.
   */
  handleToggleAlertDialog = () => this.setState(({ isAlertDialogOpen }) => ({ isAlertDialogOpen: !isAlertDialogOpen }));

  /**
   * Calling the clearOrders action and redirect to the home page
   * @return {null} No Return.
   */
  handleClearOrders = () => {
    this.props.clearOrders();
    this.props.history.push(HOME_PAGE_URL);
  };

  /**
   * Call the placeOrder action and push the page to the order status checking page.
   * @return {null} No return.
   */
  handlePlaceBtnClick = () => {
    this.setState({ isShowProgress: true, isBtnDisable: true });
    return placeOrder(this.props.reduxOrders, this.props.user.jwt).then(data => {
      this.props.clearOrders();
      this.props.history.push(`${ORDER_STATUS_PAGE_URL}/${data}`);
    }).catch(err => console.error(err));
  };

  /**
   * The render method for the component.
   * @return {jsx} Return the jsx.
   */
  render() {
    const { classes, orders, reduxOrders } = this.props;
    const { isAlertDialogOpen, isBtnDisable, isShowProgress } = this.state;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="subheading" color="primary">Order summary</Typography>
            <List disablePadding dense>
              {Object.keys(orders.categories).map(category => (
                <ListItem button key={category}>
                  <ListItemText className={classes.categoryTitle} primary={`${category} × ${orders.categories[category].qty}`} />
                  <ListItemSecondaryAction>
                    <Typography color="textSecondary" className={classes.categoryPrice}>${orders.categories[category].price}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <div className={classes.hrStyle} />
            <div className={classes.flexBetweenDiv}>
              <QRCodeScanner />
              <div>
                <div className={classes.flexEndDiv}><Typography color="primary">Order Price:&nbsp;&nbsp;</Typography><Typography color="textSecondary">${orders.price}</Typography></div>
                <div className={classes.flexEndDiv}><Typography color="primary">Tax:&nbsp;&nbsp;</Typography><Typography color="textSecondary">${orders.tax}</Typography></div>
                <div className={classes.flexEndDiv}><Typography className={classes.fontBold} color="primary">Total Price:&nbsp;&nbsp;</Typography><Typography className={classes.fontBold} color="textSecondary">${orders.totalPrice}</Typography></div>
              </div>
            </div>

            <div className={`${classes.flexEndDiv} ${classes.buttonDiv}`}>
              {isShowProgress && <CircularProgress size={30} thickness={6} />}
              <Button onClick={this.handleToggleAlertDialog} variant="contained" size="small" className={classes.clearBtn}>Clear<RemoveShoppingCart className={classes.icon} /></Button>
              <Tooltip title={reduxOrders.tableNumber ? 'After place your order, the kitchen will start to cook your meal' : 'Please scan the QR code ont the table first'}>
                <div><Button onClick={this.handlePlaceBtnClick} variant="contained" size="small" color="primary" className={classes.placeBtn} disabled={!reduxOrders.tableNumber || isBtnDisable}>Place<Send className={classes.icon} /></Button></div>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
        <AlertDialog
          open={isAlertDialogOpen}
          onClose={this.handleToggleAlertDialog}
          title="Clear all item in the order"
          content="This action will clear all item you has already add in the order."
          onConfirm={this.handleClearOrders}
          confirmButtonText="Clear"
        />
      </Fragment>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  reduxOrders: state.orders,
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearOrders: () => dispatch(clearOrders())
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withStyles(styles)(OrderSummary))));
// export default withStyles(styles)(OrderSummary);
