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
jest.mock('@material-ui/icons/Menu', () => 'MenuIcon');
// jest.mock('@material-ui/core/styles', () => { withStyles });

describe('Navbar test', () => {
  const defaultProps = {
    classes: { flex: 'flex', appbar: 'appbar' }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<Navbar {...props} />);

  test('Initial state', () => {
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

  test('NavBar snapshot', () => expect(renderer.create(<Navbar {...defaultProps} />).toJSON()).toMatchSnapshot());
});
