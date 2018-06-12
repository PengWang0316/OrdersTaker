import { FETCH_ALL_MENU_SUCCESS } from '../actions/ActionTypes';

const menus = (state = null, action) => {
  switch (action.type) {
    case FETCH_ALL_MENU_SUCCESS:
      return action.menus;
    default:
      return state;
  }
};
export default menus;
