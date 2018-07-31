import React from 'react';
import renderer from 'react-test-renderer';

import { OrderSummaryCategories } from '../../app/components/OrderSummaryCategories';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/ListItemSecondaryAction', () => 'ListItemSecondaryAction');

describe('OrderSummaryCategories', () => {
  const defaultProps = {
    classes: {
      title: 'title',
      categoryTitle: 'categoryTitle',
      hrStyle: 'hrStyle'
    },
    orders: {
      categories: {
        categoryA: { price: 100, tax: 10, qty: 2 }
      }
    }
  };
  test('Snapshot', () => expect(renderer.create(<OrderSummaryCategories {...defaultProps} />).toJSON()).toMatchSnapshot());
});
