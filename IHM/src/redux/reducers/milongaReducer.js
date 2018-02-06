import {sortStatus as SORT} from '../../services/dj-const';

const initialState = {
  list: [],
  listRowHeight: 25,
  overscanRowCount: 10,
  showScrollingPlaceholder: false,
  useDynamicRowHeight: false,
  currentIndex: 0,
  selectedTangos: [],
  indexToDrop:0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "persist/REHYDRATE": {
      if (action.payload.milonga !== undefined) {
        return {...state, list: action.payload.milonga.list}
      } else {
        return {...state}
      }
    }
    case"UPDATE_TANGO_LIST":{
      return {...state, list:action.payload}
    }
    default: {
      return {...state};
    }
  }
}
