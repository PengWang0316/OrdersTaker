import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export const AlertDialog = ({
  open, onClose, title, content, onSecondButton, onFirstButton, firstButtonText, secondButtonText
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onFirstButton} color="primary">
        {firstButtonText}
      </Button>
      <Button onClick={onSecondButton} color="primary" autoFocus>
        {secondButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);
AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onFirstButton: PropTypes.func.isRequired,
  onSecondButton: PropTypes.func.isRequired,
  firstButtonText: PropTypes.string,
  secondButtonText: PropTypes.string
};
AlertDialog.defaultProps = {
  firstButtonText: 'Cancel',
  secondButtonText: 'Confirm'
};
export default AlertDialog;
