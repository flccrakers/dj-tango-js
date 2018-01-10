import * as tangoDataManagement from '../../services/tangoDataManagement';


function receivedAllTangos(tangoList){
  return{
    type:'GET_ALL_TANGOS',
    payload:tangoList,
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

