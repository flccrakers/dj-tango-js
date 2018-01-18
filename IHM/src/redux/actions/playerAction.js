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
      dispatch(updatePause(false));
      dispatch(updateTango(payload));

    });
  }

}

/**
 * Store the progress of the current tango
 * @param value in milliseconds
 */
export function progress(value) {

  return {
    type: 'PROGRESS',
    payload: value
  }

}

/*export function storePlayerEl(element) {
  return {
    type: 'STORE_PLAYER',
    payload: element,
  }
}*/

/*export function play(){
  this.getState().playerEl.play();
}*/

/*export function stop(player, duration){
  // return (dispatch, getState) => {
    let state = getState().player;
    console.log(state);
    plalyer.pause();
    // state.playerEl.currentTime = state.currentTango.duration / 1000;
    return{type:'DO_NOTHING'}
    // this.rap.audioEl.currentTime=this.props.playerData.currentTango.duration/1000;
  // }

}*/

export function updateVolume(newValue) {
  if (newValue < 0) newValue = 0;
  return {
    type: 'UPDATE_VOLUME',
    payload: newValue,
  }

}

export function saveAudioEl(audioEl) {
  return {
    type: 'SAVE_AUDIO_ELEMENT',
    payload: audioEl,
  }
}

export function updatePause(value){
  return{
    type:'UPDATE_PAUSE',
    payload:value,
  }
}