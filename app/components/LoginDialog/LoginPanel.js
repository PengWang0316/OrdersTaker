import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField } from '@material-ui/core';

import facebookLoginButton from '../../images/FacebookLogin.png';
import googleLoginButton from '../../images/GoogleLogin.png';
import { API_FACEBOOK_LOGIN, API_GOOGLE_LOGIN } from '../../actions/ApiUrls';
import { loginWithPassword, emptyUser } from '../../actions/UserActions';

const LOGIN_FAIL_MESSAGE = 'Wrong username or password';

/* istanbul ignore next */
const getDividerBeforAfter = color => ({ // Generating a basic styling object for divider's before and after.
  borderTop: '1px solid',
  borderTopColor: color,
  content: '""',
  height: 1,
  top: '50%',
  width: '45%',
  position: 'absolute'
});
/* istanbul ignore next */
const styles = theme => ({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15
  },
  fontWeight700: {
    fontWeight: 700
  },
  loginBtn: {
    width: '100%',
    maxWidth: 220,
    marginBottom: 15,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  divider: {
    margin: '20px 0',
    position: 'relative',
    textAlign: 'center',
    '&:before': {
      ...getDividerBeforAfter(theme.palette.primary.light),
      left: -6
    },
    '&:after': {
      ...getDividerBeforAfter(theme.palette.primary.light),
      right: -6
    }
  },
  textField: {
    width: '100%'
  },
  loginButtonDiv: {
    textAlign: 'right'
  },
  regesterBtn: {
    fontSize: 12,
    textTransform: 'capitalize'
  }
});

/**
 * The componnet that shows users login options.
 */
export class LoginPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onTogglePanels: PropTypes.func.isRequired,
    onToggleSnackbar: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loginWithPassword: PropTypes.func.isRequired,
    emptyUser: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: '',
    isReady: false, // The indicator of login button.
    isSubmitted: false // After a user submitted a login form, change it to true in order to show the error snackbar. It can prevent the snackbar shows in the first time a user open the dialog.
  };

  /**
   * Call the onToggleSnackbar when isSubmitted state is true and props received a null for user.
   * @param {object} nextProps contains the new props value.
   * @param {*} prevState contains the previous state's value.
   * @return {Object} Return an object to change the state.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isSubmitted && nextProps.user.isFail) {
      nextProps.onToggleSnackbar(LOGIN_FAIL_MESSAGE);
      nextProps.emptyUser(); // Reset user state to an empty object. So, next time the back-end code still can send a isFail mark when the authentication fails.
      return { isSubmitted: false };
    }
    return null;
  }

  /**
   * Set state when a user type in the text fields.
   * @param {object} event is the html element the user is interacting with.
   * @return {null} No return.
   */
  handleTextChanged = ({ target }) => this.setState({
    [target.id]: target.value
  }, () => this.setState({
    isReady: !!(this.state.username && this.state.password)
  }));

  /**
   * Call the login action when a user clicks the login button.
   * @return {null} No return.
   */
  handlLoginButtonClick = () => this.setState(
    { isReady: false, isSubmitted: true },
    () => this.props.loginWithPassword({
      username: this.state.username, password: this.state.password
    })
  );

  /**
   * The render method.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, onTogglePanels } = this.props;
    const { isReady, username, password } = this.state;
    return (
      <Fragment>
        <Typography color="primary" className={classes.title} data-testid="loginPanelTitle">Social Login</Typography>
        <div>
          <a href={API_FACEBOOK_LOGIN}>
            <img className={classes.loginBtn} src={facebookLoginButton} alt="Use Facebook account login" />
          </a>
        </div>
        <div>
          <a href={API_GOOGLE_LOGIN}>
            <img className={classes.loginBtn} src={googleLoginButton} alt="Use Google account login" />
          </a>
        </div>

        <div className={classes.divider}>
          <Typography color="primary" className={classes.fontWeight700}>or</Typography>
        </div>

        <Typography color="primary" className={classes.title}>UserName Login</Typography>

        <form noValidate autoComplete="off">
          <div>
            <TextField
              autoFocus
              id="username"
              label="Username"
              className={classes.textField}
              margin="normal"
              value={username}
              onChange={this.handleTextChanged}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={password}
              onChange={this.handleTextChanged}
            />
          </div>
          <div className={classes.loginButtonDiv}>
            <Button size="small" aria-label="Login" color="primary" disabled={!isReady} onClick={this.handlLoginButtonClick}>Login</Button>
          </div>
        </form>
        <div className={classes.loginButtonDiv}>
          <Button onClick={onTogglePanels} className={classes.regesterBtn} size="small" aria-label="Login" color="primary" data-testid="switchRegisterButton">Do not have an account? Register one</Button>
        </div>
      </Fragment>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  loginWithPassword: user => dispatch(loginWithPassword(user)),
  emptyUser: () => dispatch(emptyUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPanel));
