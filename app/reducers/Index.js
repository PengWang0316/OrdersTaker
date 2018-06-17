import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import basicInformation from './BasicInformationReducers';
import menus from './MenusReducers';
import menuItems from './MenuItemsReducers';
import user from './UserReducers';

export default combineReducers({
  basicInformation,
  menus,
  menuItems,
  user
});
