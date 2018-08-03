import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrdersPageContainer } from '../../../app/components/containers/OrdersPageContainer';

jest.mock('../../../app/components/OrderBrowser', () => 'OrderBrowser');
jest.mock('../../../app/components/OrderDetailDialog', () => 'OrderDetailDialog');
jest.mock('../../../app/components/AlertDialog', () => 'AlertDialog');
jest.mock('../../../app/components/snackbars/CheckCircleIconSnackbar', () => 'CheckCircleIconSnackbar');
jest.mock('../../../app/actions/OrdersActions', () => ({
  // fetchOrderAmount: jest.fn().mockReturnValue(Promise.resolve(10)),
  fetchUnloginUserOrders: jest.fn().mockReturnValue(Promise.resolve([])),
  fetchLoginUserOrders: jest.fn().mockReturnValue(Promise.resolve([]))
}));
jest.mock('../../../app/actions/TempOrderIdsActions', () => ({ linkOrderToAccount: jest.fn() }));

describe('OrdersPageContainer', () => {
  const defaultProps = {
    user: {
      _id: 'id',
      jwt: 'jwt'
    },
    orders: {
      loginUserOrderAmount: 7
    },
    tempOrderIds: [1, 2],
    menuItems: {
      1: {},
      2: {}
    },
    fetchOrderAmount: jest.fn(),
    fetchAllMenu: jest.fn(),
    loginUserOrderAmount: 2,
    removeTempOrderId: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrdersPageContainer {...props} />);

  test('Initial states, constructor, and componentDidMount', () => {
    const OrdersActions = require('../../../app/actions/OrdersActions');
    let component = getShallowComponent({ ...defaultProps, user: {}, tempOrderIds: [] });
    expect(component.state('isDetailedDialogOpen')).toBe(false);
    expect(component.state('isRemoveAlertOpen')).toBe(false);
    expect(component.state('isLinkAlertOpen')).toBe(false);
    expect(component.state('isSnackbarOpen')).toBe(false);
    expect(component.state('snackbarMessage')).toBe('');
    expect(component.state('loginUserOrders').length).toBe(0);
    expect(component.state('unloginUserOrders').length).toBe(0);
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
    expect(OrdersActions.fetchLoginUserOrders).not.toHaveBeenCalled();
    expect(OrdersActions.fetchUnloginUserOrders).not.toHaveBeenCalled();
    expect(defaultProps.fetchOrderAmount).not.toHaveBeenCalled();

    component = getShallowComponent({ ...defaultProps, menuItems: {}, user: {}, tempOrderIds: [] });
    expect(defaultProps.fetchAllMenu).toHaveBeenCalledTimes(1);
    expect(OrdersActions.fetchLoginUserOrders).not.toHaveBeenCalled();
    expect(OrdersActions.fetchUnloginUserOrders).not.toHaveBeenCalled();
    expect(defaultProps.fetchOrderAmount).not.toHaveBeenCalled();

    component = getShallowComponent();
    expect(OrdersActions.fetchLoginUserOrders).toHaveBeenCalledTimes(1);
    expect(OrdersActions.fetchLoginUserOrders).toHaveBeenLastCalledWith(0, { _id: 'id', jwt: 'jwt' });
    expect(OrdersActions.fetchUnloginUserOrders).toHaveBeenCalledTimes(1);
    expect(OrdersActions.fetchUnloginUserOrders).toHaveBeenLastCalledWith(0, [1, 2]);
    expect(defaultProps.fetchOrderAmount).not.toHaveBeenCalled();

    component = getShallowComponent({ ...defaultProps, orders: { loginUserOrderAmount: null } });
    expect(defaultProps.fetchOrderAmount).toHaveBeenCalledTimes(1);
    expect(defaultProps.fetchOrderAmount).toHaveBeenLastCalledWith(defaultProps.user);
  });

  test('getNewUnloginOrdersArray', () =>
    expect(OrdersPageContainer.getNewUnloginOrdersArray([{ _id: 'id1' }, { _id: 'id2' }, { _id: 'id3' }], 'id2'))
      .toEqual([{ _id: 'id1' }, { _id: 'id3' }]));

  test('fetchLoginUserOrders without error', async () => {
    console.error = jest.fn();
    const OrdersActions = require('../../../app/actions/OrdersActions');
    OrdersActions.fetchLoginUserOrders.mockReturnValue(Promise.resolve([{ _id: 'orderId' }]));
    const component = getShallowComponent();
    await component.instance().fetchLoginUserOrders(10);
    expect(OrdersActions.fetchLoginUserOrders).toHaveBeenLastCalledWith(10, { _id: 'id', jwt: 'jwt' });
    expect(component.state('loginUserOrders')).toEqual([{ _id: 'orderId' }]);
    expect(console.error).not.toHaveBeenCalled();
  });

  test('fetchLoginUserOrders with error', async () => {
    window.console.error = jest.fn();
    const OrdersActions = require('../../../app/actions/OrdersActions');
    OrdersActions.fetchLoginUserOrders.mockReturnValue(Promise.reject());
    const component = getShallowComponent();
    await component.instance().fetchLoginUserOrders(10);
    expect(OrdersActions.fetchLoginUserOrders).toHaveBeenLastCalledWith(10, { _id: 'id', jwt: 'jwt' });
    expect(component.state('loginUserOrders')).toEqual([]);
    expect(window.console.error).toHaveBeenCalled();
  });

  test('fetchUnloginUserOrders without error', async () => {
    const OrdersActions = require('../../../app/actions/OrdersActions');
    OrdersActions.fetchUnloginUserOrders.mockReturnValue(Promise.resolve([{ _id: 'orderId' }]));
    const component = getShallowComponent();
    await component.instance().fetchUnloginUserOrders(10);
    expect(OrdersActions.fetchUnloginUserOrders).toHaveBeenLastCalledWith(10, [1, 2]);
    expect(component.state('unloginUserOrders')).toEqual([{ _id: 'orderId' }]);
    // expect(console.error).not.toHaveBeenCalled();
  });

  test('fetchUnloginUserOrders with error', async () => {
    window.console.error = jest.fn();
    const OrdersActions = require('../../../app/actions/OrdersActions');
    OrdersActions.fetchUnloginUserOrders.mockReturnValue(Promise.reject());
    const component = getShallowComponent();
    await component.instance().fetchUnloginUserOrders(10);
    expect(OrdersActions.fetchUnloginUserOrders).toHaveBeenLastCalledWith(10, [1, 2]);
    expect(component.state('unloginUserOrders')).toEqual([]);
    expect(window.console.error).toHaveBeenCalled();
  });

  test('toggleDetailDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isDetailedDialogOpen')).toBe(false);
    component.instance().toggleDetailDialog();
    expect(component.state('isDetailedDialogOpen')).toBe(true);
  });

  test('handleShowDetail', () => {
    const component = getShallowComponent();
    const order = { _id: 'orderId' };
    expect(component.state('currentOrder')).toBeUndefined();
    component.instance().handleShowDetail(order);
    expect(component.state('currentOrder')).toBe(order);
  });

  test('handleRmoveUnloginOrder', async () => {
    const component = getShallowComponent();
    component.instance().unloginOrderId = 'unloginOrderId';
    const mockHandleToggleRemoveAlertDialog = jest.fn();
    const mockHandleToggleSnackbar = jest.fn();
    component.instance().handleToggleRemoveAlertDialog = mockHandleToggleRemoveAlertDialog;
    component.instance().handleToggleSnackbar = mockHandleToggleSnackbar;
    component.setState({ unloginUserOrders: [{ _id: '1' }, { _id: 'unloginOrderId' }] });

    await component.instance().handleRmoveUnloginOrder();
    expect(defaultProps.removeTempOrderId).toHaveBeenLastCalledWith('unloginOrderId');
    expect(mockHandleToggleRemoveAlertDialog).toHaveBeenCalledTimes(1);
    expect(mockHandleToggleRemoveAlertDialog).toHaveBeenLastCalledWith(null);
    expect(mockHandleToggleSnackbar).toHaveBeenCalledTimes(1);
    expect(component.state('unloginUserOrders')).toEqual([{ _id: '1' }]);
    expect(component.state('snackbarMessage')).toEqual('Removed Successfully');
  });

  test('handleLinkOrder', async () => {
    const TempOrderIdsActions = require('../../../app/actions/TempOrderIdsActions');
    const component = getShallowComponent();
    component.instance().unloginOrderId = 'unloginOrderId';
    const mockHandleToggleLinkAlertDialog = jest.fn();
    const mockHandleToggleSnackbar = jest.fn();
    component.instance().handleToggleLinkAlertDialog = mockHandleToggleLinkAlertDialog;
    component.instance().handleToggleSnackbar = mockHandleToggleSnackbar;
    component.setState({ unloginUserOrders: [{ _id: '1' }, { _id: 'unloginOrderId' }] });

    await component.instance().handleLinkOrder();
    expect(defaultProps.removeTempOrderId).toHaveBeenLastCalledWith('unloginOrderId');
    expect(mockHandleToggleLinkAlertDialog).toHaveBeenCalledTimes(1);
    expect(mockHandleToggleLinkAlertDialog).toHaveBeenLastCalledWith(null);
    expect(mockHandleToggleSnackbar).toHaveBeenCalledTimes(1);
    expect(component.state('unloginUserOrders')).toEqual([{ _id: '1' }]);
    expect(component.state('snackbarMessage')).toEqual('Linked to your account sccessfully');
    expect(TempOrderIdsActions.linkOrderToAccount).toHaveBeenCalledTimes(1);
    expect(TempOrderIdsActions.linkOrderToAccount).toHaveBeenLastCalledWith('unloginOrderId', 'jwt');
  });

  test('handleToggleRemoveAlertDialog', async () => {
    const component = getShallowComponent();
    expect(component.state('isRemoveAlertOpen')).toBe(false);

    await component.instance().handleToggleRemoveAlertDialog('orderId');
    expect(component.instance().unloginOrderId).toEqual('orderId');
    expect(component.state('isRemoveAlertOpen')).toBe(true);
  });

  test('handleToggleLinkAlertDialog', async () => {
    const component = getShallowComponent();
    expect(component.state('isLinkAlertOpen')).toBe(false);

    await component.instance().handleToggleLinkAlertDialog('orderId');
    expect(component.instance().unloginOrderId).toEqual('orderId');
    expect(component.state('isLinkAlertOpen')).toBe(true);
  });

  test('handleToggleSnackbar', async () => {
    const component = getShallowComponent();
    expect(component.state('isSnackbarOpen')).toBe(false);

    await component.instance().handleToggleSnackbar();
    expect(component.state('isSnackbarOpen')).toBe(true);
  });

  test('Snapshot', () => {
    const component = getShallowComponent();
    component.setState({ loginUserOrders: [{}], unloginUserOrders: [{}] });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
