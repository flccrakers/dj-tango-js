export function updateDialogAndShow(dialogType, additionalData = '') {
  let ret = {dialogType, additionalData}
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
