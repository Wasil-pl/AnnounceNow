import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { adsReducer } from './adsRedux';
import initialState from './initialstate';

const subreducers = {
  ads: adsReducer,
};

// combine reducers
const rootReducer = combineReducers(subreducers);

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);

export default store;
