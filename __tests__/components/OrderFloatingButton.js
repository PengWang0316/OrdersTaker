import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderFloatingButton } from '../../app/components/OrderFloatingButton';
import { ORDER_PAGE_URL } from '../../app/config';

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
    orders: {},
    history: { push: jest.fn() }
  };

  test('handleButtonClick', () => {
    const component = shallow(<OrderFloatingButton {...{ ...defaultProps, orders: { qty: 1 } }} />);
    component.find('Button').simulate('click');
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(ORDER_PAGE_URL);
  });
  test('Snapshot without orders', () =>
    expect(renderer.create(<OrderFloatingButton {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with orders', () =>
    expect(renderer.create(<OrderFloatingButton {...{ ...defaultProps, orders: { qty: 1 } }} />).toJSON()).toMatchSnapshot());
});
