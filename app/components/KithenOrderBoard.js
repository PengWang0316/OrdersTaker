import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import io from 'socket.io-client';

import { fetchUnfinishedOrders, updateFinishedItems } from '../actions/OrdersActions';
import UnfinishedOrderRow from './UnfinishedOrder/UnfinishedOrderRow';
import UnfinishedOrderList from './UnfinishedOrder/UnfinishedOrderList';
import { SOCKETIO_URL, SOCKETIO_EVENT_ADD_NEW_ORDER, SOCKETIO_EVENT_UPDATE_ORDER_ITEM } from '../config';

const styles = {
  paper: {
    padding: 10
  }
};

/**
 * The component to show the kithen's order board
 */
export class KithenOrderBoard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    unfinishedOrders: null
  };

  /**
   * Initializing the socketio and fetching the unfinished orders.
   * @param {object} props contains all component's prop value.
   * @return {null} No return.
   */
  componentDidMount() {
    this.socket = io(SOCKETIO_URL, {
      extraHeaders: {
        'Access-Control-Allow-Credentials': 'omit'
      }
    });
    this.socket.on(SOCKETIO_EVENT_ADD_NEW_ORDER, this.addNewOrderCallback);
    this.socket.on(SOCKETIO_EVENT_UPDATE_ORDER_ITEM, this.updateOrderItemCallback);

    return fetchUnfinishedOrders(this.props.user)
      .then(data => this.setState({ unfinishedOrders: KithenOrderBoard.getObjectFromArray(data) }));
  }

  /**
   * Transfer an array to an object with id as the key.
   * @param {array} array is the array will be transferred.
   * @return {object} Return an object and use _id for the key.
   */
  static getObjectFromArray = array => {
    const object = {};
    array.forEach(element => { object[element._id] = element; });
    return object;
  };

  /**
   * Updating the database for the item that is finished and update the unfinishedOrders state.
   * @param {string} orderId is the id of the order is changing.
   * @param {string} itemId is the id of the item is changing.
   * @return {null} No return.
   */
  handleItemClick = (orderId, itemId) => this.setState(({ unfinishedOrders }) => { // Updating the unfinishedOrders state
    const newState = { ...unfinishedOrders, [orderId]: { ...unfinishedOrders[orderId] } };
    if (!newState[orderId].finishedItems) newState[orderId].finishedItems = { [itemId]: true };
    else {
      const finishedItems = { ...newState[orderId].finishedItems };
      if (newState[orderId].finishedItems[itemId]) delete finishedItems[itemId];
      else finishedItems[itemId] = true;
      newState[orderId].finishedItems = finishedItems;
    }
    // Call the back-end api
    updateFinishedItems({
      orderId,
      itemId,
      isItemFinished: newState[orderId].finishedItems[itemId],
      isOrderFinished: newState[orderId].finishedItems ? Object.keys(newState[orderId].items).length === Object.keys(newState[orderId].finishedItems).length : false,
      jwt: this.props.user.jwt
    });
    return { unfinishedOrders: newState };
  });

  /**
   * Adding a new order to the unfinishedOrders state.
   * @param {object} order is the new order we received.
   * @return {null} No return.
   */
  addNewOrderCallback = order => this.setState(({ unfinishedOrders }) => ({
    unfinishedOrders: {
      ...unfinishedOrders,
      [order._id]: { ...order, dateStamp: new Date() }
    }
  }));

  /**
   * Updating the item status in the state.
   * @param {object} params is an object that contains order id, item id, and finish status.
   * @return {null} No return.
   */
  updateOrderItemCallback = ({
    orderId, itemId, isItemFinished
  }) => this.setState(({ unfinishedOrders }) => {
    const finishedItems = unfinishedOrders[orderId].finishedItems ? { ...unfinishedOrders[orderId].finishedItems } : {};
    if (!isItemFinished) delete finishedItems[itemId];
    else finishedItems[itemId] = true;
    return {
      unfinishedOrders: {
        ...unfinishedOrders,
        [orderId]: {
          ...unfinishedOrders[orderId],
          finishedItems
        }
      }
    };
  });

  /**
   * The render method.
   * @return {jsx} Return the jsx for the component
   */
  render() {
    const { classes } = this.props;
    const { unfinishedOrders } = this.state;
    return (
      <Paper className={classes.paper}>
        {unfinishedOrders && Object.keys(unfinishedOrders).map(key => (
          <ExpansionPanel key={key}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <UnfinishedOrderRow order={unfinishedOrders[key]} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <UnfinishedOrderList order={unfinishedOrders[key]} onClick={this.handleItemClick} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  user: state.user
});
/* istanbul ignore next */
// const mapDispatchToProps = dispatch => ({
//   updateFishedItems: params => dispatch(updateFishedItems(params))
// });
export default connect(mapStateToProps, null)(withStyles(styles)(KithenOrderBoard));
