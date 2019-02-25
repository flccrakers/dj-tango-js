/**
 *
 * @param time {Number} the time of the song in milliseconds
 * @returns {String} the time of the song in string => mm:ss
 */
// import * as colors from '@material-ui/core/colors';
import colorManipulator from '../services/color-manipulator';

export function millisToMinutesAndSeconds(time: Number) {

  let minutes = Math.floor(time / 60000);
  let seconds = ((time % 60000) / 1000).toFixed(0);
  return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

  // return retTime;
}

export function getTangoColors() {
  // let level = 900;
  let ret = {
    tango: colorManipulator.fade('#00a0b0',0.31),
    cortina: colorManipulator.fade('#6a4a3c',0.31),
    vals: colorManipulator.fade('#cc333f',0.31),
    milonga: colorManipulator.fade('#edc951',0.31),
    electro_tango: '#00a0b0',
    electro_milonga: '#edc951',
    tango_nuevo: colorManipulator.fade('#00a0b0',0.196),
    electro_vals: colorManipulator.fade('#cc333f',0.2),
    alter_vals: colorManipulator.fade('#cc333f',0.58),
    alter_milonga: colorManipulator.fade('#edc951',0.58),
    alter_tango: colorManipulator.fade('#00a0b0',0.58),


  };

  return ret
}