import React from 'react';
import renderer from 'react-test-renderer';

import { OrderBrowser } from '../../../app/components/OrderBrowser/OrderBrowser';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@kevinwang0316/react-materialui-pagination', () => 'Pagination');
jest.mock('../../../app/components/OrderBrowser/OrderCard', () => 'OrderCard');

describe('OrderBrowser', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      title: 'title',
      cardDiv: 'cardDiv'
    },
    orders: [{
      _id: 'ordersId',
      items: {
        orderIdA: {},
        orderIdB: {}
      },
      userId: 'userId'
    }],
    menuItems: {
      orderIdA: { photo: 'orderA photo', name: 'orderA name' }
    },
    title: 'titel',
    offset: 0,
    totalOrder: 100,
    onPageNumberClick: jest.fn()
  };

  test('Snapshot', () => expect(renderer.create(<OrderBrowser {...defaultProps} />).toJSON()).toMatchSnapshot());
});
