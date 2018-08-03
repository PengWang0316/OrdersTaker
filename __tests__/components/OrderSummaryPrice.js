import React from 'react';
import renderer from 'react-test-renderer';

import { OrderSummaryPrice } from '../../app/components/OrderSummaryPrice';

jest.mock('@material-ui/core/Typography', () => 'Typography');

describe('OrderSummaryPrice', () => {
  const defaultProps = {
    classes: {
      flexEndDiv: 'flexEndDiv',
      fontBold: 'fontBold'
    },
    orders: {
      categories: {
        categoryA: { price: 100, tax: 10, qty: 2 }
      }
    }
  };

  test('Snapshot', () => expect(renderer.create(<OrderSummaryPrice {...defaultProps} />).toJSON()).toMatchSnapshot());
});
