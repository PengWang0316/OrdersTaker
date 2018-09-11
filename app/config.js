export const JWT_MESSAGE = 'OrdersTaker_JWT';
export const ADMINISTRATOR_ROLE = 1;
export const SUPER_USER_ROLE = 2;
export const NORMAL_USER_ROLE = 3;
// export const BASE_URL = 'https://orders-taker.glitch.me'; // Development server
// export const BASE_URL = 'https://orderstaker.kevin-project.com:8081'; // Development server on the AWS
export const BASE_URL = 'https://orderstaker.kevin-project.com:8080'; // Production server
// export const SOCKETIO_URL = 'https://orderstaker.kevin-project.com:3001';
export const SOCKETIO_URL = 'https://orderstaker.kevin-project.com:3000'; // Production server

export const CLOUDINARY_UPLOAD_PRESET = 'OrdersTakerWebApp'; // The preset of Cloudinary.
export const LOGIN_CALLBACK_URL = 'OrdersTaker_loginCallbackUrl';

export const ITEM_ONE_PRICE_KEY = '_onePrice';
export const MAX_ORDER_AMOUNT = 6; // How many orders will show in the one page
export const ORDER_STATUS_FINISHED = 'Finished';
export const ORDER_STATUS_RECEIVED = 'Received';
export const ORDER_STATUS_PREPARING = 'Preparing';

/* Lazy image loading */
export const LAZY_IMAGE_CLASS = 'lazyImage';
export const IMAGE_PLACEHOLDER_URL = 'https://res.cloudinary.com/orderstaker/image/upload/v1536616770/others/PlaceHolder.png';

/* URLS */
export const HOME_PAGE_URL = '/';
export const LOGIN_REDIRECT_RUL = '/loginRedirect';
export const CART_PAGE_URL = '/cartPage';
export const ORDERS_PAGE_URL = '/ordersPage';
export const KITHEN_INTERFACE_PAGE_URL = '/kithenInterfacePage';

/* Socket IO events */
export const SOCKETIO_EVENT_ADD_NEW_ORDER = 'socketioEventAddNewOrder';
export const SOCKETIO_EVENT_UPDATE_ORDER_ITEM = 'socketioEventUpdateOrderItem';
