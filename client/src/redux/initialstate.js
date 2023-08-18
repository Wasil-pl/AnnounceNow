const initialState = {
  ads: {
    loading: false,
    error: null,
    list: [],
    selectedAd: {},
  },

  user: {
    loading: false,
    error: null,
    logged: false,
    user: {},
  },
};

export default initialState;
