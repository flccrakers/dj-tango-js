import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import './index.css';
import storeConfiguration from './store';

const {store, persistor} = storeConfiguration();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
