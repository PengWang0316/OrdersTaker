import { FETCH_BASIC_INFORMATION_SUCCESS } from '../actions/ActionTypes';

export const basicInformation = (state = null, action) => {
  switch (action.type) {
    case FETCH_BASIC_INFORMATION_SUCCESS:
      return action.basicInformation;
    default:
      return state;
  }
};

export default basicInformation;
