export function addTango(tangoToAdd, tangoList){
  return function (dispatch) {
    let newTangoList = tangoList.concat(tangoToAdd);
    dispatch(updateTangoList(newTangoList))
  };
}

function updateTangoList(newTangoList){
  return{
    type:'UPDATE_TANGO_LIST',
    payload:newTangoList,
  }
}