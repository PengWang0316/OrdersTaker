import axios from 'axios';

import { USER_LOGOUT_SUCCESS, USER_LOGIN_SUCCESS } from './ActionTypes';
import { API_REGISTER_USER, API_CHECK_USERNAME_AVAILABLE } from './ApiUrls';
import { JWT_MESSAGE } from '../config';


const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
  user: null
});

const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  user
});

export const logout = () => dispatch => {
  localStorage.removeItem(JWT_MESSAGE);
  dispatch(userLogoutSuccess());
};

export const registerUser = user => dispatch =>
  axios.post(API_REGISTER_USER, user)
    .then(({ data }) => { // After get user back, write it to localStorage and dispatch it to redux.
      localStorage.setItem(JWT_MESSAGE, data.jwt);
      dispatch(userLoginSuccess(data));
    })
    .catch(err => console.error(err));

export const checkUsernameAvailable = username =>
  new Promise((resolve, reject) =>
    axios.get(API_CHECK_USERNAME_AVAILABLE, { params: { username } })
      .then(({ data }) => resolve(data)).catch(err => console.error(err)));
