const initialState = {
  currentTango:{path:''},
  currentTangoSong:null,
  playerEl:'',
  progress:0,
  volume:1,

};
export default function reducer(state: menuReducer = initialState, action) {
  switch (action.type) {

    case"UPDATE_CURRENT_TANGO": {
      return {...state, currentTango: action.payload.tango, currentTangoSong:action.payload.song}
    }
    /*case"SAVE_AUDIO_EL":{
      return{...state, playerEl:action.payload}
    }*/
    /*case"DO_NOTHNG":{
      return{...state}
    }*/
    case"UPDATE_VOLUME":{
      return{...state, volume:action.payload}
    }
    case"PROGRESS":{
      return{...state, progress:action.payload}
    }


    default: {
      return {...state};
    }
  }
}