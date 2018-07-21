import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from '../actions/ActionTypes';

/**
 * The Redux state.
 * For right now, just amount is needed. But in the future we can put more information if we need to optimize the database call.
 * This state can be used as a cache. So, I keep it as an object.
 * The amount is setting to null in order to check whether the fetchOrderAmount has already been called.
 * @param {object} state contain all value
 * @param {object} action has action values
 * @return {object} return new state
 */
const orders = (/* istanbul ignore next */state = { loginUserOrderAmount: null }, { type, loginUserOrderAmount }) => {
  switch (type) {
    case INCREASE_ORDER_AMOUNT_SUCCESS:
      return { ...state, loginUserOrderAmount: state.loginUserOrderAmount + 1 };
    case FETCH_ORDER_AMOUNT_SUCCESS:
      return { ...state, loginUserOrderAmount };
    default:
      return state;
  }
};

export default orders;
