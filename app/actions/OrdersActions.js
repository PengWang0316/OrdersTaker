import axios from 'axios';

import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from './ActionTypes';
import {
  API_FETCH_ORDER_AMOUNT,
  API_FETCH_ORDERS,
  API_FETCH_UNLOGIN_ORDERS,
  API_FETCH_UNFINISHED_ORDERS,
  API_UPDATE_FINISHED_ITEMS
} from './ApiUrls';
import { MAX_ORDER_AMOUNT } from '../config';

const increaseOrderAmountSuccess = () => ({
  type: INCREASE_ORDER_AMOUNT_SUCCESS
});

const fetchOrderAmountSuccess = loginUserOrderAmount => ({
  type: FETCH_ORDER_AMOUNT_SUCCESS,
  loginUserOrderAmount
});

export const increaseOrderAmount = () => increaseOrderAmountSuccess();

export const fetchOrderAmount = user => dispatch => axios.get(
  API_FETCH_ORDER_AMOUNT, { params: { jwtMessage: user.jwt } }
).then(({ data }) => dispatch(fetchOrderAmountSuccess(data))).catch(err => console.error(err));

/**
 * Fetching the orders from database based on offset, amount and user's jwt information.
 * @param {int} offset is the number will be skipped.
 * @param {object} user has all user information.
 * @return {Promise} Return a promise with the orders' information.
 */
export const fetchLoginUserOrders = (offset, user) => new Promise(
  (resolve, reject) => axios.get(
    API_FETCH_ORDERS, { params: { offset, amount: MAX_ORDER_AMOUNT, jwtMessage: user.jwt } }
  ).then(({ data }) => resolve(data)).catch(err => {
    console.error(err);
    reject(err);
  })
);

export const fetchUnloginUserOrders = (offset, orderIds) => new Promise(
  (resolve, reject) => axios.get(
    API_FETCH_UNLOGIN_ORDERS, { params: { offset, orderIds, amount: MAX_ORDER_AMOUNT } }
  ).then(({ data }) => resolve(data))
    .catch(err => {
      console.error(err);
      reject(err);
    })
);

export const fetchUnfinishedOrders = user => new Promise(
  (resolve, reject) => axios.get(API_FETCH_UNFINISHED_ORDERS, { params: { jwt: user.jwt } })
    .then(({ data }) => resolve(data))
    .catch(err => {
      console.error(err);
      reject(err);
    })
);

export const updateFinishedItems = body => axios.put(API_UPDATE_FINISHED_ITEMS, body);
