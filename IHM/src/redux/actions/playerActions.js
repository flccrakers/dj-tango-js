import * as tangoDataManagement from '../../services/tangoDataManagement';


function updateTango(payload) {
  return {
    type: 'UPDATE_CURRENT_TANGO',
    payload,
  }

}

export function updateCurrentTango(tango: tango, enqueueSnackbar) {
  return function (dispatch) {
    tangoDataManagement.getTangoFile(tango._id).then(tangoFile => {
      // console.log(tangoFile);
      // console.log(typeof tangoFile);
      if (typeof tangoFile === "string" && tangoFile !== undefined) {
        dispatch(updateTheSong(tango, tangoFile))
      } else if (typeof tangoFile === "object" || tangoFile === undefined) {
        let variant = 'error';
        if (tangoFile !== undefined) {
          enqueueSnackbar(tangoFile.GeneralException, {variant});
        } else {
          enqueueSnackbar("The file for \"" + tango.title + "\" is undefined", {variant});
          // (console.error("The tango file is undefined"));
        }
        dispatch(updateTheSong(tango, undefined                                             ));
      }
    });
  }
}

function updateTheSong(tango, tangoFile) {
  console.log(tangoFile);
  return function (dispatch) {
    let payload = {
      tango: tango,
      song: tangoFile,
    };
    dispatch(updatePause(false));
    dispatch(updateTango(payload));
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

export function updatePause(value) {
  return {
    type: 'UPDATE_PAUSE',
    payload: value,
  }
}