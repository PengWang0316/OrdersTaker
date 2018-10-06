import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Typography, Button, Tooltip, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { Check, Search, CheckCircle, Error } from '@material-ui/icons';

import { registerUser, checkUsernameAvailable } from '../../actions/UserActions';
import CheckingIndicator from './CheckingIndicator';

const styles = {
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerBtnDiv: {
    textAlign: 'right',
    margin: '20px 0'
  },
  checkIcon: {
    backgroundColor: green[500],
    color: 'white',
    marginRight: 20,
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  circularProgress: {
    color: green[500],
    position: 'relative',
    right: -49,
    top: 25
  },
  switchBtn: {
    textTransform: 'capitalize'
  },
  usernameDiv: {
    display: 'flex',
    alignItems: 'flex-end'
  }
  // '@media (max-width: 450px)': {
  //   textField: {
  //     width: '100%'
  //   }
  // }
};

const USERNAME_REGEXP = /[^\w\d_@]/g;
const EMAIL_REGEXP = /^[\w\d]+@.+\..+/g;
const USERNAME_TIP_MESSAGE = 'Characters, number, _ and @';
const PASSWORD_TIP_MESSAGE = 'Passwords should be same';
const EMAIL_TIP_MESSAGE = 'Wrong email address';
/**
 * Show the register panel.
 */
export class RegisterPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onTogglePanels: PropTypes.func.isRequired,
    onToggleSnackbar: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    isReady: false, // The indicator that is used to disable register button.
    isUsernameError: false,
    isPasswordError: false,
    isEmailError: false,
    isNameAvalible: false, // whether username is avalible to be used.
    isChecking: false, // whether checking the avalibility for the user name.
    isWaiting: false // When register button is hit turn this to true.
  };

  /**
   * TODO may have a better way to make it as a libaray for the future reusage.
   * Setting the state value to the text field's value when a user changed it.
   * @param {object} event is the click event.
   * @return {null} No return.
   */
  handleTextFieldChange = ({ target }) => {
    const { onToggleSnackbar } = this.props;
    this.setState({ [target.id]: target.value }, () => {
      // If all field is not empty, set the isReady to true.
      this.setState(({
        username, password, repeatPassword, email
      }) => ({ isReady: !!(username && password && repeatPassword && email) }));

      // Do the validation
      switch (target.id) {
        case 'username':
          this.setState({ isUsernameError: false, isReady: false }); // Erasing the error state and check it again. If username is changed, alway set the isReady to false and let the checking function callback to decide it state.
          if (target.value.match(USERNAME_REGEXP)) {
            onToggleSnackbar(USERNAME_TIP_MESSAGE);
            this.setState({ isUsernameError: true });
          } else {
            // Setting up a timeout function to check the avalibility for the username.
            if (this.checkUsernameTimeout) clearTimeout(this.checkUsernameTimeout); // If the check function has already been schulded, clear the old one.
            this.checkUsernameTimeout = setTimeout(() => {
              this.setState({ isChecking: true });
              checkUsernameAvailable(target.value).then(isAvalible => this.setState(({
                username, password, repeatPassword, email
              }) => ({ isReady: !!(username && password && repeatPassword && email && !!isAvalible), isChecking: false, isNameAvalible: !!isAvalible })));
            }, 1000);
          }
          break;
        case 'password':
          this.setState({ isPasswordError: false }); // Erasing the error state and check it again.
          if (target.value !== this.state.repeatPassword) {
            onToggleSnackbar(PASSWORD_TIP_MESSAGE);
            this.setState({ isPasswordError: true, isReady: false });
          }
          break;
        case 'repeatPassword':
          this.setState({ isPasswordError: false }); // Erasing the error state and check it again.
          if (target.value !== this.state.password) {
            onToggleSnackbar(PASSWORD_TIP_MESSAGE);
            this.setState({ isPasswordError: true, isReady: false });
          }
          break;
        case 'email':
          this.setState({ isEmailError: false }); // Erasing the error state and check it again.
          if (!target.value.match(EMAIL_REGEXP)) {
            onToggleSnackbar(EMAIL_TIP_MESSAGE);
            this.setState({ isEmailError: true, isReady: false });
          }
          break;
        default:
          break;
      }
    });
  };

  /**
   * Disable the register button, set isWaiting to true, and call the registerUser function in UserActions.
   * @return {null} No return.
   */
  handleRegisterBtnClick = () => {
    this.setState({
      isReady: false,
      isWaiting: true
    });
    this.props.registerUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    });
  };

  /**
   * Rendering the jsx.
   * @return {jsx} Return jsx.
   */
  render() {
    const { classes, onTogglePanels } = this.props;
    const {
      username, password, repeatPassword, email,
      isUsernameError, isPasswordError, isEmailError, isReady, isWaiting, isChecking, isNameAvalible
    } = this.state;
    return (
      <Fragment>
        <Typography className={classes.title} color="primary" data-testid="registerPanelTitle">Register a new user</Typography>
        <form noValidate autoComplete="off">
          <div className={classes.usernameDiv}>
            <Tooltip id="tooltipUsername" title={USERNAME_TIP_MESSAGE}>
              <TextField
                error={isUsernameError}
                helperText={isUsernameError ? USERNAME_TIP_MESSAGE : null}
                autoFocus
                id="username"
                label="Username"
                margin="normal"
                type="email"
                value={username}
                onChange={this.handleTextFieldChange}
                disabled={isWaiting}
                fullWidth
              />
            </Tooltip>
            {username !== '' && <CheckingIndicator isChecking={isChecking} isAvaliable={isNameAvalible} />}
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              margin="normal"
              type="password"
              value={password}
              onChange={this.handleTextFieldChange}
              disabled={isWaiting}
              fullWidth
            />
          </div>
          <Tooltip id="tooltipRpPw" title="Please type in your password again">
            <TextField
              error={isPasswordError}
              helperText={isPasswordError ? PASSWORD_TIP_MESSAGE : null}
              id="repeatPassword"
              label="Repeat Password"
              margin="normal"
              type="password"
              value={repeatPassword}
              onChange={this.handleTextFieldChange}
              disabled={isWaiting}
              fullWidth
            />
          </Tooltip>
          <div>
            <TextField
              error={isEmailError}
              helperText={isEmailError ? EMAIL_TIP_MESSAGE : null}
              id="email"
              label="Email"
              margin="normal"
              type="email"
              value={email}
              onChange={this.handleTextFieldChange}
              disabled={isWaiting}
              fullWidth
            />
          </div>
          <Tooltip placement="bottom-end" id="tooltipRegisterBtn" title={isReady ? 'Click to register' : 'Please fill out all field above'}>
            <div className={classes.registerBtnDiv}>
              {isWaiting && (
                <Fragment>
                  <CircularProgress size={58} className={classes.circularProgress} />
                  <Button size="medium" mini className={classes.checkIcon} variant="fab"><Check /></Button>
                </Fragment>
              )}
              <Button onClick={this.handleRegisterBtnClick} color="primary" aria-label="Register" size="small" disabled={!isReady} variant="contained">Register</Button>
            </div>
          </Tooltip>
          <div>
            <Button onClick={onTogglePanels} color="primary" className={classes.switchBtn} data-testid="switchLoginButton">Have an account already? Go to login</Button>
          </div>
        </form>

      </Fragment>
    );
  }
}
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user))
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(RegisterPanel));
