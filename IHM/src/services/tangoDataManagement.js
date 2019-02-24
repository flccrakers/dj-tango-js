import * as serviceBase from './serviceBase';

export function getAllTangos() {
  return serviceBase.getJSON(`/tangos`, null);
}

export function addTango(tango: tangoDTO) {
  return serviceBase.postJSON(`/tangos`, tango, null);
}

export function getTangoFile(tangoId: string) {
  return serviceBase.getSongFile(`/get_tango_file`, tangoId);
}

// export {getAllTangos}