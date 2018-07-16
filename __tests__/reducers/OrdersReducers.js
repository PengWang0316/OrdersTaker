import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from '../../app/actions/ActionTypes';
import orders from '../../app/reducers/OrdersReducers';

describe('OrdersReducers', () => {
  test('orders default return', () => expect(orders({ qty: 0, items: {} }, {})).toEqual({ qty: 0, items: {} }));
  test('orders ADD_ORDER_SUCCESS without item._id', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { qty: 0, items: {} };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 });
  });

  test('orders ADD_ORDER_SUCCESS without item._id and no priceKey yet', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: {} } }, qty: 0 };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 });
  });

  test('orders ADD_ORDER_SUCCESS without item._id and has priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKey: 1 } } }, qty: 0 };
    expect(orders(state, { type: ADD_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 2 } } }, qty: 1 });
  });

  test('orders REMOVE_ORDER_SUCCESS with priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 };
    expect(orders(state, { type: REMOVE_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 0 } } }, qty: 0 });
  });

  test('orders REMOVE_ORDER_SUCCESS without priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1 };
    expect(orders(state, { type: REMOVE_ORDER_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1 });
  });

  test('orders SET_TABLE_NUMBER_SUCCESS', () => {
    const state = { items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1, tableNumber: null };
    expect(orders(state, { type: SET_TABLE_NUMBER_SUCCESS, number: 1 }))
      .toEqual({ items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1, tableNumber: 1 });
  });

  test('orders CLEAR_ORDERS_SUCCESS', () => expect(orders({ id: {}, qty: 3, tableNumber: 1 }, { type: CLEAR_ORDERS_SUCCESS })).toEqual({ qty: 0, items: {} }));
});
