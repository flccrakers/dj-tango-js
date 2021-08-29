import * as serviceBase from './serviceBase';

export function getPreferences() {
  return serviceBase.getJSON(`/preferences`, null);
}

export function updatePreferences(preferences: preferencesDTO) {
  return serviceBase.postJSON(`/preferences`, preferences, null);
}

export function getTangoFile(tangoId: string) {
  // return serviceBase.getSongFile(`/tango/download/`,tangoId);
}

// export {getAllTangos}