import { ADD_ORDER_SUCCESS, REMOVE_ORDER_SUCCESS, SET_TABLE_NUMBER_SUCCESS, CLEAR_ORDERS_SUCCESS } from '../actions/ActionTypes';

const orders = (/* istanbul ignore next */state = { qty: 0 }, { type, item, priceKey, number }) => {
  switch (type) {
    case ADD_ORDER_SUCCESS: {
      const returnState = { // Making a new object
        ...state, // Copy the original state
        qty: state.qty + 1 // Add one quantity
      };
      if (!returnState[item._id]) returnState[item._id] = { qty: { [priceKey]: 1 } }; // If the orders object has not had this item, directly add it in.
      else returnState[item._id] = { // If the item has already been the orders object, copy the item and qty attribute in the item. Add one or give it a inital value.
        qty: { ...returnState[item._id].qty, [priceKey]: returnState[item._id].qty[priceKey] ? returnState[item._id].qty[priceKey] + 1 : 1 }
      };
      return returnState;
    }
    case REMOVE_ORDER_SUCCESS: {
      const returnState = { // Making a new object
        ...state, // Copy the original state
        qty: state[item._id].qty[priceKey] ? state.qty - 1 : state.qty // If the price key is not exsit or eaqul zero, do not change the total quantity.
      };
      if (state[item._id].qty[priceKey]) --returnState[item._id].qty[priceKey];
      return returnState;
    }
    case SET_TABLE_NUMBER_SUCCESS:
      return { ...state, tableNumber: number };
    case CLEAR_ORDERS_SUCCESS:
      return { qty: 0 };
    default:
      return state;
  }
};
export default orders;
