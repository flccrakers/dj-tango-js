import {combineReducers} from "redux";
// import {persistCombineReducers } from 'redux-persist'
import source from "./sourceReducer";
import menu from './menuReducer';
import player from './playerReducer';

/*import inventory from "./inventoryReducer";
import labbook from "./labbookReducer";
import locale from "./localizeReducer";
import message from "./messageReducer";
import developmentReducer from "./developmentReducer";*/

export default combineReducers({
  source,
  menu,
  player,
});

