import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField, Typography, Button, Tooltip, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { Check } from '@material-ui/icons';

import { registerUser } from '../../actions/UserActions';

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
  }
  // '@media (max-width: 450px)': {
  //   textField: {
  //     width: '100%'
  //   }
  // }
};

const USERNAME_REGEXP = /[^\w\d_@]/g;
const EMAIL_REGEXP = /^[\w\d]+@.+\..+/g;
const USERNAME_TIP_MESSAGE = 'Just characters, number, _ and @ are allowed';
const PASSWORD_TIP_MESSAGE = 'Password and repeat password should be same';
const EMAIL_TIP_MESSAGE = 'Please offer a correct email address';
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
    isWaiting: false // When register button is hit turn this to true.
  };

  /**
   * TODO may have a better way to make it as a libaray for the future reusage.
   * Setting the state value to the text field's value when a user changed it.
   * @param {object} event is the click event.
   * @return {null} No return.
   */
  handleTextFieldChange = ({ target }) => {
    // If all field is not empty, set the isReady to true.
    this.setState({ [target.id]: target.value }, () => this.setState(({
      username, password, repeatPassword, email
    }) => ({ isReady: !!(username && password && repeatPassword && email) })));
    // Do the validation
    switch (target.id) {
      case 'username':
        this.setState({ isUsernameError: false }); // Erasing the error state and check it again.
        if (target.value.match(USERNAME_REGEXP)) {
          this.props.onToggleSnackbar(USERNAME_TIP_MESSAGE);
          this.setState({ isUsernameError: true, isReady: false });
        }
        break;
      case 'password':
        this.setState({ isPasswordError: false }); // Erasing the error state and check it again.
        if (target.value !== this.state.repeatPassword) {
          this.props.onToggleSnackbar(PASSWORD_TIP_MESSAGE);
          this.setState({ isPasswordError: true, isReady: false });
        }
        break;
      case 'repeatPassword':
        this.setState({ isPasswordError: false }); // Erasing the error state and check it again.
        if (target.value !== this.state.password) {
          this.props.onToggleSnackbar(PASSWORD_TIP_MESSAGE);
          this.setState({ isPasswordError: true, isReady: false });
        }
        break;
      case 'email':
        this.setState({ isEmailError: false }); // Erasing the error state and check it again.
        if (!target.value.match(EMAIL_REGEXP)) {
          this.props.onToggleSnackbar(EMAIL_TIP_MESSAGE);
          this.setState({ isEmailError: true, isReady: false });
        }
        break;
      default:
        break;
    }
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
      username, password, repeatPassword, email, isUsernameError, isPasswordError, isEmailError, isReady, isWaiting
    } = this.state;
    return (
      <Fragment>
        <Typography className={classes.title} color="primary">Register a new user</Typography>
        <form noValidate autoComplete="off">
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
            <Button onClick={onTogglePanels} color="primary" className={classes.switchBtn}>Have an account already? Go to login</Button>
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
