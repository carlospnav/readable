import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { posts } from './reducers';
import './index.css';

const preloadedState = {
  ui: {
    posts: {
      isFetching: false,
      lastUpdated: 0
    },
    comments: {
      isFetching: false,
      lastUpdated: 0
    }
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  posts,
  preloadedState,
  composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
