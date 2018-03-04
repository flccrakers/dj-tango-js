import dialogTypeRef from '../../services/dialogTypeRef'

const initialState = {
  dialogType: dialogTypeRef.TANGO_DETAILS,
  showDialog: false,
  additionalData: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case"UPDATE_DIALOG_AND_SHOW": {
      return {
        ...state,
        showDialog: true,
        dialogType: action.payload.dialogType,
        additionalData: action.payload.additionalData
      };
    }
    case"CLOSE_DIALOG": {
      return {...state, showDialog: false,};
    }


    default: {
      return {...state};
    }
  }
}
