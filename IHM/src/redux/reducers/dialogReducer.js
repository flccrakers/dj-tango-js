import dialogTypeRef from '../../services/dialogTypeRef'

const initialState = {
  dialogType: dialogTypeRef.TANGO_DETAILS,
  open: false,
  additionalData: null,

};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case"UPDATE_DIALOG_AND_SHOW": {
      return {
        ...state,
        open: true,
        dialogType: action.payload.dialogType,
        additionalData: action.payload.additionalData
      };
    }
    case"CLOSE_DIALOG": {
      return {...state, open: false,};
    }


    default: {
      return {...state};
    }
  }
}
