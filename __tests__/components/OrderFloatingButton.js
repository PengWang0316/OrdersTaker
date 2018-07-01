import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderFloatingButton } from '../../app/components/OrderFloatingButton';

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
    orders: {}
  };

  test('The component without orders', () => {
    const component = shallow(<OrderFloatingButton {...defaultProps} />);
    expect(component).not.toBeUndefined();
  });
  test('Snapshot with orders', () =>
    expect(renderer.create(<OrderFloatingButton {...{ ...defaultProps, orders: { qty: 1 } }} />).toJSON()).toMatchSnapshot());
});
