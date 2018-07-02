import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_ORDER_SUCCESS } from '../../app/actions/ActionTypes';
import { API_ADD_ITEM_TO_ORDER } from '../../app/actions/ApiUrls';
import * as OrdersActions from '../../app/actions/OrdersActions';

// const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios', () => ({ put: jest.fn() }));

describe('OrdersActions', () => {
  test('addItemToCart', () => {
    const item = { id: '1' };
    const priceKey = 'priceKey';
    const user = { jwt: 'jwt', _id: 'userId' };
    const axios = require('axios');
    const expectActions = [
      {
        type: ADD_ORDER_SUCCESS,
        priceKey,
        item
      }
    ];
    let store = mockStore();
    store.dispatch(OrdersActions.addItemToCart({ item, priceKey }));
    expect(store.getActions()).toEqual(expectActions);
    expect(axios.put).not.toHaveBeenCalled();

    store = mockStore();
    store.dispatch(OrdersActions.addItemToCart({ item, priceKey, user }));
    expect(store.getActions()).toEqual(expectActions);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenLastCalledWith(API_ADD_ITEM_TO_ORDER, { item, priceKey, jwtMessage: user.jwt });
  });
});
