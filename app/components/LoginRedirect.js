import React, { Component, Fragement } from 'reace';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinearProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { parserUserFromJwt } from '../actions/UserActions';
import { LOGIN_CALLBACK_URL } from '../config';

const JWT_REGEXP = /^\?.+=(.+)/;

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    felxDirection: 'wrap',
    alignItmes: 'center',
    justifyContent: 'center'
  },
  progress: {
    width: '90%'
  }
};

/**
 * This component will in charge of parser jwt to the Redux state and redirect users to the page they left.
 */
export class LoginRedirect extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    parserUserFromJwt: PropTypes.func.isRequired
  };

  static defaultProps = { user: null };

  /**
   * If the Redux has not had a user state, all the auction to parser it based on the jwt message.
   * @param {object} props contains all props' value
   */
  constructor(props) {
    super(props);
    const jwtMessageMatch = props.localtion.search.match(JWT_REGEXP);
    if (!props.user && jwtMessageMatch) {
      props.parserUserFromJwt(jwtMessageMatch[1]);
      props.history.push(localStorage.getItem(LOGIN_CALLBACK_URL) || '/'); // Redirect users to where they left or to the home page.
    }
  }

  /**
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes } = this.props;
    return (
      <Fragement className={classes.root}>
        <Typography>Redirecting you to where you left.</Typography>
        <LinearProgress className={classes.progress} />
      </Fragement>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parserUserFromJwt: jwtMessage => dispatch(parserUserFromJwt(jwtMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginRedirect));
