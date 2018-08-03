import axios from 'axios';

import { ADD_ITEM_SUCCESS, REMOVE_ITEM_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_CART_SUCCESS } from './ActionTypes';
import { API_SAVE_PLACED_ORDER } from './ApiUrls';

const addItemSuccess = (item, priceKey) => ({
  type: ADD_ITEM_SUCCESS,
  item,
  priceKey
});

const removeItemSuccess = (item, priceKey) => ({
  type: REMOVE_ITEM_SUCCESS,
  item,
  priceKey
});

const setTableNumberSuccess = number => ({
  type: SET_TABLE_NUMBER_SUCCESS,
  number
});

const clearCartSuccess = () => ({
  type: CLEAR_CART_SUCCESS
});

export const addItemToCart = ({ item, priceKey }) => addItemSuccess(item, priceKey);

export const removeItemFromCart = ({ item, priceKey }) => removeItemSuccess(item, priceKey);

export const setTableNumber = number => setTableNumberSuccess(number);

export const clearCart = () => clearCartSuccess();

export const placeOrder = (order, jwtMessage) => new Promise((resolve, reject) =>
  axios.post(API_SAVE_PLACED_ORDER, { order, jwtMessage })
    .then(({ data }) => resolve(data))
    .catch(err => {
      console.error(err);
      reject(err);
    }));
