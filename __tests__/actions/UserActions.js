import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { USER_LOGOUT_SUCCESS } from '../../app/actions/ActionTypes';
import { JWT_MESSAGE } from '../../app/config';
import * as UserActions from '../../app/actions/UserActions';

const axiosMock = new MockAdapter(axios); // Setting up a mock for axios.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UserActions', () => {
  test('logout', () => {
    const expectActions = [{ type: USER_LOGOUT_SUCCESS, user: null }];
    const store = mockStore();
    store.dispatch(UserActions.logout());
    expect(store.getActions()).toEqual(expectActions);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenLastCalledWith(JWT_MESSAGE);
  });
});
