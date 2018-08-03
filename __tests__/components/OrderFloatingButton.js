import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderFloatingButton } from '../../app/components/OrderFloatingButton';
import { CART_PAGE_URL } from '../../app/config';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Badge', () => 'Badge');
jest.mock('@material-ui/icons/RoomService', () => 'RoomService');

describe('OrderFloatingButton', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      floatingButton: 'floatingButton',
      badge: 'badge'
    },
    cart: {},
    history: { push: jest.fn() }
  };

  test('handleButtonClick', () => {
    const component = shallow(<OrderFloatingButton {...{ ...defaultProps, cart: { qty: 1 } }} />);
    component.find('Button').simulate('click');
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(CART_PAGE_URL);
  });
  test('Snapshot without cart', () =>
    expect(renderer.create(<OrderFloatingButton {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with cart', () =>
    expect(renderer.create(<OrderFloatingButton {...{ ...defaultProps, cart: { qty: 1 } }} />).toJSON()).toMatchSnapshot());
});
