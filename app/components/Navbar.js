import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MenuItem, Menu, IconButton, Hidden, Button, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import LoginDialog from './LoginDialog/';
import LoginDialogSnackbar from './snackbars/LoginDialogSnackbar';
import LogoutSnackbar from './snackbars/LogoutSnackbar';
import { logout, parserUserFromJwt } from '../actions/UserActions';
import { JWT_MESSAGE, LOGIN_CALLBACK_URL } from '../config';

const URL_REGEXP = /^https?:\/\/.+?(\/.*)/; // Using this to get the relative url.

const styles = {
  flex: { flex: 1 },
  appbar: { maxHeight: 55 },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 8
  }
};

/** Navbar component */
export class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = { user: null };

  /**
   * If Redux does not have user and local storage has jwt, use jwt to parser the user.
   * @param {object} props contains the component's prop value.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    const jwtMessage = localStorage.getItem(JWT_MESSAGE);
    if (!props.user && jwtMessage) props.parserUserFromJwt(jwtMessage);
  }

  state = {
    anchorEl: null, // The indecator for the menu
    open: false, // The indecator for the loginDialog,
    snackbarOpen: false, // For the warning snackbar.
    snackbarMessage: '',
    logoutSnackbarOpen: false
  };

  /**
   * Changing anchorEl state to an click target element or null.
   * @return {null} No Return.
   */
  handleMenuIconClick = ({ currentTarget }) =>
    this.setState(({ anchorEl }) => {
      if (anchorEl) return { anchorEl: null };
      return { anchorEl: currentTarget };
    });

  /**
   * Setting the open state to an opposite value.
   * @return {null} No return.
   */
  handleToggleDialog = () => this.setState(({ open }) => ({ open: !open }));

  /**
   * Showing the login dialog when the user did not login and logout a user if the user has already login.
   * @return {null} No return.
   */
  handleLoginButtonClick = () => {
    if (this.props.user) { // If logout button was clicked, clear the state open in order to prevent the LoginDialog shows up.
      this.setState({ open: false, logoutSnackbarOpen: true });
      this.props.logout();
    } else {
      this.setState({ anchorEl: null }); // Have to make sure always close the menu.
      const matchUrl = window.location.href.match(URL_REGEXP);
      localStorage.setItem(LOGIN_CALLBACK_URL, matchUrl ? matchUrl[1] : '/'); // Save the current url to the local storage, which can be used to redirect users to the page they are useing after login.
      this.handleToggleDialog();
    }
  };

  /**
   * Setting the snackbarOpen state to true in order to open the snackbar.
   * If message paramter is a string, set it to message state. Otherwise, set a empty message.
   * @param {string} message will be showed in the snackbar.
   * @return {null} No return.
   */
  handleToggleSnackbar = message => this.setState(({ snackbarOpen }) =>
    ({ snackbarOpen: !snackbarOpen, snackbarMessage: typeof message === 'string' ? message : '' }));

  /**
   * Set the logoutSnackbarOpen state to an opposite value.
   * @return {null} No return.
   */
  handleToggleLogoutSnackbar = () => this.setState(({ logoutSnackbarOpen }) =>
    ({ logoutSnackbarOpen: !logoutSnackbarOpen }));

  /**
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, user } = this.props;
    const {
      anchorEl, open, snackbarOpen, snackbarMessage, logoutSnackbarOpen
    } = this.state;
    return (
      <Fragment>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Name of the restaurant
            </Typography>
            <Hidden only="xs">
              <Button color="inherit">Order</Button>
              <Button color="inherit">Menu</Button>
              <Button color="inherit" onClick={this.handleLoginButtonClick}>{user ?
                (<Fragment>{user.avatar && <Avatar alt="avatar" className={classes.avatar} src={user.avatar} />}<Typography color="inherit">Logout</Typography></Fragment>) : 'Login'}</Button>
            </Hidden>
            <Hidden only={['lg', 'md', 'sm']}>
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleMenuIconClick}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuIconClick}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={this.handleLoginButtonClick}>{user ?
                  (<Fragment>{user.avatar && <Avatar alt="avatar" className={classes.avatar} src={user.avatar} />}<Typography color="inherit">Logout</Typography></Fragment>) : 'Login'}
                </MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
        {!user && ( // If a user has already login, do not need to load componnets below.
          <Fragment>
            <LoginDialog open={open} onClose={this.handleToggleDialog} onToggleSnackbar={this.handleToggleSnackbar} />
            <LoginDialogSnackbar open={snackbarOpen} onClose={this.handleToggleSnackbar} message={snackbarMessage} />
          </Fragment>
        )}
        <LogoutSnackbar open={logoutSnackbarOpen} onClose={this.handleToggleLogoutSnackbar} />
      </Fragment>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  parserUserFromJwt: jwtMessage => dispatch(parserUserFromJwt(jwtMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
