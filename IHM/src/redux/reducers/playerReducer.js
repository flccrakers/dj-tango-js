const initialState = {
  currentTango:{path:''},
  currentTangoSong:null,
  playerEl:'',
  progress:0,

};
export default function reducer(state: menuReducer = initialState, action) {
  switch (action.type) {

    case"UPDATE_CURRENT_TANGO": {
      return {...state, currentTango: action.payload.tango, currentTangoSong:action.payload.song}
    }
    case"PROGRESS":{
      return{...state, progress:action.payload}
    }


    default: {
      return {...state};
    }
  }
}