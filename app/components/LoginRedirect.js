import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinearProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { parserUserFromJwt as parserUserFromJwtAction } from '../actions/UserActions';
import { LOGIN_CALLBACK_URL, JWT_MESSAGE } from '../config';

const JWT_REGEXP = /^\?.+=(.+)/;

const styles = {
  root: {
    width: '100%',
    height: window.innerHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    width: '90%'
  },
  title: {
    margin: '-40px 0 40px 0',
    fontWeight: 'bold'
  }
};

/**
 * This component will in charge of parser jwt to the Redux state and redirect users to the page they left.
 */
export class LoginRedirect extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    parserUserFromJwt: PropTypes.func.isRequired
  };

  /**
   * If the Redux has not had a user state, call the auction to parser it based on the jwt message and save jwt to the local storage.
   * @return {null} No return.
   */
  componentDidMount() {
    const {
      location, user, parserUserFromJwt, history
    } = this.props;
    const jwtMessageMatch = location.search.match(JWT_REGEXP);
    if (!user._id && jwtMessageMatch) {
      parserUserFromJwt(jwtMessageMatch[1]); // Call the action to parser the jwt to a user state.
      // localStorage.setItem(JWT_MESSAGE, jwtMessageMatch[1]); // Save jwt to the local storage.
      history.push(localStorage.getItem(LOGIN_CALLBACK_URL) || '/'); // Redirect users to where they left or to the home page.
    }
  }

  /**
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="title" color="primary" className={classes.title}>Redirecting you to where you left.</Typography>
        <LinearProgress className={classes.progress} />
      </div>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parserUserFromJwt: jwtMessage => dispatch(parserUserFromJwtAction(jwtMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginRedirect));
