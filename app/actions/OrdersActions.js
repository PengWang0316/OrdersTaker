import axios from 'axios';

import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from './ActionTypes';
import { API_FETCH_ORDER_AMOUNT } from './ApiUrls';

const increaseOrderAmountSuccess = () => ({
  type: INCREASE_ORDER_AMOUNT_SUCCESS
});

const fetchOrderAmountSuccess = loginUserOrderAmount => ({
  type: FETCH_ORDER_AMOUNT_SUCCESS,
  loginUserOrderAmount
});

export const increaseOrderAmount = () => increaseOrderAmountSuccess();

export const fetchOrderAmount = user => dispatch =>
  axios.get(API_FETCH_ORDER_AMOUNT, { params: { jwtMessage: user.jwt } })
    .then(({ data }) => dispatch(fetchOrderAmountSuccess(data)))
    .catch(err => console.error(err));
