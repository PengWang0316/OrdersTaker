import { ADD_ORDER_ID_SUCCESS, REMOVE_ORDER_ID_SUCCESS } from '../actions/ActionTypes';

const tempOrderIds = (/* istanbul ignore next */state = [], { type, id }) => {
  switch (type) {
    case ADD_ORDER_ID_SUCCESS:
      return [...state, id];
    case REMOVE_ORDER_ID_SUCCESS: {
      const index = state.indexOf(id);
      if (index !== -1) {
        const returnState = [...state];
        returnState.splice(index, 1);
        return returnState;
      }
      return state; // If id exsits in the state, copy the array and remove the id.
    }
    default:
      return state;
  }
};
export default tempOrderIds;
