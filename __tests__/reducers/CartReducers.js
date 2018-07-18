import { ADD_ITEM_SUCCESS, REMOVE_ITEM_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_CART_SUCCESS } from '../../app/actions/ActionTypes';
import cart from '../../app/reducers/CartReducers';

describe('CartReducers', () => {
  test('cart default return', () => expect(cart({ qty: 0, items: {} }, {})).toEqual({ qty: 0, items: {} }));
  test('cart ADD_ITEM_SUCCESS without item._id', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { qty: 0, items: {} };
    expect(cart(state, { type: ADD_ITEM_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 });
  });

  test('cart ADD_ITEM_SUCCESS without item._id and no priceKey yet', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: {} } }, qty: 0 };
    expect(cart(state, { type: ADD_ITEM_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 });
  });

  test('cart ADD_ITEM_SUCCESS without item._id and has priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKey: 1 } } }, qty: 0 };
    expect(cart(state, { type: ADD_ITEM_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 2 } } }, qty: 1 });
  });

  test('cart REMOVE_ITEM_SUCCESS with priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKey: 1 } } }, qty: 1 };
    expect(cart(state, { type: REMOVE_ITEM_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKey: 0 } } }, qty: 0 });
  });

  test('cart REMOVE_ITEM_SUCCESS without priceKey', () => {
    const item = { _id: 'itemId', other: 'other' };
    const state = { items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1 };
    expect(cart(state, { type: REMOVE_ITEM_SUCCESS, item, priceKey: 'priceKey' }))
      .toEqual({ items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1 });
  });

  test('cart SET_TABLE_NUMBER_SUCCESS', () => {
    const state = { items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1, tableNumber: null };
    expect(cart(state, { type: SET_TABLE_NUMBER_SUCCESS, number: 1 }))
      .toEqual({ items: { itemId: { qty: { priceKeyA: 1 } } }, qty: 1, tableNumber: 1 });
  });

  test('cart CLEAR_CART_SUCCESS', () => expect(cart({ id: {}, qty: 3, tableNumber: 1 }, { type: CLEAR_CART_SUCCESS })).toEqual({ qty: 0, items: {} }));
});
