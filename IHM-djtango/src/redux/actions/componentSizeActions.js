export function updateMilongaSize(newSize: sizeDTO) {
  return {
    type: 'UPDATE_MILONGA_SIZE',
    payload: newSize,
  }
}

export function updateSourceSize(newSize: sizeDTO) {
  return {
    type: 'UPDATE_SOURCE_SIZE',
    payload: newSize,
  }
}

export function updateAllSize(milongaSize: sizeDTO, sourceSize: sizeDTO) {
  let payload = {milongaSize, sourceSize}
  return {
    type: 'UPDATE_ALL_SIZE',
    payload

  }

}

