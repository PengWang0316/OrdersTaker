import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from '../../app/actions/ActionTypes';
import { API_FETCH_ORDER_AMOUNT, API_FETCH_ORDERS, API_FETCH_UNLOGIN_ORDERS } from '../../app/actions/ApiUrls';
import * as OrdersActions from '../../app/actions/OrdersActions';
import { MAX_ORDER_AMOUNT } from '../../app/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe('OrdersActions', () => {
  test('increaseOrderAmountSuccess', () => {
    const expectedActions = [
      {
        type: INCREASE_ORDER_AMOUNT_SUCCESS
      }
    ];
    const store = mockStore();
    store.dispatch(OrdersActions.increaseOrderAmount());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchOrderAmount without error', () => {
    const loginUserOrderAmount = 10;
    const user = { jwt: 'jwtMessage' };
    const expectedActions = [
      {
        type: FETCH_ORDER_AMOUNT_SUCCESS,
        loginUserOrderAmount
      }
    ];
    axiosMock.onGet(API_FETCH_ORDER_AMOUNT, { params: { jwtMessage: user.jwt } }).reply(200, loginUserOrderAmount);
    const store = mockStore();
    return store.dispatch(OrdersActions.fetchOrderAmount(user))
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  test('fetchOrderAmount with network error', () => {
    window.console.error = jest.fn();
    const user = { jwt: 'jwtMessage' };
    axiosMock.onGet(API_FETCH_ORDER_AMOUNT, { params: { jwtMessage: user.jwt } }).networkError();
    const store = mockStore();
    return store.dispatch(OrdersActions.fetchOrderAmount(user))
      .then(() => expect(window.console.error).toHaveBeenCalledTimes(1));
  });

  test('fetchLoginUserOrders without error', () => {
    window.console.error = jest.fn();
    const user = { jwt: 'jwtMessage' };
    const resultData = [1, 2];
    axiosMock.onGet(API_FETCH_ORDERS, { params: { offset: 10, amount: MAX_ORDER_AMOUNT, jwtMessage: user.jwt } }).reply(200, resultData);
    return OrdersActions.fetchLoginUserOrders(10, user).then(data => {
      expect(data).toBe(resultData);
      expect(window.console.error).not.toHaveBeenCalled();
    });
  });

  test('fetchLoginUserOrders with error', () => {
    console.error = jest.fn();
    const user = { jwt: 'jwtMessage' };
    axiosMock.onGet(API_FETCH_ORDERS, { params: { offset: 10, amount: MAX_ORDER_AMOUNT, jwtMessage: user.jwt } }).networkError();
    return OrdersActions.fetchLoginUserOrders(10, user).catch(() => expect(console.error).toHaveBeenCalledTimes(1));
  });

  test('fetchUnloginUserOrders without error', () => {
    console.error = jest.fn();
    const orderIds = ['id1', 'id2'];
    const resultData = ['orderA', 'orderB'];
    axiosMock.onGet(API_FETCH_UNLOGIN_ORDERS, { params: { offset: 10, orderIds, amount: MAX_ORDER_AMOUNT } }).reply(200, resultData);
    return OrdersActions.fetchUnloginUserOrders(10, orderIds).then(data => {
      expect(data).toBe(resultData);
      expect(console.error).not.toBeCalled();
    });
  });

  test('fetchUnloginUserOrders with error', () => {
    console.error = jest.fn();
    const orderIds = ['id1', 'id2'];
    axiosMock.onGet(API_FETCH_UNLOGIN_ORDERS, { params: { offset: 10, orderIds, amount: MAX_ORDER_AMOUNT } }).networkError();
    return OrdersActions.fetchUnloginUserOrders(10, orderIds).catch(() => expect(console.error).toHaveBeenCalledTimes(1));
  });
});
