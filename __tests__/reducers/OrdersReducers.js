import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from '../../app/actions/ActionTypes';

import orders from '../../app/reducers/OrdersReducers';

describe('OrdersReducers', () => {
  test('Return initial state', () => {
    const state = { loginUserOrderAmount: 0 };
    expect(orders(state, { type: null })).toBe(state);
  });

  test('INCREASE_ORDER_AMOUNT_SUCCESS', () => {
    const state = { loginUserOrderAmount: 0, other: 'other' };
    expect(orders(state, { type: INCREASE_ORDER_AMOUNT_SUCCESS })).toEqual({ loginUserOrderAmount: 1, other: 'other' });
  });

  test('FETCH_ORDER_AMOUNT_SUCCESS', () => {
    const state = { loginUserOrderAmount: 0, other: 'other' };
    expect(orders(state, { type: FETCH_ORDER_AMOUNT_SUCCESS, loginUserOrderAmount: 2 })).toEqual({ loginUserOrderAmount: 2, other: 'other' });
  });
});
