import { httpClient } from '../api/httpClient';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllAds = (state) => state.ads;

/* ACTIONS */
export const fetchAdsSuccess = (payload) => ({ type: FETCH_ADS_SUCCESS, payload });

const createActionName = (actionName) => `api/ads/${actionName}`;
const FETCH_ADS_SUCCESS = createActionName('FETCH_ADS_SUCCESS');

/* REDUCER */
export const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case FETCH_ADS_SUCCESS:
      return { ...statePart, ads: [...action.payload] };

    default:
      return statePart;
  }
};

export const fetchAds = () => {
  return (dispatch) => {
    httpClient
      .get(`${API_URL}/ads`)
      .then((res) => res.json())
      .then((data) => dispatch(fetchAdsSuccess(data)));
  };
};
