import { BASE_URL } from '../config';

// BASE_URL = ""; //Production server
export const API_BASE_URL = `${BASE_URL}/api/v1`;
export const API_FACEBOOK_LOGIN = `${API_BASE_URL}/auth/facebookLogin`;
export const API_GOOGLE_LOGIN = `${API_BASE_URL}/auth/googleLogin`;
export const API_JWTMESSAGE_VERIFY = `${API_BASE_URL}/jwtMessageVerify`;
export const API_USERNAME_PASSWORD_LOGIN = `${API_BASE_URL}/auth/usernamePasswordLogin`;
export const API_CHECK_USERNAME_AVAILABLE = `${API_BASE_URL}/auth/checkUsernameAvailable`;

export const API_FETCH_BASIC_INFORMATION = `${API_BASE_URL}/fetchBasicInformation`;
export const API_FETCH_ALL_MENU = `${API_BASE_URL}/fetchAllMenu`;
export const API_REGISTER_USER = `${API_BASE_URL}/auth/registerUser`;
export const API_LOGIN_WITH_PASSWORD = `${API_BASE_URL}/auth/loginWithPassword`;
export const API_ADD_ITEM_TO_ORDER = `${API_BASE_URL}/addItemToOrder`;
export const API_SAVE_PLACED_ORDER = `${API_BASE_URL}/savePlacedOrder`;
export const API_FETCH_ORDER_AMOUNT = `${API_BASE_URL}/fetchOrderAmount`;
export const API_FETCH_ORDERS = `${API_BASE_URL}/fetchOrders`;
export const API_FETCH_UNLOGIN_ORDERS = `${API_BASE_URL}/fetchUnloginOrders`;
export const API_LINK_ORDER_TO_ACCOUNT = `${API_BASE_URL}/linkOrderToAccount`;
export const API_FETCH_UNFINISHED_ORDERS = `${API_BASE_URL}/fetchUnfinishedOrders`;
export const API_UPDATE_FINISHED_ITEMS = `${API_BASE_URL}/updateFinishedItems`;
