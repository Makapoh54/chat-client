import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import rootSaga from './sagas';
import ChatWebSocketConnection from './sockets/ChatWebSocketConnection';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

const socket = new ChatWebSocketConnection('ws://localhost:8080', store.dispatch);

sagaMiddleware.run(rootSaga, { socket });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
