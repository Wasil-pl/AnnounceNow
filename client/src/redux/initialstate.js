const initialState = {
  ads: {
    success: false,
    loading: false,
    error: null,
    list: [],
    selectedAd: null,
    searchResult: [],
    userAds: [],
  },

  user: {
    loading: false,
    error: null,
    user: null,
  },
};

export default initialState;
