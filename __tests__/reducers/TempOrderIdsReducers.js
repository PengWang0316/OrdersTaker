import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from '../../app/actions/ActionTypes';
import tempOrderIds from '../../app/reducers/TempOrderIdsReducers';

describe('TempOrderIdsReducers', () => {
  test('Return default', () => {
    const action = { type: null, id: 'id' };
    const state = [];
    expect(tempOrderIds(state, action)).toBe(state);
  });

  test('ADD_ORDER_ID_SUCCESS', () => {
    const action = { type: ADD_ORDER_ID_SUCCESS, id: 'id' };
    const state = ['idA', 'idB'];
    expect(tempOrderIds(state, action)).toEqual(['idA', 'idB', 'id']);
  });

  test('REMOVE_ORDER_ID_SUCCESS without match id', () => {
    const action = { type: REMOVE_ORDER_ID_SUCCESS, id: 'id' };
    const state = ['idA', 'idB'];
    expect(tempOrderIds(state, action)).toEqual(['idA', 'idB']);
  });

  test('REMOVE_ORDER_ID_SUCCESS with match id', () => {
    const action = { type: REMOVE_ORDER_ID_SUCCESS, id: 'idB' };
    const state = ['idA', 'idB', 'idC'];
    const returnState = tempOrderIds(state, action);
    expect(returnState).toEqual(['idA', 'idC']);
    expect(returnState).not.toBe(state);
  });
});
