import { USER_LOGOUT_SUCCESS, USER_LOGIN_SUCCESS } from '../actions/ActionTypes';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_LOGOUT_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return action.user;
    default:
      return state;
  }
};

export default user;
