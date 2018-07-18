import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PhotoCamera as PhotoCameraIcon } from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import QRScanerDialog from './QRScanerDialog';

const styles = {
  tableNumber: {
    fontSize: 35,
    fontWeight: '800'
  }
};

/**
 * The component that will be used to scan the QR code.
 */
export class QRCodeScanner extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    isDialogOpen: false
  };

  /**
   * Toggle the dialog open state
   * @return {null} No return
   */
  toggleDialog = () => this.setState(({ isDialogOpen }) => ({ isDialogOpen: !isDialogOpen }));

  /**
 * The render method
 * @return {jsx} Return jsx for the component.
 */
  render() {
    const { cart, classes } = this.props;
    const { isDialogOpen } = this.state;
    return (
      <div>
        {!cart.tableNumber && (
          <Fragment>
            <Button onClick={this.toggleDialog}><PhotoCameraIcon color="primary" /></Button>
            <Typography color="primary">Scan Table QR</Typography>
          </Fragment>
        )}
        {cart.tableNumber && (
          <Fragment>
            <Typography color="primary">Table number:</Typography>
            <Button color="primary" className={classes.tableNumber} onClick={this.toggleDialog}>{cart.tableNumber}</Button>
          </Fragment>
        )}
        <QRScanerDialog isOpen={isDialogOpen} onClose={this.toggleDialog} />
      </div>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps, null)(withStyles(styles)(QRCodeScanner));
