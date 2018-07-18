import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from './ActionTypes';

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
