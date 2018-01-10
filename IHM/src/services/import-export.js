import * as tangoManager from './tangoDataManagement';
import * as menuActions from '../redux/actions/menuActions';

export function importTangosFromCsvFile(csvFile, dispatch) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    // reader.onLoad = importTangoCSVFile(this, resolve);
    reader.onload = function (progressEvent) {
      importTangoCSVFile(this.result.split("\n"), resolve, dispatch);
    };
    reader.readAsText(csvFile);

  });


}

function importTangoCSVFile(lines, resolve, dispatch) {
  console.log("I'm importing file");
  lines.forEach((line, index, table) => {
    if (index > 0) {
      line = line.split(',');
      //title, artist, album, type, year, bpmHuman, bpmFromFile, duration, path, tstart, tend,author, singer, composer, ID
      let tango: tango = {};
      tango.title = line[0];
      tango.artist = line[1];
      tango.album = line[2];
      tango.genre = line[3];
      tango.year = line[4];
      tango.bpmHuman = line[5];
      tango.bpmFromFile = line[6];
      tango.duration = line[7];
      tango.path = line[8];
      tango.start = line[9];
      tango.end = line[10];
      tango.author = line[11];
      tango.singer = line[12];
      tango.composer = line[13];
      tango.id = line[14];
      tango.fileSize=line[15];

      tangoManager.addTango(tango).then(() => {
        let remained = (index + 1) % 100;
        if (remained === 0 || index + 1 === table.length) {
          console.log((index + 1) / lines.length*100);
          dispatch(menuActions.updatePercentImport((index + 1) / table.length * 100));
        }
        if (index + 1 === table.length) {
          resolve();
        }
      });
    }



  });

}