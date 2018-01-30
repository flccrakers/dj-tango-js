import {sortStatus as SORT} from '../../services/dj-const';

const initialState = {
  tangoList: [],
  displayTangoList: [],
  isImporting: false,
  listRowHeight: 25,
  overscanRowCount: 10,
  showScrollingPlaceholder: false,
  useDynamicRowHeight: false,
  currentIndex: 0,
  sortingDatas: {
    sortingField: '',
    sortingDirection: SORT.NONE,
  },

  anchorEl: {artist: null, album: null, singer: null, genre: null},
  selectedIndex: {artist: 0, album: 0, singer: 0, genre: 0},
  filterList: null,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_TANGOS": {
      // console.log('in reducer tango');
      return {...state, tangoList: action.payload};
    }
    case "persist/REHYDRATE": {
      if (action.payload.source) {
        return {...state, tangoList: action.payload.source.tangoList}
      } else {
        return {...state}
      }
    }
    case"UPDATE_SORT_STATUS": {
      let sortingDatas = {
        sortingField: action.payload.field,
        sortingDirection: action.payload.status
      };
      return {...state, sortingDatas}
    }
    case"UPDATE_CURRENT_INDEX": {
      return {...state, currentIndex: action.payload}
    }
    // case"SHUFFLE": {
    //   return {...state, displayTangoList: action.payload}
    // }
    case"UPDATE_ANCHOR_STATE": {
      // return{...state, anchorEl:action.payload}
      return {...state}
    }
    case"UPDATE_FILTER": {
      return {...state, anchorEl: action.payload.anchorEl, selectedIndex: action.payload.selectedIndex}
    }
    case"UPDATE_FILTER_LIST": {
      return {...state, filterList: action.payload}
    }
    case'UPDATE_DISPLAY_TANGO_LIST': {
      return {...state, displayTangoList: action.payload}
    }


    default: {
      return {...state};
    }
  }
}
