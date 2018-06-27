import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons/';

import dialogStyles from '../../styles/DialogSytels';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';

/* istanbul ignore next */
const styles = theme => ({
  ...dialogStyles, // Extending some basic dialog styles from DialogSytels.
});

/**
 * Showing the login and register panels in one dialog.
 */
export class LoginDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggleSnackbar: PropTypes.func.isRequired
  };

  state = {
    isLogin: true // Control whether to show the login or register panel.
  };

  /**
   * Switch the isLogin state to an opposite value.
   * @return {null} No return.
   */
  togglePanels = () => this.setState(({ isLogin }) => ({ isLogin: !isLogin }));

  /**
   * Rendering method.
   * @return {jsx} Return jsx.
   */
  render() {
    const {
      classes, open, onClose, onToggleSnackbar
    } = this.props;
    const { isLogin } = this.state;
    return (
      <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialogPaper }}>
        <DialogContent className={classes.dialogContent}>
          <IconButton onClick={onClose} className={classes.dialogCloseButton}><Close className={classes.dialogCloseIcon} /></IconButton>
          {isLogin ? <LoginPanel onTogglePanels={this.togglePanels} onToggleSnackbar={onToggleSnackbar} /> : <RegisterPanel onTogglePanels={this.togglePanels} onToggleSnackbar={onToggleSnackbar} />}
        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(styles)(LoginDialog);
