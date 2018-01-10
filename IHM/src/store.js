import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {autoRehydrate,persistStore} from 'redux-persist'
import reducer from "./redux/reducers"
import localForage from "localforage";


const middleware = applyMiddleware(promise(), thunk, createLogger())
//const locales = localeReducer("en", loc).default;
let store = createStore(reducer, middleware, autoRehydrate());
persistStore(store, {storage:localForage});


//export default createStore(reducer, middleware, autoRehydrate())
export default store;
