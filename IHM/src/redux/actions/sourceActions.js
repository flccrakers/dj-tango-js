import * as tangoDataManagement from '../../services/tangoDataManagement';


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

export function updateSortStatus(field, status) {
  console.log(status);
  if (status === 2) {
    status = 0
  }
  else {
    status = status + 1;
  }
  return {
    type: 'UPDATE_SORT_STATUS',
    payload: {field, status}
  }

}

