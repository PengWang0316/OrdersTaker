import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Badge } from '@material-ui/core';
import { RoomService as RoomServiceIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { CART_PAGE_URL } from '../config';

const styles = {
  root: { // A container is needed to push the icon to right.
    position: 'sticky',
    bottom: 20,
    float: 'right',
    clear: 'both'
  },
  floatingButton: {
    float: 'right',
    right: 25,
    opacity: 0.7,
    transition: 'opacity .4s',
    '&:hover': {
      opacity: 1
    }
  },
  badge: {
    position: 'relative',
    left: 10,
    bottom: 15
  }
};

let savedHistory; // Saving the history from props and use it to push the page.
const handleButtonClick = () => savedHistory.push(CART_PAGE_URL);

/* Showing a floating button and the total amount of order users have in their cart */
export const OrderFloatingButton = ({ cart, classes, history }) => {
  savedHistory = history;
  return !cart.qty ? null : ( // If no order in the cart, hide the floating button.
    <div className={classes.root}>
      <Button onClick={handleButtonClick} id="orderFloatingButton" variant="fab" className={classes.floatingButton} color="primary">
        <RoomServiceIcon />
        <Badge id="orderNumberBadge" badgeContent={cart.qty} color="error" className={classes.badge}><span /></Badge>
      </Button>
    </div>
  );
};
OrderFloatingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps, null)(withRouter((withStyles(styles)(OrderFloatingButton))));
