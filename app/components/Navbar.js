import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MenuItem, Menu, IconButton, Hidden, Button, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import LoginDialog from './LoginDialog/';
// import LoginDialogSnackbar from './snackbars/LoginDialogSnackbar';
// import LogoutSnackbar from './snackbars/LogoutSnackbar';
import { logout as logoutActon } from '../actions/UserActions';
import {
  LOGIN_CALLBACK_URL, HOME_PAGE_URL, ORDERS_PAGE_URL, NORMAL_USER_ROLE, KITHEN_INTERFACE_PAGE_URL
} from '../config';
import LoginDialogContext from '../contexts/LoginDialogContext';

const URL_REGEXP = /^https?:\/\/.+?(\/.*)/; // Using this to get the relative url.

/* istanbul ignore next */
const styles = theme => ({
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none'
  },
  menuLink: {
    textDecoration: 'none'
  },
  flex1: {
    flex: 1
  },
  appbar: {
    maxHeight: 55,
    position: 'sticky',
    top: 0
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 8
  }
});

/** Navbar component */
export class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  state = {
    anchorEl: null // The indecator for the menu
    // open: false, // The indecator for the loginDialog,
    // snackbarOpen: false, // For the warning snackbar.
    // snackbarMessage: '',
    // logoutSnackbarOpen: false
  };

  /**
   * Changing anchorEl state to an click target element or null.
   * @return {null} No Return.
   */
  handleMenuIconClick = ({ currentTarget }) => this.setState(({ anchorEl }) => {
    if (anchorEl) return { anchorEl: null };
    return { anchorEl: currentTarget };
  });

  /**
   * Showing the login dialog when the user did not login and logout a user if the user has already login.
   * @return {null} No return.
   */
  handleLoginButtonClick = () => {
    const { user, logout, history } = this.props;
    if (user._id) { // If logout button was clicked, clear the state open in order to prevent the LoginDialog shows up.
      // this.setState({ open: false, logoutSnackbarOpen: true });
      this.handleLogoutAction();
      logout();
      history.push(HOME_PAGE_URL);
    } else {
      this.setState({ anchorEl: null }); // Have to make sure always close the menu.
      const matchUrl = window.location.href.match(URL_REGEXP);
      /* istanbul ignore next */
      localStorage.setItem(LOGIN_CALLBACK_URL, matchUrl ? matchUrl[1] : '/'); // Save the current url to the local storage, which can be used to redirect users to the page they are useing after login.
      // this.handleToggleDialog();
      this.handleToggleLoginDialog();
    }
  };

  /**
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    return (
      <Fragment>
        <LoginDialogContext.Consumer>
          {({ handleLogoutAction, handleToggleLoginDialog }) => {
            this.handleLogoutAction = handleLogoutAction;
            this.handleToggleLoginDialog = handleToggleLoginDialog;
            return (
              <AppBar position="static" className={classes.appbar} data-testid="navbar">
                <Toolbar>
                  <Link to={HOME_PAGE_URL} className={`${classes.link} ${classes.flex1}`} data-testid="titleLink">
                    <Typography variant="title" color="inherit">Name of the restaurant</Typography>
                  </Link>
                  <Hidden only="xs">
                    <Link to={ORDERS_PAGE_URL} className={classes.link}>
                      <Button color="inherit" data-testid="orderButton">Order</Button>
                    </Link>
                    <Button color="inherit" data-testid="menuButton">Menu</Button>
                    {user.role && user.role < NORMAL_USER_ROLE && (
                      <Link to={KITHEN_INTERFACE_PAGE_URL} className={classes.link}>
                        <Button color="inherit" data-testid="kithenButton">Kithen</Button>
                      </Link>
                    )}
                    <Button color="inherit" onClick={this.handleLoginButtonClick}  data-testid="loginButton">
                      {user._id ? (
                        <Fragment>
                          {user.avatar && <Avatar alt="avatar" className={classes.avatar} src={user.avatar} />}
                          <Typography color="inherit">Logout</Typography>
                        </Fragment>) : 'Login'}
                    </Button>
                  </Hidden>
                  <Hidden only={['xl', 'lg', 'md', 'sm']}>
                    <IconButton
                      color="inherit"
                      aria-label="Menu"
                      onClick={this.handleMenuIconClick}
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      data-testid="navbarDropMenuButton"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleMenuIconClick}
                      data-testid="dropDownMenu"
                    >
                      <MenuItem>
                        <Link to={ORDERS_PAGE_URL} className={classes.menuLink} data-testid="orderLink">
                          <Typography color="textPrimary">Order</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Typography color="textPrimary">Menu</Typography>
                      </MenuItem>
                      {user.role && user.role < NORMAL_USER_ROLE && (
                        <MenuItem>
                          <Link to={KITHEN_INTERFACE_PAGE_URL} className={classes.menuLink} data-testid="kithenLink">
                            <Typography color="textPrimary">Kithen</Typography>
                          </Link>
                        </MenuItem>
                      )}
                      <MenuItem onClick={this.handleLoginButtonClick} data-testid="loginMenu">
                        {user._id ? (
                          <Fragment>
                            {user.avatar && <Avatar alt="avatar" className={classes.avatar} src={user.avatar} />}
                            <Typography color="textPrimary">Logout</Typography>
                          </Fragment>) : 'Login'}
                      </MenuItem>
                    </Menu>
                  </Hidden>
                </Toolbar>
              </AppBar>
            );
          }}
        </LoginDialogContext.Consumer>
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
  logout: () => dispatch(logoutActon())
});
// Putting the withRouter to the first position because when test code mocks Link, the withRouter also has to be mocked. But it is hard to really return a react component to satisfy the whole chain call.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(Navbar))));
