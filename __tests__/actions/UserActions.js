import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { USER_LOGOUT_SUCCESS, USER_LOGIN_SUCCESS } from '../../app/actions/ActionTypes';
import { API_REGISTER_USER, API_CHECK_USERNAME_AVAILABLE } from '../../app/actions/ApiUrls';
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

  test('login', () => {
    const user = { id: 'id' };
    const returnUser = { ...user, role: 1, jwt: 'jwt' };
    const expectActions = [
      { type: USER_LOGIN_SUCCESS, user: returnUser }
    ];
    axiosMock.onPost(API_REGISTER_USER, user).reply(200, returnUser);
    const store = mockStore();
    return store.dispatch(UserActions.registerUser(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectActions);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenLastCalledWith(JWT_MESSAGE, returnUser.jwt);
      });
  });

  test('login with network error', () => {
    const user = {};
    const mockErrorFn = jest.fn();
    console.error = mockErrorFn;
    axiosMock.onPost(API_REGISTER_USER, user).networkError();
    const store = mockStore();
    return store.dispatch(UserActions.registerUser(user))
      .then(() => expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });

  test('checkUsernameAvailable without error', () => {
    axiosMock.onGet(API_CHECK_USERNAME_AVAILABLE, { params: { username: 'username' } }).reply(200, true);
    UserActions.checkUsernameAvailable('username').then(result => expect(result).toBe(true));
  });

  test('checkUsernameAvailable with nextwork error', () => {
    const mockErrorFn = jest.fn();
    console.error = mockErrorFn;
    axiosMock.onGet(API_CHECK_USERNAME_AVAILABLE, { params: { username: 'username' } }).networkError();
    UserActions.checkUsernameAvailable('username').then(() => expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });
});
