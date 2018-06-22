import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Navbar } from '../../app/components/Navbar';

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
jest.mock('../../app/components/LoginDialog/LoginDialog', () => 'LoginDialog');
jest.mock('../../app/components/snackbars/LoginDialogSnackbar', () => 'LoginDialogSnackbar');
// jest.mock('@material-ui/core/styles', () => { withStyles });

describe('Navbar test', () => {
  const defaultProps = {
    classes: { flex: 'flex', appbar: 'appbar' },
    logout: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<Navbar {...props} />);

  test('Initial state', () => {
    const component = getShallowComponent();
    const {
      anchorEl, open, snackbarOpen, snackbarMessage
    } = component.state();
    expect(anchorEl).toBe(null);
    expect(open).toBe(false);
    expect(snackbarOpen).toBe(false);
    expect(snackbarMessage).toBe('');
  });

  test('handleMenuIconClick', () => {
    const component = getShallowComponent();
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toEqual('currentTarget');
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toBe(null);
  });

  test('handleToggleDialog', () => {
    const component = getShallowComponent();
    expect(component.state('open')).toBe(false);
    component.instance().handleToggleDialog();
    expect(component.state('open')).toBe(true);
  });

  test('handleLoginButtonClick', () => {
    const component = getShallowComponent({ ...defaultProps });
    component.setState({ anchorEl: true });
    expect(component.state('open')).toBe(false);
    component.instance().handleLoginButtonClick();
    expect(defaultProps.logout).not.toHaveBeenCalled();
    expect(component.state('anchorEl')).toBeNull();
    expect(component.state('open')).toBe(true);

    component.setProps({ user: {} }); // Setting a user object to props in order to test handleLoginButtonClick function.
    component.instance().handleLoginButtonClick();
    expect(defaultProps.logout).toHaveBeenCalledTimes(1);
    expect(component.state('open')).toBe(false);
    // expect(component.state('open')).toBe(false);
  });

  test('handleToggleSnackbar', () => {
    const component = getShallowComponent();
    expect(component.state('snackbarOpen')).toBe(false);
    expect(component.state('snackbarMessage')).toBe('');
    component.instance().handleToggleSnackbar('message');
    expect(component.state('snackbarOpen')).toBe(true);
    expect(component.state('snackbarMessage')).toBe('message');
    component.instance().handleToggleSnackbar({});
    expect(component.state('snackbarOpen')).toBe(false);
    expect(component.state('snackbarMessage')).toBe('');
  });

  test('NavBar snapshot without user', () => expect(renderer.create(<Navbar {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user without avatar', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { _id: 'id' } }} />).toJSON()).toMatchSnapshot());

  test('NavBar snapshot with user with avatar', () => expect(renderer.create(<Navbar {...{ ...defaultProps, user: { _id: 'id', avatar: 'avatar' } }} />).toJSON()).toMatchSnapshot());
});
