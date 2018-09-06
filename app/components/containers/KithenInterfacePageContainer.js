import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Clock from 'react-live-clock';

import { SUPER_USER_ROLE, HOME_PAGE_URL } from '../../config';
import KithenOrderBoard from '../KithenOrderBoard';
import { fetchAllMenu } from '../../actions/MenuActions';

const styles = {
  root: {
    width: '95%',
    height: '100%',
    margin: '20px auto'
  },
  titleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
  }
};

/**
 * The component shows an interface for the kithen.
 * It will allow people who work in the kithen to see and interact with the orders that customers made.
 */
export class KithenInterfacePageContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchAllMenu: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    menuItems: PropTypes.object.isRequired
  };

  /**
   * Redirecting the user to the home page if the user does not have an approperate role.
   * @param {object} props has all component's prop value.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    const { user, history } = props;
    if (!user._id || !user.role || user.role < SUPER_USER_ROLE) {
      history.push(HOME_PAGE_URL);
      return;
    }
    if (Object.keys(props.menuItems).length === 0) props.fetchAllMenu();
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Saving the timezone name
  }

  /**
   * Render method.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleDiv}>
          <Typography color="primary" variant="title">All received order</Typography>
          <Typography color="textSecondary">
            <Clock format="HH:mm:ss MMM DD YYYY" ticking timezone={this.timezone} />
          </Typography>
        </div>
        <KithenOrderBoard />
      </div>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  menuItems: state.menuItems,
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KithenInterfacePageContainer));
