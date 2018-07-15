import axios from 'axios';

import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from './ActionTypes';
import { API_SAVE_PLACED_ORDER } from './ApiUrls';

const addOrderSuccess = (item, priceKey) => ({
  type: ADD_ORDER_SUCCESS,
  item,
  priceKey
});

const removeOrderSuccess = (item, priceKey) => ({
  type: REMOVE_ORDER_SUCCESS,
  item,
  priceKey
});

const setTableNumberSuccess = number => ({
  type: SET_TABLE_NUMBER_SUCCESS,
  number
});

const clearOrdersSuccess = () => ({
  type: CLEAR_ORDERS_SUCCESS
});

export const addItemToCart = ({ item, priceKey }) => addOrderSuccess(item, priceKey);

export const removeItemFromCart = ({ item, priceKey }) => removeOrderSuccess(item, priceKey);

export const setTableNumber = number => setTableNumberSuccess(number);

export const clearOrders = () => clearOrdersSuccess();

export const placeOrder = order => new Promise((resolve, reject) =>
  axios.post(API_SAVE_PLACED_ORDER, order)
    .then(({ data }) => resolve(data))
    .catch(err => {
      console.error(err);
      reject(err);
    }));
