import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from '../../app/actions/ActionTypes';
import { API_SAVE_PLACED_ORDER } from '../../app/actions/ApiUrls';
import * as OrdersActions from '../../app/actions/OrdersActions';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// jest.mock('axios', () => ({ put: jest.fn() }));

describe('OrdersActions', () => {
  test('addItemToCart', () => {
    const item = { id: '1' };
    const priceKey = 'priceKey';
    // const user = { jwt: 'jwt', _id: 'userId' };
    // const axios = require('axios');
    const expectActions = [
      {
        type: ADD_ORDER_SUCCESS,
        priceKey,
        item
      }
    ];
    const store = mockStore();
    store.dispatch(OrdersActions.addItemToCart({ item, priceKey }));
    expect(store.getActions()).toEqual(expectActions);
  });

  test('removeItemToCart', () => {
    const item = { id: '1' };
    const priceKey = 'priceKey';
    // const user = { jwt: 'jwt', _id: 'userId' };
    // const axios = require('axios');
    const expectActions = [
      {
        type: REMOVE_ORDER_SUCCESS,
        priceKey,
        item
      }
    ];
    const store = mockStore();
    store.dispatch(OrdersActions.removeItemFromCart({ item, priceKey }));
    expect(store.getActions()).toEqual(expectActions);
  });

  test('setTableNumber', () => {
    const number = 1;
    const expectActions = [
      {
        type: SET_TABLE_NUMBER_SUCCESS,
        number
      }
    ];
    const store = mockStore();
    store.dispatch(OrdersActions.setTableNumber(number));
    expect(store.getActions()).toEqual(expectActions);
  });

  test('clearOrders', () => {
    const expectActions = [
      { type: CLEAR_ORDERS_SUCCESS }
    ];
    const store = mockStore();
    store.dispatch(OrdersActions.clearOrders());
    expect(store.getActions()).toEqual(expectActions);
  });

  test('placeOrder without error', () => {
    const order = {};
    axiosMock.onPost(API_SAVE_PLACED_ORDER, order).reply(200, 1);
    OrdersActions.placeOrder(order).then(data => expect(data).toBe(1));
  });

  test('placeOrder with network error', () => {
    const order = {};
    window.console.error = jest.fn();
    axiosMock.onPost(API_SAVE_PLACED_ORDER, order).networkError();
    OrdersActions.placeOrder(order).then(() => expect(window.console.error).toHaveBeenCalledTimes(1)).catch(() => {});
  });
});
