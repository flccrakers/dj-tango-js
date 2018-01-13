const initialState={
  tangoList:[],
};
export default function reducer(state=initialState, action) {
  switch (action.type) {
    case "GET_ALL_TANGOS": {
      console.log('in reducer tango');
      return {...state, tangoList: action.payload};
    }
    case "persist/REHYDRATE": {
      return {...state, tangoList: action.payload.source.tangoList}
    }
    default: {
      return {...state};
    }
  }
}
