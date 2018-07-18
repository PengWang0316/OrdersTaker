import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from '../../app/actions/ActionTypes';
import * as TempOrderIdsActions from '../../app/actions/TempOrderIdsActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TempOrderIdsActions', () => {
  test('addTempOrderId', () => {
    const id = 'id';
    const expectedActions = [
      { type: ADD_ORDER_ID_SUCCESS, id }
    ];
    const store = mockStore();
    store.dispatch(TempOrderIdsActions.addTempOrderId(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('removeTempOrderId', () => {
    const id = 'id';
    const expectedActions = [
      { type: REMOVE_ORDER_ID_SUCCESS, id }
    ];
    const store = mockStore();
    store.dispatch(TempOrderIdsActions.removeTempOrderId(id));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
