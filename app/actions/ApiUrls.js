import { BASE_URL } from '../config';

// BASE_URL = ""; //Production server
export const API_BASE_URL = `${BASE_URL}/api/v1`;
export const API_FACEBOOK_LOGIN = `${API_BASE_URL}/auth/facebookLogin`;
export const API_GOOGLE_LOGIN = `${API_BASE_URL}/auth/googleLogin`;
export const API_JWTMESSAGE_VERIFY = `${API_BASE_URL}/jwtMessageVerify`;
export const API_USERNAME_PASSWORD_LOGIN = `${API_BASE_URL}/auth/usernamePasswordLogin`;
export const API_CHECK_USERNAME_AVAILABLE = `${API_BASE_URL}/auth/checkUsernameAvailable`;
export const API_REGISTER_NEW_USER = `${API_BASE_URL}/auth/registerNewUser`;

export const API_FETCH_BASIC_INFORMATION = `${API_BASE_URL}/fetchBasicInformation`;