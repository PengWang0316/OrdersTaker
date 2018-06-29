import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { USER_LOGOUT_SUCCESS, USER_LOGIN_SUCCESS, PARSER_USER_FROM_JWT_SUCCESS } from '../../app/actions/ActionTypes';
import { API_REGISTER_USER, API_CHECK_USERNAME_AVAILABLE, API_JWTMESSAGE_VERIFY, API_LOGIN_WITH_PASSWORD } from '../../app/actions/ApiUrls';
import { JWT_MESSAGE } from '../../app/config';
import * as UserActions from '../../app/actions/UserActions';

const axiosMock = new MockAdapter(axios); // Setting up a mock for axios.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UserActions', () => {
  test('logout', () => {
    const expectActions = [{ type: USER_LOGOUT_SUCCESS, user: {} }];
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

  test('parserUserFromJwt', () => {
    const user = { _id: 'id' };
    const jwtMessage = 'message';
    const expectActions = [
      { type: PARSER_USER_FROM_JWT_SUCCESS, user }
    ];
    axiosMock.onGet(API_JWTMESSAGE_VERIFY, { params: { jwtMessage } }).reply(200, user);
    const store = mockStore();
    return store.dispatch(UserActions.parserUserFromJwt(jwtMessage)).then(() =>
      expect(store.getActions()).toEqual(expectActions));
  });

  test('parserUserFromJwt with network error', () => {
    const jwtMessage = 'message';
    const mockErrorFn = jest.fn();
    console.error = mockErrorFn;

    axiosMock.onGet(API_JWTMESSAGE_VERIFY, { params: { jwtMessage } }).networkError();
    const store = mockStore();
    store.dispatch(UserActions.parserUserFromJwt(jwtMessage)).then(() =>
      expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });

  test('loginWithPassword has data without error', () => {
    const user = { username: 'username', password: 'password' };
    const expectActions = [
      { type: USER_LOGIN_SUCCESS, user: { ...user, jwt: 'jwt' } }
    ];
    axiosMock.onGet(API_LOGIN_WITH_PASSWORD, { params: user }).reply(200, { ...user, jwt: 'jwt' });
    const store = mockStore();
    return store.dispatch(UserActions.loginWithPassword(user)).then(() => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(JWT_MESSAGE, 'jwt');
      expect(store.getActions()).toEqual(expectActions);
    });
  });

  test('loginWithPassword no data without error', () => {
    const user = { username: 'username', password: 'password' };
    const expectActions = [
      { type: USER_LOGIN_SUCCESS, user: null }
    ];
    axiosMock.onGet(API_LOGIN_WITH_PASSWORD, { params: user }).reply(200, null);
    const store = mockStore();
    return store.dispatch(UserActions.loginWithPassword(user)).then(() => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(store.getActions()).toEqual(expectActions);
    });
  });

  test('loginWithPassword with network error', () => {
    const user = { username: 'username', password: 'password' };
    const mockErrorFn = jest.fn();
    console.error = mockErrorFn;
    axiosMock.onGet(API_LOGIN_WITH_PASSWORD, { params: user }).networkError();
    const store = mockStore();
    return store.dispatch(UserActions.loginWithPassword(user))
      .then(() => expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });

  test('emptyUser', () => {
    const expectActions = [
      { type: USER_LOGIN_SUCCESS, user: {} }
    ];
    const store = mockStore();
    store.dispatch(UserActions.emptyUser());
    expect(store.getActions()).toEqual(expectActions);
  });
});
