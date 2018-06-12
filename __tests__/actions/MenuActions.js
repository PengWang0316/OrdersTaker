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
    const menus = [{ id: 1, items: [{ id: 1 }, { id: 2 }] }, { id: 2, items: [{ id: 3 }] }];
    const menuItems = { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } };
    const expectedActions = [
      { type: FETCH_ALL_MENU_SUCCESS, menus },
      { type: FETCH_ALL_MENU_ITEM_SUCCESS, menuItems }
    ];
    axiosMock.onGet(API_FETCH_ALL_MENU).reply(200, menus);
    const store = mockStore();
    return store.dispatch(fetchAllMenu())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
