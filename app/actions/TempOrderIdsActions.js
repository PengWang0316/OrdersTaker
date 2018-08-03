import axios from 'axios';

import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from './ActionTypes';
import { API_LINK_ORDER_TO_ACCOUNT } from './ApiUrls';

const addOrderIdSuccess = id => ({
  type: ADD_ORDER_ID_SUCCESS,
  id
});

const removeOrderIdSuccess = id => ({
  type: REMOVE_ORDER_ID_SUCCESS,
  id
});

export const addTempOrderId = id => addOrderIdSuccess(id);

export const removeTempOrderId = id => removeOrderIdSuccess(id);

export const linkOrderToAccount = (orderId, jwt) =>
  axios.update(API_LINK_ORDER_TO_ACCOUNT, { orderId, jwt }).catch(err => console.error(err));
