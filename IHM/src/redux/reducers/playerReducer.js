const initialState = {
  currentTango:{path:''},
  currentTangoSong:null,
  playerEl:''

};
export default function reducer(state: menuReducer = initialState, action) {
  switch (action.type) {

    case"UPDATE_CURRENT_TANGO": {
      return {...state, currentTango: action.payload.tango, currentTangoSong:action.payload.song}
    }


    default: {
      return {...state};
    }
  }
}