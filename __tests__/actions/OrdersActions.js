import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from '../../app/actions/ActionTypes';
import { API_FETCH_ORDER_AMOUNT } from '../../app/actions/ApiUrls';
import * as OrdersActions from '../../app/actions/OrdersActions';

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
    const amount = 10;
    const user = { jwt: 'jwtMessage' };
    const expectedActions = [
      {
        type: FETCH_ORDER_AMOUNT_SUCCESS,
        amount
      }
    ];
    axiosMock.onGet(API_FETCH_ORDER_AMOUNT, { params: { jwtMessage: user.jwt } }).reply(200, amount);
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
});
