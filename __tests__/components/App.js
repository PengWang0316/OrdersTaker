import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { App } from '../../app/components/App';
import { JWT_MESSAGE } from '../../app/config';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Route: ({ path, render }) => {
    if (render) return `<Route render=${render()} />`;
    return `<Route path=${path} />`;
  },
  Switch: ({ children }) => children
}));
jest.mock('../../app/components/Navbar', () => 'Navbar');
jest.mock('../../app/components/containers/HomePageContainer', () => 'HomePageContainer');
jest.mock('../../app/components/LoginDialog', () => 'LoginDialog');
jest.mock('../../app/components/Snackbars/LoginDialogSnackbar', () => 'LoginDialogSnackbar');
jest.mock('../../app/components/Snackbars/LogoutSnackbar', () => 'LogoutSnackbar');

window.console.log = jest.fn(); // Silencing the console log.

describe('App component test', () => {
  const defaultProps = {
    user: { _id: 'userId' },
    parserUserFromJwt: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<App {...props} />);

  test('Constructor and initial states', () => {
    const { isLoginDialogOpen, isLogoutSnackBarOpen, isLoginSnackbarOpen, snackbarMessage } = getShallowComponent().state();
    expect(isLoginDialogOpen).toBe(false);
    expect(isLogoutSnackBarOpen).toBe(false);
    expect(isLoginSnackbarOpen).toBe(false);
    expect(snackbarMessage).toBe('');
    expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(defaultProps.parserUserFromJwt).not.toHaveBeenCalled();

    getShallowComponent({ ...defaultProps, user: {} });
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenLastCalledWith(JWT_MESSAGE);
    expect(defaultProps.parserUserFromJwt).not.toHaveBeenCalled();

    localStorage.__STORE__[JWT_MESSAGE] = 'message'; // Set up a fake local storage value.
    getShallowComponent({ ...defaultProps, user: {} });
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(defaultProps.parserUserFromJwt).toHaveBeenCalledTimes(1);
    expect(defaultProps.parserUserFromJwt).toHaveBeenLastCalledWith('message');
  });

  test('handleToggleDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isLoginDialogOpen')).toBe(false);
    component.instance().handleToggleDialog();
    expect(component.state('isLoginDialogOpen')).toBe(true);
  });

  test('handleToggleSnackbar', () => {
    const component = getShallowComponent();
    expect(component.state('isLoginSnackbarOpen')).toBe(false);
    expect(component.state('snackbarMessage')).toBe('');

    component.instance().handleToggleSnackbar({});
    expect(component.state('isLoginSnackbarOpen')).toBe(true);
    expect(component.state('snackbarMessage')).toBe('');

    component.instance().handleToggleSnackbar('New message');
    expect(component.state('isLoginSnackbarOpen')).toBe(false);
    expect(component.state('snackbarMessage')).toBe('New message');
  });

  test('handleToggleLogoutSnackbar', () => {
    const component = getShallowComponent();
    expect(component.state('isLogoutSnackBarOpen')).toBe(false);
    component.instance().handleToggleLogoutSnackbar();
    expect(component.state('isLogoutSnackBarOpen')).toBe(true);
  });

  test('handleLogoutAction', () => {
    const component = getShallowComponent();
    component.instance().handleLogoutAction();
    expect(component.state('isLoginDialogOpen')).toBe(false);
    expect(component.state('isLogoutSnackBarOpen')).toBe(true);
  });

  test('App snapshot with user id', () => expect(renderer.create(<App {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('App snapshot without user id', () => expect(renderer.create(<App {...{ ...defaultProps, user: {} }} />).toJSON()).toMatchSnapshot());
});
