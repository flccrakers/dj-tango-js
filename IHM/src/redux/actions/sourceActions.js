import * as tangoDataManagement from '../../services/tangoDataManagement';
import {sortStatus as SORT} from "../../services/dj-const";

function receivedAllTangos(tangoList) {
  return {
    type: 'GET_ALL_TANGOS',
    payload: tangoList,
  }
}

export function fetchAllTangos() {
  return function (dispatch) {
    tangoDataManagement.getAllTangos().then((tangoList) => {
      // console.log(tangoList);
      dispatch(receivedAllTangos(tangoList));
    });
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
    console.log(status);
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
    console.log(field);
    console.log(datas[0][field]);
    console.log(typeof datas[0][field]);
    if (typeof datas[0][field] === 'string') {
      dispatch(sortStrings(datas, field, sortDirection));
    } else if (typeof datas[0][field] === 'number') {
      dispatch(sortNumbers(datas, field, sortDirection));
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
    type: 'GET_ALL_TANGOS',
    payload: datas,
  }
}

function sortNumbers(datas, field, sortDirection) {
  datas.sort((a, b) => {
    if (a[field]>b[field]){return 1}
    if (a[field]<b[field]){return -1}
    return 0;
  });
  if (sortDirection === SORT.DESC) {
    datas.reverse()
  }
  return {
    type: 'GET_ALL_TANGOS',
    payload: datas,
  }
}