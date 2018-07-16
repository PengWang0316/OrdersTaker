import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { HOME_PAGE_URL, ORDER_STATUS_PAGE_URL } from '../../app/config';
import { OrderSummary } from '../../app/components/OrderSummary';

jest.mock('@material-ui/core/Card', () => 'Card');
jest.mock('@material-ui/core/CardContent', () => 'CardContent');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/ListItemSecondaryAction', () => 'ListItemSecondaryAction');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/icons/RemoveShoppingCart', () => 'RemoveShoppingCart');
jest.mock('@material-ui/icons/Send', () => 'Send');
jest.mock('../../app/components/QRCodeScanner', () => 'QRCodeScanner');
jest.mock('../../app/components/AlertDialog', () => 'AlertDialog');

jest.mock('../../app/actions/OrdersActions', () => ({ placeOrder: jest.fn().mockReturnValue(Promise.resolve('orderId')) }));

describe('OrderSummary', () => {
  const defaultProps = {
    classes: {
      card: 'card',
      title: 'title',
      categoryTitle: 'categoryTitle',
      flexEndDiv: 'flexEndDiv',
      fontBold: 'fontBold',
      hrStyle: 'hrStyle',
      placeBtn: 'placeBtn',
      ClearBtn: 'clearBtn',
      icon: 'icon',
      buttonDiv: 'buttonDiv',
      FlexBetweenDiv: 'flexBetweenDiv'
    },
    orders: {
      categories: {
        categoryA: { price: 100, tax: 10, qty: 2 }
      }
    },
    reduxOrders: {},
    clearOrders: jest.fn(),
    history: {
      push: jest.fn()
    },
    user: { jwt: 'jwt' }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderSummary {...props} />);

  test('Initial states', () => {
    const { isBtnDisable, isAlertDialogOpen, isShowProgress } = getShallowComponent().state();
    expect(isBtnDisable).toBe(false);
    expect(isAlertDialogOpen).toBe(false);
    expect(isShowProgress).toBe(false);
  });

  test('handleToggleAlertDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isAlertDialogOpen')).toBe(false);
    component.instance().handleToggleAlertDialog();
    expect(component.state('isAlertDialogOpen')).toBe(true);
  });

  test('handleClearOrders', () => {
    getShallowComponent().instance().handleClearOrders();
    expect(defaultProps.clearOrders).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
  });

  test('handlePlaceBtnClick without error', async () => {
    window.console.error = jest.fn();
    const OrdersActions = require('../../app/actions/OrdersActions');
    const component = getShallowComponent();
    await component.instance().handlePlaceBtnClick();
    expect(component.state('isBtnDisable')).toBe(true);
    expect(component.state('isShowProgress')).toBe(true);
    expect(OrdersActions.placeOrder).toHaveBeenCalledTimes(1);
    expect(defaultProps.clearOrders).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(`${ORDER_STATUS_PAGE_URL}/orderId`);
    expect(window.console.error).not.toHaveBeenCalled();
  });

  test('handlePlaceBtnClick with error', async () => {
    window.console.error = jest.fn();
    const OrdersActions = require('../../app/actions/OrdersActions');
    OrdersActions.placeOrder.mockReturnValue(Promise.reject());
    const component = getShallowComponent();
    await component.instance().handlePlaceBtnClick();
    expect(component.state('isBtnDisable')).toBe(true);
    expect(component.state('isShowProgress')).toBe(true);
    expect(OrdersActions.placeOrder).toHaveBeenCalledTimes(2);
    expect(defaultProps.clearOrders).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(window.console.error).toHaveBeenCalledTimes(1);
  });

  test('Snapshot without table number', () => expect(renderer.create(<OrderSummary {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with table number', () => expect(renderer.create(<OrderSummary {...{ ...defaultProps, reduxOrders: { tableNumber: 1 } }} />).toJSON()).toMatchSnapshot());
});
