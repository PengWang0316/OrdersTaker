import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import LoginDialog from './LoginDialog/';
import { logout } from '../actions/UserActions';

const styles = {
  flex: { flex: 1 },
  appbar: { maxHeight: 55 }
};

/** Navbar component */
export class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = { user: null };

  state = {
    anchorEl: null, // The indecator for the menu
    open: false // The indecator for the loginDialog
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
    if (this.props.user) this.props.logout();
    else { // Have to make sure always close the menu.
      this.setState({ anchorEl: null });
      this.handleToggleDialog();
    }
  };

  /**
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, user } = this.props;
    const { anchorEl, open } = this.state;
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
              <Button color="inherit" onClick={this.handleLoginButtonClick}>{user ? 'Logout' : 'Login'}</Button>
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
                <MenuItem onClick={this.handleLoginButtonClick}>{user ? 'Logout' : 'Login'}</MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        </AppBar>
        {!user && <LoginDialog open={open} onClose={this.handleToggleDialog} />}
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
  logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
