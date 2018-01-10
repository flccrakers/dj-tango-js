/**
 *
 * @param time {Number} the time of the song in milliseconds
 * @returns {String} the time of the song in string => mm:ss
 */

export function millisToMinutesAndSeconds(time: Number) {

  let minutes = Math.floor(time / 60000);
  let seconds = ((time % 60000) / 1000).toFixed(0);
  return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);

  // return retTime;
}