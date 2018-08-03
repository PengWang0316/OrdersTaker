import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_ITEM_SUCCESS, REMOVE_ITEM_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_CART_SUCCESS } from '../../app/actions/ActionTypes';
import { API_SAVE_PLACED_ORDER } from '../../app/actions/ApiUrls';
import * as CartActions from '../../app/actions/CartActions';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// jest.mock('axios', () => ({ put: jest.fn() }));

describe('CartActions', () => {
  test('addItemToCart', () => {
    const item = { id: '1' };
    const priceKey = 'priceKey';
    // const user = { jwt: 'jwt', _id: 'userId' };
    // const axios = require('axios');
    const expectActions = [
      {
        type: ADD_ITEM_SUCCESS,
        priceKey,
        item
      }
    ];
    const store = mockStore();
    store.dispatch(CartActions.addItemToCart({ item, priceKey }));
    expect(store.getActions()).toEqual(expectActions);
  });

  test('removeItemToCart', () => {
    const item = { id: '1' };
    const priceKey = 'priceKey';
    // const user = { jwt: 'jwt', _id: 'userId' };
    // const axios = require('axios');
    const expectActions = [
      {
        type: REMOVE_ITEM_SUCCESS,
        priceKey,
        item
      }
    ];
    const store = mockStore();
    store.dispatch(CartActions.removeItemFromCart({ item, priceKey }));
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
    store.dispatch(CartActions.setTableNumber(number));
    expect(store.getActions()).toEqual(expectActions);
  });

  test('clearCart', () => {
    const expectActions = [
      { type: CLEAR_CART_SUCCESS }
    ];
    const store = mockStore();
    store.dispatch(CartActions.clearCart());
    expect(store.getActions()).toEqual(expectActions);
  });

  test('placeOrder without error', () => {
    const body = { order: {}, jwtMessage: 'jwtMessage' };
    axiosMock.onPost(API_SAVE_PLACED_ORDER, body).reply(200, 1);
    return CartActions.placeOrder(body.order, body.jwtMessage).then(data => expect(data).toBe(1));
  });

  test('placeOrder with network error', () => {
    const body = { order: {}, jwtMessage: 'jwtMessage' };
    console.error = jest.fn();
    axiosMock.onPost(API_SAVE_PLACED_ORDER, body).networkError();
    return CartActions.placeOrder(body.order, body.jwtMessage).catch(() => expect(console.error).toHaveBeenCalledTimes(1));
  });
});
