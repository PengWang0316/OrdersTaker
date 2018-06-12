import { FETCH_ALL_MENU_ITEM_SUCCESS } from '../actions/ActionTypes';

const menuItems = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_MENU_ITEM_SUCCESS:
      return action.menuItems;
    default:
      return state;
  }
};

export default menuItems;
