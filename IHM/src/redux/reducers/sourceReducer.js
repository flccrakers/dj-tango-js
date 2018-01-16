import {sortStatus as SORT} from '../../services/dj-const';

const initialState = {
  tangoList: [],
  isImporting: false,
  listRowHeight: 25,
  overscanRowCount: 10,
  showScrollingPlaceholder: false,
  useDynamicRowHeight: false,
  sortingField: '',
  sortingStatus: SORT.NONE,
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
      return {...state, sortingField: action.payload.field, sortingStatus: action.payload.status}
    }

    default: {
      return {...state};
    }
  }
}
