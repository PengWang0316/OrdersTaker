import axios from 'axios';

import { API_FETCH_ALL_MENU } from './ApiUrls';
import { FETCH_ALL_MENU_SUCCESS, FETCH_ALL_MENU_ITEM_SUCCESS } from './ActionTypes';

const fetchAllMenuSuccess = data => ({
  type: FETCH_ALL_MENU_SUCCESS,
  menus: data
});

/**
 * Put the menu items to an object
 * @param {array} data is an array that contains all menu information.
 * @return {object} Return all menu item. { id: xxx, { otherInformationA: xxx, ... }j, ... }
 * */
const fetchAllMenuItemSuccess = data => {
  const menuItems = {};
  data.forEach(element =>
    element.items.forEach(item => {
      menuItems[item._id] = item;
    }));
  return {
    type: FETCH_ALL_MENU_ITEM_SUCCESS,
    menuItems
  };
};

export const fetchAllMenu = () =>
  dispatch => axios.get(API_FETCH_ALL_MENU)
    .then(({ data }) => {
      dispatch(fetchAllMenuSuccess(data));
      dispatch(fetchAllMenuItemSuccess(data));
    }).catch(err => console.error(err));

export default fetchAllMenu;
