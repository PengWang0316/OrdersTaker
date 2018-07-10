import { ADD_ORDER_SUCCESS } from '../actions/ActionTypes';

const orders = (/* istanbul ignore next */state = { qty: 0 }, { type, item, priceKey }) => {
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
    default:
      return state;
  }
};
export default orders;
