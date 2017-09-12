import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const preloadedState = {
  ui: {
    posts: {
      isFetching: false,
      lastUpdated: 0
    },
    comments: {
      isFetching: false,
      lastUpdated: 0
    },
    categories: {
      isFetching: false,
      lastUpdated: 0
    }
  },
  posts: {},
  comments: {},
  categories: {},
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
  applyMiddleware(thunk)
));

export default store;