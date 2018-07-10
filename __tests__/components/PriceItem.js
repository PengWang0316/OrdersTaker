import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { PriceItem } from '../../app/components/PriceItem';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');

jest.mock('@material-ui/icons/AddBox', () => 'AddBox');
jest.mock('@material-ui/icons/KeyboardArrowDown', () => 'KeyboardArrowDown');

jest.mock('../../app/utils/AnimationUtil', () => ({ animateOrderNumber: jest.fn() }));

describe('PriceItem', () => {
  const defaultProps = {
    item: { prices: { small: 100 } },
    classes: {
      addButton: 'addButton',
      icon: 'icon',
      upperCase: 'upperCase',
      priceDiv: 'priceDiv',
      multiplePriceDiv: 'multiplePriceDiv',
      flexEnd: 'flex-end'
    },
    addItemToCart: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<PriceItem {...props} />);

  test('Initial the component', () => {
    const component = getShallowComponent();
    expect(component.state('anchorEl')).toBeNull();
  });

  test('handleMenuIconClick', () => {
    const component = getShallowComponent();
    expect(component.state('anchorEl')).toBeNull();
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toEqual('currentTarget');
    component.instance().handleMenuIconClick({ currentTarget: 'currentTarget' });
    expect(component.state('anchorEl')).toBeNull();
  });

  test('handleAddToCartClick', () => {
    const component = getShallowComponent();
    const AnimationUtil = require('../../app/utils/AnimationUtil');
    component.instance().handleAddToCartClick('priceKey');
    expect(defaultProps.addItemToCart).toHaveBeenCalledTimes(1);
    expect(defaultProps.addItemToCart).toHaveBeenLastCalledWith({ priceKey: 'priceKey', item: defaultProps.item });
    expect(AnimationUtil.animateOrderNumber).toHaveBeenCalledTimes(1);
  });

  test('IconButtons are clicked', () => {
    let component = getShallowComponent();
    const mockClickFn = jest.fn();
    component.instance().handleAddToCartClick = mockClickFn;
    component.find('IconButton').simulate('click');
    expect(mockClickFn).toHaveBeenCalledTimes(1);
    expect(mockClickFn).toHaveBeenLastCalledWith('small');

    component = getShallowComponent({ ...defaultProps, item: { prices: { middle: 100, large: 200 } } });
    component.instance().handleAddToCartClick = mockClickFn;
    component.find('IconButton').at(0).simulate('click');
    expect(mockClickFn).toHaveBeenCalledTimes(2);
    expect(mockClickFn).toHaveBeenLastCalledWith('middle');
    component.find('IconButton').at(1).simulate('click');
    expect(mockClickFn).toHaveBeenCalledTimes(3);
    expect(mockClickFn).toHaveBeenLastCalledWith('large');
  });

  test('Snapshot with one price not flexEnd', () => expect(renderer.create(<PriceItem {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with one price flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, flexEnd: true }} />).toJSON()).toMatchSnapshot());

  test('Snapshot with multiple prices not flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, item: { prices: { small: 100, middle: 200, large: 300 } } }} />).toJSON())
    .toMatchSnapshot());
  test('Snapshot with multiple prices flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, flexEnd: true, item: { prices: { small: 100, middle: 200, large: 300 } } }} />).toJSON())
    .toMatchSnapshot());
});
