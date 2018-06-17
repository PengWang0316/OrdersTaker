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
    }
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

  test('Snapshot with one price not flexEnd', () => expect(renderer.create(<PriceItem {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with one price flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, flexEnd: true }} />).toJSON()).toMatchSnapshot());

  test('Snapshot with multiple prices not flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, item: { prices: { small: 100, middle: 200, large: 300 } } }} />).toJSON())
    .toMatchSnapshot());
  test('Snapshot with multiple prices flexEnd', () => expect(renderer.create(<PriceItem {...{ ...defaultProps, flexEnd: true, item: { prices: { small: 100, middle: 200, large: 300 } } }} />).toJSON())
    .toMatchSnapshot());
});
