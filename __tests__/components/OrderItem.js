import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import { OrderItem } from '../../app/components/OrderItem';
import { ITEM_ONE_PRICE_KEY } from '../../app/config';
import context from '../../app/contexts/ShowDetailDialogContextTestHelper';

jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/AddCircle', () => 'AddCircle');
jest.mock('@material-ui/icons/RemoveCircle', () => 'RemoveCircle');
jest.mock('../../app/contexts/ShowDetailDialogContext'); // The __mocks__/ShowDetailDialogContext.js will be used automatically.

window.console.error = jest.fn(); // Silence the error information.

describe('OrderItem', () => {
  const item = { prices: { small: 2.33, big: 3.55, [ITEM_ONE_PRICE_KEY]: 1.22 }, photo: 'photo' };
  const defaultProps = {
    classes: {
      root: 'root',
      avatar: 'avatar',
      itemTitle: 'itemTitle',
      priceDiv: 'priceDiv',
      priceNumberDiv: 'priceNumberDiv',
      priceKeyWord: 'priceKeyWord',
      icon: 'icon',
      iconButton: 'iconButton'
    },
    orderItems: { itemId: { qty: {} } },
    itemId: 'itemId',
    menuItems: { itemId: item },
    addItemToCartProp: jest.fn(),
    removeItemFromCartProp: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderItem {...defaultProps} />);

  test('Snapshot without orders matching', () => expect(renderer.create(<OrderItem {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with orders matching', () =>
    expect(renderer.create(<OrderItem {...{ ...defaultProps, orderItems: { itemId: { qty: { small: 2 } } } }} />)
      .toJSON()).toMatchSnapshot());

  test('Clicking Avatar', () => {
    mount(<OrderItem {...defaultProps} />).find('Avatar').simulate('click');
    expect(context).toHaveBeenCalledTimes(1);
    expect(context).toHaveBeenLastCalledWith('itemId');
  });

  test('Clicking IconButtons', () => {
    const buttons = getShallowComponent().find('IconButton');
    buttons.at(0).simulate('click');
    expect(defaultProps.addItemToCartProp).toHaveBeenCalledTimes(1);
    expect(defaultProps.addItemToCartProp).toHaveBeenLastCalledWith({ item, priceKey: 'small' });
    buttons.at(1).simulate('click');
    expect(defaultProps.removeItemFromCartProp).toHaveBeenCalledTimes(1);
    expect(defaultProps.removeItemFromCartProp).toHaveBeenLastCalledWith({ item, priceKey: 'small' });
  });
});
