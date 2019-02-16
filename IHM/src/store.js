import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from "./redux/reducers";
import localForage from "localforage";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './redux/reducers/index';

// const middleware = applyMiddleware(promise(), thunk, createLogger());
//const locales = localeReducer("en", loc).default;
// let store = createStore(reducer, middleware);
// persistStore(store, {storage:localForage});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default()=>{
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor }
}
