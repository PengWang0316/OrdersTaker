import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Badge } from '@material-ui/core';
import { RoomService as RoomServiceIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: { // A container is needed to push the icon to right.
    position: 'sticky',
    bottom: 20,
    width: '100%',
    float: 'right',
    clear: 'both'
  },
  floatingButton: {
    float: 'right',
    right: 20,
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

/* Showing a floating button and the total amount of order users have in their cart */
export const OrderFloatingButton = ({ orders, classes }) => {
  return !orders.qty ? null : ( // If no order in the cart, hide the floating button.
    <div className={classes.root}>
      <Button variant="fab" className={classes.floatingButton} color="primary">
        <RoomServiceIcon />
        <Badge badgeContent={Object.keys(orders).length} color="error" className={classes.badge} />
      </Button>
    </div>
  );
};
OrderFloatingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  orders: state.orders
});
export default connect(mapStateToProps, null)(withStyles(styles)(OrderFloatingButton));
