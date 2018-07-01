import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchAllMenu } from '../../app/actions/MenuActions';
import { FETCH_ALL_MENU_ITEM_SUCCESS, FETCH_ALL_MENU_SUCCESS } from '../../app/actions/ActionTypes';
import { API_FETCH_ALL_MENU } from '../../app/actions/ApiUrls';

const axiosMock = new MockAdapter(axios); // Setting up a mock for axios.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MenuActions', () => {
  test('fetchAllMenu without error', () => {
    const menus = [{ _id: 1, category: 'category', items: [{ _id: 1 }, { _id: 2 }] }, { _id: 2, category: 'category2', items: [{ _id: 3 }] }];
    const menuItems = { 1: { _id: 1, category: 'category' }, 2: { _id: 2, category: 'category' }, 3: { _id: 3, category: 'category2' } };
    const expectedActions = [
      { type: FETCH_ALL_MENU_SUCCESS, menus },
      { type: FETCH_ALL_MENU_ITEM_SUCCESS, menuItems }
    ];
    axiosMock.onGet(API_FETCH_ALL_MENU).reply(200, menus);
    const store = mockStore();
    return store.dispatch(fetchAllMenu())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  test('fetchAllMenu with axios error', () => {
    const mockErrorFn = jest.fn();
    window.console.error = mockErrorFn;
    axiosMock.onGet(API_FETCH_ALL_MENU).networkError();
    const store = mockStore();
    return store.dispatch(fetchAllMenu())
      .then(() => expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });
});
