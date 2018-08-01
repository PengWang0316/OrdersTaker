import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderDetailDialog } from '../../../app/components/OrderDetailDialog/OrderDetailDialog';

jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'Close');
jest.mock('../../../app/components/OrderBrowser/OrderBrowserCardHeader', () => 'OrderBrowserCardHeader');
jest.mock('../../../app/components/containers/CartPageContainer', () => ({ parseOrders: jest.fn().mockReturnValue('returnOrders') }));
jest.mock('../../../app/components/OrderList', () => 'OrderList');
jest.mock('../../../app/components/OrderSummaryCategories', () => 'OrderSummaryCategories');
jest.mock('../../../app/components/OrderSummaryPrice', () => 'OrderSummaryPrice');
jest.mock('../../../app/components/ItemDetailDialog', () => 'ItemDetailDialog');

describe('OrderDetailDialog', () => {
  const defaultProps = {
    classes: {
      headerDiv: 'hearderDiv',
      contentDiv: 'contentDiv',
      contentPanel: 'contentPanel',
      summaryPanel: 'summayPanel',
      summayContent: 'summayContent',
      priceDiv: 'priceDiv'
    },
    onClose: jest.fn(),
    open: true
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderDetailDialog {...props} />);

  test('Initial states and part of cache functionality', () => {
    const CartPageContainer = require('../../../app/components/containers/CartPageContainer');
    const component = getShallowComponent();
    const { isItemDetailDialogOpen, currentOrder } = component.state();
    expect(isItemDetailDialogOpen).toBe(false);
    expect(currentOrder).toBeNull();
    expect(component.instance().lastNewOrder).toBeUndefined();
    expect(CartPageContainer.parseOrders).not.toHaveBeenCalled();
  });

  test('The cache functionality', () => {
    const CartPageContainer = require('../../../app/components/containers/CartPageContainer');
    const component = getShallowComponent({ ...defaultProps, order: { items: 'orderItems' }, menuItems: { id: 'menuItems' } });
    expect(CartPageContainer.parseOrders).toHaveBeenCalledTimes(1);
    expect(CartPageContainer.parseOrders).toHaveBeenLastCalledWith('orderItems', { id: 'menuItems' });
    expect(component.instance().lastNewOrder).toBe('returnOrders');
    expect(component.instance().lastOrder).toEqual({ items: 'orderItems' });

    // Calling the render method again to test the cache functionality.
    component.instance().render();
    expect(CartPageContainer.parseOrders).toHaveBeenCalledTimes(1);
  });

  test('handleDialogToggle', () => {
    const component = getShallowComponent();
    expect(component.state('isItemDetailDialogOpen')).toBe(false);
    component.instance().handleDialogToggle();
    expect(component.state('isItemDetailDialogOpen')).toBe(true);
  });

  test('showDetailDialog', () => {
    const mockHandleDialogToggleFn = jest.fn();
    const component = getShallowComponent({ ...defaultProps, menuItems: { id: 'menuItems' } });
    component.instance().handleDialogToggle = mockHandleDialogToggleFn;
    expect(component.state('currentOrder')).toBeNull();
    component.instance().showDetailDialog('id');
    expect(component.state('currentOrder')).toBe('menuItems');
    expect(mockHandleDialogToggleFn).toHaveBeenCalledTimes(1);
  });

  test('Snapshot without newOrder', () => expect(renderer.create(<OrderDetailDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with newOrder', () => expect(renderer.create(<OrderDetailDialog {...{ ...defaultProps, order: { items: 'orderItems' }, menuItems: { id: 'menuItems' } }} />).toJSON()).toMatchSnapshot());
});
