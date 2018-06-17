import { USER_LOGOUT_SUCCESS } from '../actions/ActionTypes';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_LOGOUT_SUCCESS:
      return action.user;
    default:
      return state;
  }
};

export default user;
