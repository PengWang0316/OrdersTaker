import React from 'react';
import renderer from 'react-test-renderer';

import { OrderList } from '../../app/components/OrderList';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../app/components/OrderItem', () => 'OrderItem');

describe('OrderList', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      boldFont: 'boldFont',
      titleDiv: 'titleDiv',
      line: 'line',
      flexDiv: 'flexDiv'
    },
    orders: {
      categories: {
        Appetizer: {
          ids: new Set(['5b1c64d54345b11970bb124f', '5b1c64d54345b11970bb126d', '5b1c64d54345b11970bb123d', '5b1c64d54345b11970bb123a']),
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
    },
    // reduxOrders: {
    //   '5b1c64d54345b11970bb124f': 1, '5b1c64d54345b11970bb126d': 2, '5b1c64d54345b11970bb123d': 3, '5b1c64d54345b11970bb123a': 4, '5b1c6d634345b11970bb1250': 5
    // }
  };
  test('Snapshot', () => expect(renderer.create(<OrderList {...defaultProps} />).toJSON()).toMatchSnapshot());
});
