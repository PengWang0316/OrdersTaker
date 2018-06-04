import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  flex: { flex: 1 },
  appbar: { maxHeight: 55 }
};

/** Navbar component */
export class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = { anchorEl: null };

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
   * The render method to render the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Name of the restaurant
          </Typography>
          <Hidden only="xs">
            <Button color="inherit">Order</Button>
            <Button color="inherit">Menu</Button>
            <Button color="inherit">Login</Button>
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
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(styles)(Navbar);
