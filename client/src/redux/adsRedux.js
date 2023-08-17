import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllData = (state) => state.ads;
export const getLoadingState = (state) => state.ads.loading;
export const getErrorState = (state) => state.ads.error;

/* ACTIONS */
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

const createActionName = (actionName) => `api/ads/${actionName}`;
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_ADS = createActionName('LOAD_ADS');

/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const response = await httpClient.get(`${API_URL}/ads`);
      const data = await response.json();

      dispatch(loadAds(data));
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest({ message: error.message }));
    }
  };
};

/* REDUCER */
export const adsReducer = (statePart = { list: [], error: null, loading: false }, action) => {
  console.log('action:', action);
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, list: [...action.payload] };

    case START_REQUEST:
      return { ...statePart, loading: true, error: null };
    case END_REQUEST:
      return { ...statePart, loading: false, error: null };
    case ERROR_REQUEST:
      return { ...statePart, loading: false, error: action.payload.message };
    default:
      return statePart;
  }
};
