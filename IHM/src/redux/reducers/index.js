import {combineReducers} from "redux";
import source from "./sourceReducer";
import milonga from "./milongaReducer";
import menu from './menuReducer';
import player from './playerReducer';
import dialog from './dialogReducer';
import locale from './localizeReducer';
import sizes from './componentSizeReducer'

/*import inventory from "./inventoryReducer";
import labbook from "./labbookReducer";
import locale from "./localizeReducer";
import message from "./messageReducer";
import developmentReducer from "./developmentReducer";*/

export default combineReducers({
  source,
  milonga,
  menu,
  player,
  dialog,
  locale,
  sizes,
});

