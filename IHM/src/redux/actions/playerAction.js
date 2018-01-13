import * as tangoDataManagement from '../../services/tangoDataManagement';


function updateTango(payload) {
  return {
    type: 'UPDATE_CURRENT_TANGO',
    payload,
  }

}
export function updateCurrentTango(tango) {
  return function (dispatch) {
    tangoDataManagement.getTangoFile(tango._id).then(tangoFile => {

      let payload = {
        tango: tango,
        song: tangoFile,
      };
      console.log(payload);
      dispatch(updateTango(payload));

    });
  }

}

/**
 * Store the progress of the current tango
 * @param value in milliseconds
 */
export function progress(value){

  return{
    type:'PROGRESS',
    payload:value
  }

}

export function storePlayerEl(element) {
  return {
    type: 'STORE_PLAYER',
    payload: element,
  }
}

export function play(){
  this.getState().playerEl.play();
}