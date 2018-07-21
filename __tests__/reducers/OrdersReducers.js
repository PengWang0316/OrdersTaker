import { INCREASE_ORDER_AMOUNT_SUCCESS, FETCH_ORDER_AMOUNT_SUCCESS } from '../../app/actions/ActionTypes';

import orders from '../../app/reducers/OrdersReducers';

describe('OrdersReducers', () => {
  test('Return initial state', () => {
    const state = { amount: 0 };
    expect(orders(state, { type: null })).toBe(state);
  });

  test('INCREASE_ORDER_AMOUNT_SUCCESS', () => {
    const state = { amount: 0, other: 'other' };
    expect(orders(state, { type: INCREASE_ORDER_AMOUNT_SUCCESS })).toEqual({ amount: 1, other: 'other' });
  });

  test('FETCH_ORDER_AMOUNT_SUCCESS', () => {
    const state = { amount: 0, other: 'other' };
    expect(orders(state, { type: FETCH_ORDER_AMOUNT_SUCCESS, amount: 2 })).toEqual({ amount: 2, other: 'other' });
  });
});
