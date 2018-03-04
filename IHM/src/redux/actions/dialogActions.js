export function updateDialogAndShow(dialogType, additionalData = null) {
  let ret = {dialogType:dialogType, additionalData:additionalData};
  return {
    type: 'UPDATE_DIALOG_AND_SHOW',
    payload: ret,
  }
}

export function closeDialog() {
  return {
    type: 'CLOSE_DIALOG',
  }
}
