import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader';

import { setTableNumber as setTableNumberAction } from '../../actions/CartActions';

let handleClose;
let handleSetTableNumber;

const styles = {
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

/**
 * Calling the redux action and close the dialog.
 * @param {object} data contains value that reads from QR code
 * @return {null} No return.
 */
const handleScan = data => {
  if (data && (/^\d+$/.test(data) || typeof data === 'number')) {
    handleSetTableNumber(data);
    handleClose();
  }
};

const handleError = err => console.error(err);

export const QRScanerDialog = ({
  onClose, isOpen, classes, setTableNumber
}) => {
  handleClose = onClose;
  handleSetTableNumber = setTableNumber;
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle><Typography color="primary">Please scan the QR code on the table</Typography></DialogTitle>
      <QrReader onScan={handleScan} onError={handleError} />
      <div className={classes.buttonDiv}>
        <Button size="small" onClick={onClose}>Cancel</Button>
      </div>
    </Dialog>
  );
};
QRScanerDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setTableNumber: PropTypes.func.isRequired
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  setTableNumber: number => dispatch(setTableNumberAction(number))
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(QRScanerDialog));
