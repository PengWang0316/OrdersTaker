import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from '../../app/actions/ActionTypes';
import * as TempOrderIdsActions from '../../app/actions/TempOrderIdsActions';
import { API_LINK_ORDER_TO_ACCOUNT } from '../../app/actions/ApiUrls';

jest.mock('axios', () => ({ put: jest.fn().mockReturnValue(Promise.resolve()) }));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const axiosMock = new MockAdapter(axios);

describe('TempOrderIdsActions', () => {
  test('addTempOrderId', () => {
    const id = 'id';
    const expectedActions = [
      { type: ADD_ORDER_ID_SUCCESS, id }
    ];
    const store = mockStore();
    store.dispatch(TempOrderIdsActions.addTempOrderId(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('removeTempOrderId', () => {
    const id = 'id';
    const expectedActions = [
      { type: REMOVE_ORDER_ID_SUCCESS, id }
    ];
    const store = mockStore();
    store.dispatch(TempOrderIdsActions.removeTempOrderId(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('linkOrderToAccount without error', async () => {
    console.error = jest.fn();
    const axios = require('axios');
    const paramters = { orderId: 'id', jwt: 'jwt' };

    await TempOrderIdsActions.linkOrderToAccount(paramters.orderId, paramters.jwt);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenLastCalledWith(API_LINK_ORDER_TO_ACCOUNT, paramters);
    expect(console.error).not.toHaveBeenCalled();
  });

  test('linkOrderToAccount with error', async () => {
    console.error = jest.fn();
    const axios = require('axios');
    axios.put.mockReturnValue(Promise.reject());
    const paramters = { orderId: 'id', jwt: 'jwt' };

    await TempOrderIdsActions.linkOrderToAccount(paramters.orderId, paramters.jwt);
    expect(axios.put).toHaveBeenCalledTimes(2);
    expect(axios.put).toHaveBeenLastCalledWith(API_LINK_ORDER_TO_ACCOUNT, paramters);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
