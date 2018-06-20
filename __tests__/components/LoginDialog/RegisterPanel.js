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

describe('RegisterPanel', () => {
  const defaultProps = {
    classes: {
      title: 'title',
      registerBtnDiv: 'registerBtnDiv',
      checkIcon: 'checkIcon',
      circularProgress: 'circularProgress'
    },
    onTogglePanels: jest.fn(),
    onToggleSnackbar: jest.fn(),
    registerUser: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<RegisterPanel {...props} />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const {
      username, password, repeatPassword, email, isReady, isUsernameError, isPasswordError, isEmailError, isWaiting
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
  });

  test('handleTextFieldChange', () => {
    const component = getShallowComponent();

    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'V8al_u@e' } });
    expect(component.state('username')).toBe('V8al_u@e');
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isUsernameError')).toBe(false);
    expect(defaultProps.onToggleSnackbar).not.toHaveBeenCalled();
    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'va!lue' } });
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isUsernameError')).toBe(true);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Just characters, number, _ and @ are allowed');
    component.instance().handleTextFieldChange({ target: { id: 'username', value: 'V8al_u@e' } });

    component.instance().handleTextFieldChange({ target: { id: 'password', value: 'password' } });
    expect(component.state('password')).toBe('password');
    expect(component.state('isPasswordError')).toBe(true);
    expect(component.state('isReady')).toBe(false);
    expect(defaultProps.onToggleSnackbar).toHaveBeenCalledTimes(2);
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Password and repeat password should be same');
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
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Password and repeat password should be same');
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
    expect(defaultProps.onToggleSnackbar).toHaveBeenLastCalledWith('Please offer a correct email address');

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

  test('Snapshot', () => expect(renderer.create(<RegisterPanel {...defaultProps} />).toJSON()).toMatchSnapshot());
});
