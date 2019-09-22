import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "./index.css";
import App1 from "./App1";
import { Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";


import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import * as reducers from './reducers'
import rootSaga from './sagas/index'

const reducer = combineReducers(reducers); // create reducers
const initialStore = {};


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialStore,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);



ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <App1 />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
