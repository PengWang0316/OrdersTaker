import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { fetchUnfinishedOrders, updateFinishedItems } from '../actions/OrdersActions';
import UnfinishedOrderRow from './UnfinishedOrder/UnfinishedOrderRow';
import UnfinishedOrderList from './UnfinishedOrder/UnfinishedOrderList';

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
   * Fetching the unfinished orders.
   * @param {object} props contains all component's prop value.
   * @return {null} No return.
   */
  componentDidMount() {
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
      orderId, itemId, isFinished: newState[orderId].finishedItems[itemId], jwt: this.props.user.jwt
    });
    return { unfinishedOrders: newState };
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
