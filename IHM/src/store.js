import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import localForage from "localforage";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './redux/reducers';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(promise, thunk, createLogger());

export default()=>{
  let store = createStore(persistedReducer,middleware);
  let persistor = persistStore(store);
  return { store, persistor }
}
