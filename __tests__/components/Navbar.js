import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import { Navbar } from '../../app/components/Navbar';
import { LOGIN_CALLBACK_URL, HOME_PAGE_URL } from '../../app/config';
import context from '../../app/contexts/LoginDialogContextTestHelper';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Hidden', () => 'Hidden');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/icons/Menu', () => 'MenuIcon');
// jest.mock('react-router-dom/Link', () => 'Link');
jest.mock('react-router-dom', () => ({ Link: 'Link', withRouter: jest.fn() }));
// jest.mock('react-redux', () => ({ connect: jest.fn() }));
// jest.mock('@material-ui/core/styles', () => ({ withStyles: jest.fn() }));
jest.mock('../../app/contexts/LoginDialogContext'); // The __mocks__/LoginDialogContext.js will be used automatically.

// jest.mock('../../app/components/LoginDialog/LoginDialog', () => 'LoginDialog');
// jest.mock('../../app/components/snackbars/LoginDialogSnackbar', () => 'LoginDialogSnackbar');
// jest.mock('../../app/components/snackbars/LogoutSnackbar', () => 'LogoutSnackbar');
// jest.mock('@material-ui/core/styles', () => { withStyles });

describe('Navbar test', () => {
  const defaultProps = {
    classes: {
      link: 'link', appbar: 'appbar', menuLink: 'menuLink', flex1: 'flex1', avatar: 'avatar'
    },
    logout: jest.fn(),
    user: {},
    history: { push: jest.fn() }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<Navbar {...props} />);

  test('Initial state and parserUserFromJwt', () => {
    const component = getShallowComponent();
    expect(component.state('anchorEl')).toBe(null);
  });

  test('handleMenuIconClick', () => {
    const component = getShallowComponent();
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toEqual('currentTarget');
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toBe(null);
  });

  test('handleLoginButtonClick', () => {
    window.console = { // Silence the error and warning that come from enzyme mount.
      error: jest.fn(),
      warning: jest.fn()
    };
    const component = mount(<Navbar {...defaultProps} />);
    component.setState({ anchorEl: true });
    component.instance().handleLoginButtonClick();
    expect(defaultProps.logout).not.toHaveBeenCalled();
    expect(component.state('anchorEl')).toBeNull();
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.setItem).toHaveBeenLastCalledWith(LOGIN_CALLBACK_URL, '/');
    expect(localStorage.getItem(LOGIN_CALLBACK_URL)).toEqual('/');
    expect(context.handleLogoutAction).not.toHaveBeenCalled();
    expect(context.handleToggleLoginDialog).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).not.toHaveBeenCalled();

    // global.window = { location: { href: { value: 'http://df:39/dd' } } };
    // Object.defineProperty(window.location, 'href', {
    //   writable: true,
    //   value: 'http://df:39/dd'
    // });
    jsdom.reconfigure({ // changing the window.location.href
      url: 'http://df:39/dd'
    });
    component.instance().handleLoginButtonClick();
    // expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    // expect(localStorage.setItem).toHaveBeenLastCalledWith(LOGIN_CALLBACK_URL, '/dd');
    expect(localStorage.getItem(LOGIN_CALLBACK_URL)).toEqual('/dd');
    component.setProps({ user: { _id: 'id' } }); // Setting a user object to props in order to test handleLoginButtonClick function.
    component.instance().handleLoginButtonClick();
    expect(defaultProps.logout).toHaveBeenCalledTimes(1);
    expect(context.handleLogoutAction).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
    // expect(component.state('open')).toBe(false);
  });

  test('NavBar snapshot without user', () => expect(renderer.create(<Navbar {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user without avatar', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { _id: 'id' } }} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user with avatar', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { _id: 'id', avatar: 'avatar' } }} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user with avatar with role 2', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { _id: 'id', avatar: 'avatar', role: 2 } }} />).toJSON()).toMatchSnapshot());
});
