import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import Articles from './components/Articles/Articles';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import statsReducer from './store/reducers/stats';
import articlesReducer from './store/reducers/articles';
import tweetsReducer from './store/reducers/tweets';
import statusReducer from './store/reducers/status';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  status: statusReducer,
  stats: statsReducer,
  news: articlesReducer,
  tweets: tweetsReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
    {/* <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/help-links" component={Articles} />
      <Redirect to="/" />
    </BrowserRouter> */}
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
