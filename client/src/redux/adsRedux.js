import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllData = (state) => state.ads.list;
export const getAdById = (state) => state.ads.selectedAd;
export const getLoadingState = (state) => state.ads.loading;
export const getErrorState = (state) => state.ads.error;
export const getSearchResult = (state) => state.ads.searchResult;

/* ACTIONS */
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const loadAd = (payload) => ({ payload, type: LOAD_AD });
export const searchAd = (payload) => ({ payload, type: SEARCH_AD });

const createActionName = (actionName) => `/api/ads/${actionName}`;
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_ADS = createActionName('LOAD_ADS');
const LOAD_AD = createActionName('LOAD_AD');
const SEARCH_AD = createActionName('SEARCH_AD');

/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/ads`);
      dispatch(loadAds(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const loadAdByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/ads/${id}`);
      dispatch(loadAd(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const searchAdRequest = (searchPhrase) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/ads/search/${searchPhrase}`);
      dispatch(searchAd(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

/* REDUCER */
export const adsReducer = (
  statePart = { list: [], selectedAd: {}, searchResult: [], error: null, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, list: [...action.payload] };

    case LOAD_AD:
      return { ...statePart, selectedAd: action.payload };

    case SEARCH_AD:
      return { ...statePart, searchResult: [...action.payload] };

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
