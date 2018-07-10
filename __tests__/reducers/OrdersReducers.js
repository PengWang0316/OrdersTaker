import { ADD_ORDER_SUCCESS } from '../../app/actions/ActionTypes';
import orders from '../../app/reducers/OrdersReducers';

describe('OrdersReducers', () => {
  test('orders default return', () => expect(orders({ qty: 0 }, {})).toEqual({ qty: 0 }));
  test('orders ADD_ORDER_SUCCESS without item._id', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { qty: 0 };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ itemId: { qty: { priceKey: 1 } }, qty: 1 });
  });

  test('orders ADD_ORDER_SUCCESS without item._id and no priceKey yet', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { itemId: { qty: {} }, qty: 0 };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ itemId: { qty: { priceKey: 1 } }, qty: 1 });
  });

  test('orders ADD_ORDER_SUCCESS without item._id and has priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { itemId: { qty: { priceKey: 1 } }, qty: 0 };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ itemId: { qty: { priceKey: 2 } }, qty: 1 });
  });
});
