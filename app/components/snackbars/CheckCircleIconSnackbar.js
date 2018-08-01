import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
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
    backgroundColor: theme.palette.primary.dark
  }
});

export const CheckCircleIconSnackbar = ({
  open, classes, onClose, message
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={open}
    onClose={onClose}
    autoHideDuration={2000}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
  >
    <SnackbarContent
      className={classes.snackbarContent}
      message={
        <span id="message-id" className={classes.messageSpan}>
          <CheckCircle />
          <span className={classes.message}>{message}</span>
        </span>
      }
    />
  </Snackbar>
);
CheckCircleIconSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
export default withStyles(styles)(CheckCircleIconSnackbar);
