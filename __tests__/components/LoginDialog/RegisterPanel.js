import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { RegisterPanel } from '../../../app/components/LoginDialog/RegisterPanel';

jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/icons/Check', () => 'Check');
jest.mock('../../../app/components/LoginDialog/CheckingIndicator', () => 'CheckingIndicator');
jest.mock('../../../app/actions/UserActions', () => ({ checkUsernameAvailable: jest.fn().mockReturnValue(Promise.resolve('true')) }));

console.error = jest.fn();

describe('RegisterPanel', () => {
  const defaultProps = {
    classes: {
      title: 'title',
      registerBtnDiv: 'registerBtnDiv',
      checkIcon: 'checkIcon',
      circularProgress: 'circularProgress',
      switchBtn: 'switchBtn'
    },
    onTogglePanels: jest.fn(),
    onToggleSnackbar: jest.fn(),
    registerUser: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<RegisterPanel {...props} />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const {
      username, password, repeatPassword, email, isReady, isUsernameError, isPasswordError, isEmailError, isWaiting, isNameAvalible, isChecking
    } = component.state();
    expect(username).toBe('');
    expect(password).toBe('');
    expect(repeatPassword).toBe('');
    expect(email).toBe('');
    expect(isReady).toBe(false);
    expect(isUsernameError).toBe(false);
    expect(isPasswordError).toBe(false);
    expect(isEmailError).toBe(false);
    expect(isWaiting).toBe(false);
    expect(isNameAvalible).toBe(false);
    expect(isChecking).toBe(false);
  });

  test('handleTextFieldChange', () => {
    const UserActions = require('../../../app/actions/UserActions');
    const component = getShallowComponent();

    jest.useFakeTimers();
    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'V8al_u@e' } });
    expect(component.state('username')).toBe('V8al_u@e');
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isUsernameError')).toBe(false);
    expect(defaultProps.onToggleSnackbar).not.toHaveBeenCalled();
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // component.setState({ isReady: true }); // Manually set the isReady to true in order to test it later.
    jest.runAllTimers();
    expect(component.state('isChecking')).toBe(true);
    expect(UserActions.checkUsernameAvailable).toHaveBeenCalledTimes(1);
    expect(UserActions.checkUsernameAvailable).toHaveBeenLastCalledWith('V8al_u@e');
    // expect(component.state('isReady')).toBe(false);
    jest.useFakeTimers();
    component.instance().checkUsernameTimeout = {};
    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'V8al_u@e' } });
    expect(clearTimeout).toHaveBeenCalledTimes(1);

    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'va!lue' } });
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isUsernameError')).toBe(true);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Characters, number, _ and @');
    // component.instance().handleTextFieldChange({ target: { id: 'username', value: 'V8al_u@e' } });
    component.setState({ username: 'V8al_u@e' });

    component.instance().handleTextFieldChange({ target: { id: 'password', value: 'password' } });
    expect(component.state('password')).toBe('password');
    expect(component.state('isPasswordError')).toBe(true);
    expect(component.state('isReady')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(2);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Passwords should be same');
    component.setState({ repeatPassword: 'password' });
    component.instance().handleTextFieldChange({ target: { id: 'password', value: 'password' } });
    expect(component.state('isPasswordError')).toBe(false);
    expect(component.state('isReady')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(2);

    component.instance().handleTextFieldChange({ target: { id: 'repeatPassword', value: 'password' } });
    expect(component.state('repeatPassword')).toBe('password');
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isPasswordError')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(2);
    component.instance().handleTextFieldChange({ target: { id: 'repeatPassword', value: 'password1' } });
    expect(component.state('repeatPassword')).toBe('password1');
    expect(component.state('isPasswordError')).toBe(true);
    expect(component.state('isReady')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(3);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Passwords should be same');
    component.instance().handleTextFieldChange({ target: { id: 'repeatPassword', value: 'password' } });

    component.instance().handleTextFieldChange({ target: { id: 'email', value: 'd@d.c' } });
    expect(component.state('email')).toBe('d@d.c');
    expect(component.state('isReady')).toBe(true);
    expect(component.state('isEmailError')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(3);
    component.instance().handleTextFieldChange({ target: { id: 'email', value: 'dd.c' } });
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isEmailError')).toBe(true);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(4);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Wrong email address');

    component.instance().handleTextFieldChange({ target: { id: '', value: 'd@d.c' } }); // For switch default
  });

  test('handleRegisterBtnClick', () => {
    const state = { username: 'username', password: 'password', email: 'email' };
    const component = getShallowComponent();
    component.instance().handleRegisterBtnClick();
    component.setState(state);
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isWaiting')).toBe(true);
    expect(defaultProps.registerUser).toHaveBeenCalledTimes(1);
  });

  test('onTogglePanels', () => {
    const component = getShallowComponent();
    component.find('Button').at(1).simulate('click');
    expect(defaultProps.onTogglePanels).toHaveBeenCalledTimes(1);
  });

  test('Snapshot username state equal empty', () => expect(renderer.create(<RegisterPanel {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot username state not equal empty', () => {
    const component = getShallowComponent();
    component.setState({ username: 'username' });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
