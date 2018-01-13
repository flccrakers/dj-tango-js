/**
 *
 * @param time {Number} the time of the song in milliseconds
 * @returns {String} the time of the song in string => mm:ss
 */
import * as colors from 'material-ui/colors';
export function millisToMinutesAndSeconds(time: Number) {

  let minutes = Math.floor(time / 60000);
  let seconds = ((time % 60000) / 1000).toFixed(0);
  return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

  // return retTime;
}

export function tangoColors(){
  let level = 900;
  let ret = {
    tango:colors.indigo[level],
    cortina:colors.brown[level],
    vals:colors.pink[level],
    milonga:colors.yellow[level],
    electro_tango:colors.indigo[500],
    tango_nuevo:colors.indigo[700],
    electro_vals:colors.pink[500],
    alter_vals:colors.pink[500],

  };

  return ret
}