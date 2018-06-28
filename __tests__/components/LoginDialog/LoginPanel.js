import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { LoginPanel } from '../../../app/components/LoginDialog/LoginPanel';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/TextField', () => 'TextField');

describe('LoginPanel', () => {
  const defaultProps = {
    classes: {
      title: 'title',
      fontWeight700: 'fontWeight700',
      loginBtn: 'loginBtn',
      divider: 'divider',
      textField: 'textField',
      loginButtonDiv: 'loginButtonDiv',
      regesterBtn: 'regesterBtn'
    },
    onTogglePanels: jest.fn(),
    onToggleSnackbar: jest.fn(),
    user: {},
    emptyUser: jest.fn(),
    loginWithPassword: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<LoginPanel {...props} />);

  test('Initial states', () => {
    const component = getShallowComponent();
    const { username, password, isReady, isSubmitted } = component.state();
    expect(username).toBe('');
    expect(password).toBe('');
    expect(isReady).toBe(false);
    expect(isSubmitted).toBe(false);
  });

  test('getDerivedStateFromProps', () => {
    const mockOnToggleSnackbar = jest.fn();
    const mockEmptyUser = jest.fn();
    const nextProps = { onToggleSnackbar: mockOnToggleSnackbar, emptyUser: mockEmptyUser, user: {} };
    const prevState = { isSubmitted: false };
    expect(LoginPanel.getDerivedStateFromProps(nextProps, prevState)).toBeNull();
    expect(mockEmptyUser).not.toHaveBeenCalled();
    expect(mockOnToggleSnackbar).not.toHaveBeenCalled();

    prevState.isSubmitted = true;
    expect(LoginPanel.getDerivedStateFromProps(nextProps, prevState)).toBeNull();
    expect(mockEmptyUser).not.toHaveBeenCalled();
    expect(mockOnToggleSnackbar).not.toHaveBeenCalled();

    nextProps.user.isFail = true;
    expect(LoginPanel.getDerivedStateFromProps(nextProps, prevState)).toEqual({ isSubmitted: false });
    expect(mockEmptyUser).toHaveBeenCalledTimes(1);
    expect(mockOnToggleSnackbar).toHaveBeenCalledTimes(1);
  });

  test('handleTextChanged', () => {
    const component = getShallowComponent();
    expect(component.state('isReady')).toBe(false);
    component.setState({ username: 'username', password: 'password' });
    component.instance().handleTextChanged({ target: { id: 'id', value: 'value' } });
    expect(component.state('id')).toBe('value');
    expect(component.state('isReady')).toBe(true);
  });

  test('handlLoginButtonClick', () => {
    const component = getShallowComponent();
    component.setState({ username: 'username', password: 'password', isReady: true, isSubmitted: false });
    component.instance().handlLoginButtonClick();
    expect(component.state('isReady')).toBe(false);
    expect(component.state('isSubmitted')).toBe(true);
    expect(defaultProps.loginWithPassword).toHaveBeenCalledTimes(1);
    expect(defaultProps.loginWithPassword).toHaveBeenLastCalledWith({ username: 'username', password: 'password' });
  });

  test('Snapshot', () => expect(renderer.create(<LoginPanel {...defaultProps} />).toJSON()).toMatchSnapshot());
});
