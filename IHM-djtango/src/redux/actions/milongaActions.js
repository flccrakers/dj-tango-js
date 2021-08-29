export function addTango(tangoToAdd, tangoList) {
  return function (dispatch) {
    let newTangoList = tangoList.concat(tangoToAdd);
    dispatch(updateTangoList(newTangoList))
  };
}

function updateTangoList(newTangoList) {
  return {
    type: 'UPDATE_TANGO_LIST',
    payload: newTangoList,
  }
}

export function dropTangos(indexToDrop, tangoListToDrop, currentTangoList) {
  return function (dispatch) {
    let newTangoList = currentTangoList.slice();
    let start = indexToDrop;
    tangoListToDrop.forEach(tango => {
      newTangoList.splice(start, 1, tango);
      start += 1;
    });
    // newTangoList.splice(indexToDrop, indexToDrop.length, tangoListToDrop);
    console.log(newTangoList);
    dispatch(updateTangoList(newTangoList));
  }
}

export function clearMilonga() {
  return function (dispatch) {
    dispatch(updateTangoList([]));
  }

}