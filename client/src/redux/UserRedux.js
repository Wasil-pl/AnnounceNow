import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';

/* ACTIONS */
export const startUserRequest = (payload) => ({ payload, type: START_USER_REQUEST });
export const endUserRequest = (payload) => ({ payload, type: END_USER_REQUEST });
export const errorUserRequest = (payload) => ({ payload, type: ERROR_USER_REQUEST });
export const loadUser = (payload) => ({ payload, type: LOAD_USER });
export const registerUser = (payload) => ({ payload, type: REGISTER_USER });

const createActionName = (actionName) => `api/ads/${actionName}`;
const START_USER_REQUEST = createActionName('START_USER_REQUEST');
const END_USER_REQUEST = createActionName('END_USER_REQUEST');
const ERROR_USER_REQUEST = createActionName('ERROR_USER_REQUEST');
const LOAD_USER = createActionName('LOAD_USER');
const REGISTER_USER = createActionName('REGISTER_USER');

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

export const userReducer = (statePart = { user: {}, error: null, loading: false, logged: false }, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...statePart, user: action.payload };

    case REGISTER_USER:
      return { ...statePart, user: action.payload };

    case START_USER_REQUEST:
      return { ...statePart, loading: true, error: null };
    case END_USER_REQUEST:
      return { ...statePart, loading: false, error: null };
    case ERROR_USER_REQUEST:
      return { ...statePart, loading: false, error: action.payload.message };
    default:
      return statePart;
  }
};
