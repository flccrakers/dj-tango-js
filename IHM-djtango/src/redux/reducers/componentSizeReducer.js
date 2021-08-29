const initialState = {
  milongaSize: {height:600, width:600}, //value in pixel
  sourceSize: {height:600, width:600}//value in pixel
};
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case "persist/REHYDRATE": {
      if (action.payload !== undefined && action.payload.sizes !== undefined) {
        return {...state, list: action.payload.sizes}
      } else {
        return {...state}
      }
    }
    case"UPDATE_ALL_SIZE": {
      return {...state, milongaSize: action.payload.milongaSize, sourceSize: action.payload.sourceSize}
    }
    case"UPDATE_MILONGA_SIZE":{
      return {...state, milongaSize: action.payload}
    }
    case"UPDATE_SOURCE_SIZE":{
      return {...state, sourceSize: action.payload}
    }
    default: {
      return {...state};
    }
  }
}
