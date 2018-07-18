import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import basicInformation from './BasicInformationReducers';
import menus from './MenusReducers';
import menuItems from './MenuItemsReducers';
import user from './UserReducers';
import cart from './CartReducers';
import tempOrderIds from './TempOrderIdsReducers';

export default combineReducers({
  basicInformation,
  cart,
  menus,
  menuItems,
  tempOrderIds,
  user
});
