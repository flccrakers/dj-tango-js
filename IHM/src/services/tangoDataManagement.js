import * as serviceBase from './serviceBase';

export function getAllTangos() {
  return serviceBase.getJSON(`/tangos`, null);
}

export function addTango(tangoDTO:tango){
  return serviceBase.postJSON(`/tangos`, tangoDTO, null );
}

export function getTangoFile(tangoId:string){
  return serviceBase.getSongFile(`/tango/download/`,tangoId);
}

// export {getAllTangos}