import { USER_LOGOUT_SUCCESS } from './ActionTypes';
import { JWT_MESSAGE } from '../config';


const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
  user: null
});

export const logout = () => dispatch => {
  localStorage.removeItem(JWT_MESSAGE);
  dispatch(userLogoutSuccess());
};

export default logout;
