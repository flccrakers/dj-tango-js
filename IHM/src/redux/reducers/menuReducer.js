const initialState = {
  isImporting: false,
  importedFile: '',
  percentEnded: 0,
  // isImportedDetirmined: false,
};
export default function reducer(state: menuReducer = initialState, action) {
  switch (action.type) {

    // case "IMPORT_TANGO": {
    //   return {...state, tangoList: action.payload};
    // }
    case"UPDATE_ACHIEVEMENT": {
      return {...state, percentEnded: action.payload}
    }
    case "IMPORT_TANGO_PENDING": {
      return {...state, isImporting: true, importedFile: action.payload.name, percentEnded:action.payload.startPercent};
    }
    case "IMPORT_TANGO_FULFILL": {
      return {...state, isImporting: false, percentEnded:0};
    }

    default: {
      return {...state};
    }
  }
}