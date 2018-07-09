import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderPageContainer } from '../../../app/components/containers/OrderPageContainer';

jest.mock('../../../app/components/OrderSummary', () => 'OrderSummary');
jest.mock('../../../app/components/OrderList', () => 'OrderList');
jest.mock('../../../app/components/ItemDetailDialog', () => 'ItemDetailDialog');

describe('OrderPageContainer', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      listPanel: 'listPanel',
      summaryPanel: 'summaryPanel',
      summaryContent: 'summaryContent'
    },
    menuItems: { id: 1 },
    orders: { qty: 0 },
    fetchAllMenu: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderPageContainer {...props} />);
  test('Initial state and constructor function', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    expect(component.state('currentItem')).toBeNull();
    expect(defaultProps.fetchAllMenu).not.toBeCalled();

    getShallowComponent({ ...defaultProps, menuItems: {} });
    expect(defaultProps.fetchAllMenu).toBeCalledTimes(1);
  });

  test('parseOrders', () => {
    const input = {
      qty: 6,
      '5b1c64d54345b11970bb124f': {
        _id: '5b1c64d54345b11970bb124f',
        prices: {
          _onePrice: 7.95
        },
        taxRate: 9.3,
        category: 'Appetizer',
        qty: {
          _onePrice: 2
        }
      },
      '5b1c64d54345b11970bb123d': {
        _id: '5b1c64d54345b11970bb123d',
        prices: {
          small: 4.95,
          Large: 6.95
        },
        taxRate: 9.3,
        category: 'Appetizer',
        qty: {
          small: 1,
          Large: 1
        }
      },
      '5b1c64d54345b11970bb123a': {
        _id: '5b1c64d54345b11970bb123a',
        prices: {
          small: 4.95,
          Large: 6.95
        },
        taxRate: 9.3,
        category: 'Appetizer',
        qty: {
          small: 1
        }
      },
      '5b1c6d634345b11970bb1250': {
        _id: '5b1c6d634345b11970bb1250',
        prices: {
          small: 6.25,
          middle: 8.25,
          large: 10.25
        },
        order: 0,
        taxRate: 9.3,
        category: 'Soup',
        qty: {
          middle: 1
        }
      }
    };
    const expectReturn = {
      categories: {
        Appetizer: {
          ids: new Set(['5b1c64d54345b11970bb124f', '5b1c64d54345b11970bb123d', '5b1c64d54345b11970bb123d', '5b1c64d54345b11970bb123a']),
          price: 32.75,
          qty: 5
        },
        Soup: {
          ids: new Set(['5b1c6d634345b11970bb1250']),
          price: 8.25,
          qty: 1
        }
      },
      price: 41,
      tax: '3.82',
      totalPrice: 44.82,
      totalQty: 6
    };
    expect(OrderPageContainer.parseOrders(input)).toEqual(expectReturn);
  });

  test('handleDialogToggle', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().handleDialogToggle();
    expect(component.state('isDialogOpen')).toBe(true);
  });

  test('showDetailDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().showDetailDialog('id');
    expect(component.state('isDialogOpen')).toBe(true);
    expect(component.state('currentItem')).toBe(1);
  });

  test('Snapshot with menuItems', () => expect(renderer.create(<OrderPageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with an empty menuItems', () => expect(renderer.create(<OrderPageContainer {...{ ...defaultProps, menuItems: {} }} />).toJSON()).toMatchSnapshot());
});
