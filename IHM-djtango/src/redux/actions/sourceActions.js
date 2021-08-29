import * as tangoDataManagement from '../../services/tangoDataManagement';
import {sortStatus as SORT} from "../../services/dj-const";

function receivedAllTangos(tangoList) {
  return {
    type: 'GET_ALL_TANGOS',
    payload: tangoList,
  }
}

function updateDisplayTangosList(tangoList) {
  return {
    type: 'UPDATE_DISPLAY_TANGO_LIST',
    payload: tangoList,
  }
}

export function fetchAllTangos(resetDisplayList = false) {
  return function (dispatch) {

    tangoDataManagement.getAllTangos().then((tangoList) => {
      dispatch(generateFilterList(['artist', 'singer', 'album', 'genre',], tangoList));
      dispatch(receivedAllTangos(tangoList));
      if (resetDisplayList === true) {
        dispatch(updateDisplayTangosList(tangoList));
      }
    });
  }
}

function generateFilterList(fields, tangoList) {

  let ret = {};
  fields.forEach(field => {
    ret[field] = [];
  });
  // if this.props.source.tangoList

  tangoList.forEach((tango => {
    fields.forEach(field => {

      if (!ret[field].some(element => {
          return element === tango[field]
        })) {
        ret[field].push(tango[field]);
      }
    })
  }));
  fields.forEach(field => {
    ret[field] = ret[field].sort();
  });
  fields.forEach(field => {
    ret[field].unshift(('select - ' + field).toUpperCase());
  });

  return {
    type: 'UPDATE_FILTER_LIST',
    payload: ret,
  }
}


function updateSortStatus(field, status) {
  return {
    type: 'UPDATE_SORT_STATUS',
    payload: {field, status}
  }
}

export function updateSortStatusAndSort(field, status, data) {
  return function (dispatch) {
    console.log('status:' + status);
    if (status === 2) {
      status = 0
    }
    else {
      status = status + 1;
    }
    dispatch(updateSortStatus(field, status));
    dispatch(sortDatas(data, field, status));

  }
}

export function sortDatas(datas, field, sortDirection) {
  return function (dispatch) {
    if (typeof datas[0][field] === 'string') {
      dispatch(sortStrings(datas, field, sortDirection));
    } else if (typeof datas[0][field] === 'number') {
      dispatch(sortNumbers(datas, field, sortDirection));
    } else if (field === '') {
      // console.log("there si no sorting filter");
      dispatch(updateDisplayTangosList(datas));
    }
  }
}

function sortStrings(datas, field, sortDirection) {
  datas.sort((a, b) => {
    return a[field].localeCompare(b[field]);
  });
  if (sortDirection === SORT.DESC) {
    datas.reverse()
  }
  return {
    type: 'UPDATE_DISPLAY_TANGO_LIST',
    payload: datas,
  }
}

export function updateCurrentIndex(index) {
  return {
    type: 'UPDATE_CURRENT_INDEX',
    payload: index,
  }
}

function tangoIndexInCurrentSelected(index, currentSelected){
  return currentSelected.findIndex(element=>{return element === index})
}
/**
 *
 * @param index: number[] -> the index array to add to the table
 * @param currentSelectedIndex -> the current table
 * @param shouldAdd:boolean -> if true should add, else empty the table and replace by the index array
 */
export function updateSelectedTangoIndex(index, currentSelectedIndex, shouldAdd){
  let newSelectedIndex = currentSelectedIndex.slice();
  index.forEach(id =>{
    let indexOfTango = tangoIndexInCurrentSelected(id, currentSelectedIndex);
    if (indexOfTango === -1){
      if(shouldAdd === true){
        newSelectedIndex.push(id);
      } else{
        newSelectedIndex = [id,];
      }
    }else{
      currentSelectedIndex.splice(indexOfTango,1);
      newSelectedIndex = currentSelectedIndex.slice();
    }
  });

  return{
    type:'UPDATE_SELECTED_TANGO_INDEX',
    payload:newSelectedIndex,
  }

}


function shuffle(arrayToShuffle) {
  for (let i = arrayToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
  }
  return arrayToShuffle;
}

export function shuffleTangoList(tangoList) {
  return function (dispatch) {
    dispatch(updateDisplayTangosList(shuffle(tangoList)));
  }
}

function sortNumbers(datas, field, sortDirection) {
  datas.sort((a, b) => {
    if (a[field] > b[field]) {
      return 1
    }
    if (a[field] < b[field]) {
      return -1
    }
    return 0;
  });
  if (sortDirection === SORT.DESC) {
    datas.reverse()
  }
  return {
    type: 'UPDATE_DISPLAY_TANGO_LIST',
    payload: datas,
  }
}

export function filterTangoList(selectedIndex, filterList, tangoList: tango[], sortingDatas: sortingDataDTO) {
  return function (dispatch) {
    let fieldToSearch = {};
    Object.keys(selectedIndex).forEach(key => {
      if (selectedIndex[key] > 0) {
        console.log(filterList[key][selectedIndex[key]]);
        fieldToSearch[key] = filterList[key][selectedIndex[key]];
      }
    });

    let newTangoList = tangoList.filter((tango => {

      let ret = true;
      Object.keys(fieldToSearch).forEach(key => {
        if (fieldToSearch[key] !== tango[key]) {
          ret = false;
        }

      });
      return ret

    }));
    dispatch(sortDatas(newTangoList, sortingDatas.sortingField, sortingDatas.sortingDirection))
  }
}

export function updateFilter(anchorEl, selectedIndex) {


  return {
    type: "UPDATE_FILTER",
    payload: {anchorEl, selectedIndex}
  }

}

export function updateAnchorState(anchorEl) {
  console.log('should update anchor states');
  return {
    type: "UPDATE_ANCHOR_STATE",
    payload: anchorEl,
  }

}

function clearFilterFullfill(filter) {

  return {
    type: "UPDATE_FILTER",
    payload: filter,
  }
}

export function clearFilter(filterList, tangoList: tango[], sortingDatas: sortingDataDTO) {
  return function (dispatch) {
    let filter = {
      anchorEl: {artist: null, album: null, singer: null, genre: null},
      selectedIndex: {artist: 0, album: 0, singer: 0, genre: 0},
    };
    dispatch(clearFilterFullfill(filter));
    dispatch(filterTangoList(filter.selectedIndex, filterList, tangoList, sortingDatas));
    dispatch(generateFilterList(['artist', 'singer', 'album', 'genre',], tangoList));


  }


}