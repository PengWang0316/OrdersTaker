import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from '../actions/ActionTypes';

const initialState = { qty: 0, items: {} };

const orders = (/* istanbul ignore next */state = initialState, { type, item, priceKey, number }) => {
  switch (type) {
    case ADD_ORDER_SUCCESS: {
      const returnState = { // Making a new object
        ...state, // Copy the original state
        items: { ...state.items },
        qty: state.qty + 1 // Add one quantity
      };
      if (!returnState.items[item._id]) returnState.items[item._id] = { qty: { [priceKey]: 1 } }; // If the orders object has not had this item, directly add it in.
      else returnState.items[item._id] = { // If the item has already been the orders object, copy the item and qty attribute in the item. Add one or give it a inital value.
        qty: { ...returnState.items[item._id].qty, [priceKey]: returnState.items[item._id].qty[priceKey] ? returnState.items[item._id].qty[priceKey] + 1 : 1 }
      };
      return returnState;
    }
    case REMOVE_ORDER_SUCCESS: {
      const returnState = { // Making a new object
        ...state, // Copy the original state
        items: { ...state.items },
        qty: state.items[item._id].qty[priceKey] ? state.qty - 1 : state.qty // If the price key is not exsit or eaqul zero, do not change the total quantity.
      };
      if (state.items[item._id].qty[priceKey]) --returnState.items[item._id].qty[priceKey];
      return returnState;
    }
    case SET_TABLE_NUMBER_SUCCESS:
      return { ...state, tableNumber: number };
    case CLEAR_ORDERS_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
export default orders;
