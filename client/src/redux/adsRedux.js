import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';
import { endUserRequest } from './UserRedux';

/* SELECTORS */
export const getAllData = (state) => state.ads.list;
export const getAdById = (state) => state.ads.selectedAd;
export const getLoadingState = (state) => state.ads.loading;
export const getErrorState = (state) => state.ads.error;
export const getSearchResult = (state) => state.ads.searchResult;
export const getUserAds = (state) => state.ads.userAds;

/* ACTIONS */
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const loadAd = (payload) => ({ payload, type: LOAD_AD });
export const searchAd = (payload) => ({ payload, type: SEARCH_AD });
export const userAds = (payload) => ({ payload, type: USER_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD_REQUEST });
export const editAd = (payload) => ({ payload, type: EDIT_AD_REQUEST });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD_REQUEST });

const createActionName = (actionName) => `/api/ads/${actionName}`;
const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const LOAD_ADS = createActionName('LOAD_ADS');
const LOAD_AD = createActionName('LOAD_AD');
const SEARCH_AD = createActionName('SEARCH_AD');
const USER_ADS = createActionName('USER_ADS');
const ADD_AD_REQUEST = createActionName('ADD_AD_REQUEST');
const EDIT_AD_REQUEST = createActionName('EDIT_AD_REQUEST');
const DELETE_AD_REQUEST = createActionName('DELETE_AD_REQUEST');

/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/ads`);
      dispatch(loadAds(data));
      dispatch(endRequest());
      dispatch(endUserRequest());
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

export const userAdsRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.get(`${API_URL}/api/ads/seller/${id}`);
      dispatch(userAds(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const addAdRequest = (formData) => {
  console.log('formData:', formData);
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.post(`${API_URL}/api/ads`, formData);
      console.log('data:', data);
      dispatch(addAd(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const editAdRequest = (formData, id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const data = await httpClient.put(`${API_URL}/api/ads/${id}`, formData);
      console.log('data:', data);
      dispatch(editAd(data));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

export const deleteAdRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      await httpClient.delete(`${API_URL}/api/ads/${id}`);
      dispatch(deleteAd(id));
      dispatch(endRequest());
    } catch (error) {
      const action = errorRequest({ message: error.message });
      dispatch(action);
    }
  };
};

/* REDUCER */
export const adsReducer = (
  statePart = {
    list: [],
    selectedAd: null,
    searchResult: [],
    userAds: [],
    error: null,
    loading: false,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, list: [...action.payload] };

    case LOAD_AD:
      return { ...statePart, selectedAd: action.payload };

    case SEARCH_AD:
      return { ...statePart, searchResult: [...action.payload] };

    case USER_ADS:
      return { ...statePart, userAds: [...action.payload] };

    case ADD_AD_REQUEST:
      console.log('action.payload:', action.payload);
      return {
        ...statePart,
        list: [...statePart.list, action.payload],
      };

    case EDIT_AD_REQUEST:
      return {
        ...statePart,
        list: statePart.list.map((ad) => (ad._id === action.payload._id ? action.payload : ad)),
      };

    case DELETE_AD_REQUEST:
      return { ...statePart, list: statePart.list.filter((ad) => ad._id !== action.payload) };

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
