import axios from 'axios';

import { ADD_ORDER_SUCCESS } from './ActionTypes';
import { API_ADD_ITEM_TO_ORDER } from './ApiUrls';

const addOrderSuccess = (item, priceKey) => ({
  type: ADD_ORDER_SUCCESS,
  item,
  priceKey
});

export const addItemToCart = ({ item, priceKey, user }) => {
  if (user && user._id) axios.put(API_ADD_ITEM_TO_ORDER, { jwtMessage: user.jwt, item, priceKey });
  return addOrderSuccess(item, priceKey);
};

export default addItemToCart;
