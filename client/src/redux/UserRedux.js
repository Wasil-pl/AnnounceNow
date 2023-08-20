import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';

/* SELECTORS */
export const getUserData = (state) => state.user;
export const getUserAvatar = (state) => state.user.user?.avatar;
export const getUserAvatarFromLocalStorage = () => {
  const avatar = localStorage.getItem('loginAvatar');
  return avatar ? JSON.parse(avatar) : 'false';
};
export const getUserLoadingState = (state) => state.user.loading;
export const getUserErrorState = (state) => state.user.error;
export const getUserLoggedState = (state) => state.user.logged;

/* ACTIONS */
export const startUserRequest = (payload) => ({ payload, type: START_USER_REQUEST });
export const endUserRequest = (payload) => ({ payload, type: END_USER_REQUEST });
export const endLoginUserRequest = (payload) => ({ payload, type: END_LOGIN_USER_REQUEST });
export const endLogoutUserRequest = (payload) => ({ payload, type: END_LOGOUT_USER_REQUEST });
export const errorUserRequest = (payload) => ({ payload, type: ERROR_USER_REQUEST });
export const loadUser = (payload) => ({ payload, type: LOGIN_USER });
export const logoutUser = (payload) => ({ payload, type: LOGOUT_USER });
export const registerUser = (payload) => ({ payload, type: REGISTER_USER });
export const changeUserState = (payload) => ({ payload, type: CHANGE_USER_STATE });

const createActionName = (actionName) => `api/ads/${actionName}`;
const START_USER_REQUEST = createActionName('START_USER_REQUEST');
const END_USER_REQUEST = createActionName('END_USER_REQUEST');
const END_LOGIN_USER_REQUEST = createActionName('END_LOGIN_USER_REQUEST');
const END_LOGOUT_USER_REQUEST = createActionName('END_LOGOUT_USER_REQUEST');
const ERROR_USER_REQUEST = createActionName('ERROR_USER_REQUEST');
const LOGIN_USER = createActionName('LOGIN_USER');
const LOGOUT_USER = createActionName('LOGOUT_USER');
const REGISTER_USER = createActionName('REGISTER_USER');
const CHANGE_USER_STATE = createActionName('CHANGE_USER_STATE');

/* THUNKS */
export const addUserRequest = (FormData) => {
  return async (dispatch) => {
    dispatch(startUserRequest());
    try {
      const data = await httpClient.post(`${API_URL}/auth/register`, FormData);
      dispatch(registerUser(data));
      dispatch(endUserRequest());
    } catch (error) {
      const action = errorUserRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const loginUserRequest = (user) => {
  return async (dispatch) => {
    dispatch(startUserRequest());
    try {
      const data = await httpClient.post(`${API_URL}/auth/login`, user);
      dispatch(loadUser(data));
      dispatch(getUserRequest());
      dispatch(endLoginUserRequest());
    } catch (error) {
      const action = errorUserRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const getUserRequest = () => {
  return async (dispatch) => {
    dispatch(startUserRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/user`);
      dispatch(loadUser(data));
      const storageData = data.avatar;
      localStorage.setItem('loginAvatar', JSON.stringify(storageData));
      dispatch(endUserRequest());
    } catch (error) {
      const action = errorUserRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const logoutUserRequest = () => {
  return async (dispatch) => {
    dispatch(startUserRequest());
    try {
      await httpClient.post(`${API_URL}/auth/logout`);
      dispatch(loadUser());
      localStorage.removeItem('loginAvatar');
      dispatch(endLogoutUserRequest());
    } catch (error) {
      const action = errorUserRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const userReducer = (statePart = { user: null, error: null, loading: false }, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...statePart, user: action.payload };

    case REGISTER_USER:
      return { ...statePart, user: action.payload };

    case LOGOUT_USER:
      return { ...statePart, user: null, logged: false };

    case CHANGE_USER_STATE:
      return { ...statePart, logged: true };

    case START_USER_REQUEST:
      return { ...statePart, loading: true, error: null };
    case END_USER_REQUEST:
      return { ...statePart, loading: false, error: null };
    case END_LOGIN_USER_REQUEST:
      return { ...statePart, loading: false, error: null, logged: true };
    case END_LOGOUT_USER_REQUEST:
      return { ...statePart, loading: false, error: null, logged: false };
    case ERROR_USER_REQUEST:
      return { ...statePart, loading: false, error: action.payload.message };
    default:
      return statePart;
  }
};
