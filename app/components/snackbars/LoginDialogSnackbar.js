import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { Close, Error } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

/* istanbul ignore next */
const styles = theme => ({
  messageSpan: {
    display: 'flex',
    alignItems: 'center'
  },
  message: {
    marginLeft: 15
  },
  snackbarContent: {
    backgroundColor: theme.palette.error.dark
  }
});

export const LoginDialogSnackbar = ({
  message, onClose, open, classes
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
  >
    <SnackbarContent
      className={classes.snackbarContent}
      message={
        <span id="message-id" className={classes.messageSpan}>
          <Error />
          <span className={classes.message}>{message}</span>
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <Close />
        </IconButton>,
      ]}
    />
  </Snackbar>
);
LoginDialogSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
export default withStyles(styles)(LoginDialogSnackbar);
