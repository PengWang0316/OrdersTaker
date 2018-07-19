import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import { HOME_PAGE_URL, ORDER_STATUS_PAGE_URL } from '../../app/config';
import { OrderSummary } from '../../app/components/OrderSummary';
import context from '../../app/contexts/LoginDialogContextTestHelper';

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
jest.mock('../../app/contexts/LoginDialogContext'); // The __mocks__/LoginDialogContext.js will be used automatically.

jest.mock('../../app/actions/CartActions', () => ({ placeOrder: jest.fn().mockReturnValue(Promise.resolve('orderId')) }));

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
    cart: {},
    clearCart: jest.fn(),
    history: {
      push: jest.fn()
    },
    user: { jwt: 'jwt' },
    addTempOrderId: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderSummary {...props} />);

  test('Initial states', () => {
    const { isBtnDisable, isAlertDialogOpen, isShowProgress, isLoginSuggestionDialogOpen } = getShallowComponent().state();
    expect(isBtnDisable).toBe(false);
    expect(isAlertDialogOpen).toBe(false);
    expect(isShowProgress).toBe(false);
    expect(isLoginSuggestionDialogOpen).toBe(false);
  });

  test('handleToggleAlertDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isAlertDialogOpen')).toBe(false);
    component.instance().handleToggleAlertDialog();
    expect(component.state('isAlertDialogOpen')).toBe(true);
  });

  test('handleClearCart', () => {
    getShallowComponent().instance().handleClearCart();
    expect(defaultProps.clearCart).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
  });

  test('handleToggleLoginSuggestionDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isLoginSuggestionDialogOpen')).toBe(false);
    component.instance().handleToggleLoginSuggestionDialog();
    expect(component.state('isLoginSuggestionDialogOpen')).toBe(true);
  });

  test('placeOrder without error and user id', async () => {
    window.console.error = jest.fn();
    const CartActions = require('../../app/actions/CartActions');
    const component = getShallowComponent({ ...defaultProps, user: { _id: 'id' } });
    await component.instance().placeOrder();
    expect(component.state('isBtnDisable')).toBe(true);
    expect(component.state('isShowProgress')).toBe(true);
    expect(CartActions.placeOrder).toHaveBeenCalledTimes(1);
    expect(defaultProps.clearCart).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(`${ORDER_STATUS_PAGE_URL}/orderId`);
    expect(window.console.error).not.toHaveBeenCalled();
    expect(defaultProps.addTempOrderId).not.toHaveBeenCalled();
  });

  test('placeOrder has user id and without error', async () => {
    window.console.error = jest.fn();
    const CartActions = require('../../app/actions/CartActions');
    const component = getShallowComponent();
    await component.instance().placeOrder();
    expect(component.state('isBtnDisable')).toBe(true);
    expect(component.state('isShowProgress')).toBe(true);
    expect(CartActions.placeOrder).toHaveBeenCalledTimes(2);
    expect(defaultProps.clearCart).toHaveBeenCalledTimes(3);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(3);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(`${ORDER_STATUS_PAGE_URL}/orderId`);
    expect(window.console.error).not.toHaveBeenCalled();
    expect(defaultProps.addTempOrderId).toHaveBeenCalledTimes(1);
    expect(defaultProps.addTempOrderId).toHaveBeenLastCalledWith('orderId');
  });

  test('placeOrder with error', async () => {
    window.console.error = jest.fn();
    const CartActions = require('../../app/actions/CartActions');
    CartActions.placeOrder.mockReturnValue(Promise.reject());
    const component = getShallowComponent();
    await component.instance().placeOrder();
    expect(component.state('isBtnDisable')).toBe(true);
    expect(component.state('isShowProgress')).toBe(true);
    expect(CartActions.placeOrder).toHaveBeenCalledTimes(3);
    expect(defaultProps.clearCart).toHaveBeenCalledTimes(3);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(3);
    expect(window.console.error).toHaveBeenCalledTimes(1);
  });

  test('handlePlaceBtnClick without user id ', () => {
    const component = getShallowComponent();
    const mockPlaceOrder = jest.fn();
    const mockHandleToggleDialog = jest.fn();
    component.instance().placeOrder = mockPlaceOrder;
    component.instance().handleToggleLoginSuggestionDialog = mockHandleToggleDialog;

    component.instance().handlePlaceBtnClick();

    expect(mockHandleToggleDialog).toHaveBeenCalledTimes(1);
    expect(mockPlaceOrder).not.toHaveBeenCalled();
  });

  test('handlePlaceBtnClick with user id ', () => {
    const component = getShallowComponent({ ...defaultProps, user: { _id: 'id' } });
    const mockPlaceOrder = jest.fn();
    const mockHandleToggleDialog = jest.fn();
    component.instance().placeOrder = mockPlaceOrder;
    component.instance().handleToggleLoginSuggestionDialog = mockHandleToggleDialog;

    component.instance().handlePlaceBtnClick();

    expect(mockPlaceOrder).toHaveBeenCalledTimes(1);
    expect(mockHandleToggleDialog).not.toHaveBeenCalled();
  });

  test('handleShowLoginDialog', () => {
    window.console.error = jest.fn();
    const component = mount(<OrderSummary {...defaultProps} />);
    const mockHandleToggleDialog = jest.fn();
    component.instance().handleToggleLoginSuggestionDialog = mockHandleToggleDialog;
    component.instance().handleShowLoginDialog();

    expect(mockHandleToggleDialog).toHaveBeenCalledTimes(1);
    expect(context.handleToggleLoginDialog).toHaveBeenCalledTimes(1);
  });

  test('Snapshot without table number', () => expect(renderer.create(<OrderSummary {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with table number', () => expect(renderer.create(<OrderSummary {...{ ...defaultProps, cart: { tableNumber: 1 } }} />).toJSON()).toMatchSnapshot());
});
