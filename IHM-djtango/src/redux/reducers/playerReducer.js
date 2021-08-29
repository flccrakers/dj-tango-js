const initialState = {
  currentTango:{path:''},
  currentTangoSong:null,
  playerEl:'',
  progress:0,
  volume:1,
  isPaused:true,

};
export default function reducer(state: menuReducer = initialState, action) {
  switch (action.type) {

    case"UPDATE_CURRENT_TANGO": {
      return {...state, currentTango: action.payload.tango, currentTangoSong:action.payload.song}
    }
    case"UPDATE_VOLUME":{
      return{...state, volume:action.payload}
    }
    case"PROGRESS":{
      return{...state, progress:action.payload}
    }
    case"UPDATE_PAUSE":{
      return{...state, isPaused:action.payload}
    }


    default: {
      return {...state};
    }
  }
}