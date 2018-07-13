// import axios from 'axios';

import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from './ActionTypes';
// import { API_ADD_ITEM_TO_ORDER } from './ApiUrls';

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
