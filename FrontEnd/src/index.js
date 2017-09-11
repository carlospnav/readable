import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
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
  },
  posts: {},
  comments: {},
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
  applyMiddleware(thunk)
));

// ReactDOM.render(
//   <BrowserRouter>
//     {/* <Provider store={store}> */}
//       <App />
//     {/* </Provider> */}
//   </BrowserRouter>, document.getElementById('root'));

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, document.getElementById('root'));
