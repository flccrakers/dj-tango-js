import * as importExportServices from '../../services/import-export';
import * as sourceActions from './sourceActions';

export function updatePercentImport(value) {
  return {
    type: 'UPDATE_ACHIEVEMENT',
    payload: value,
  }
}

function setTangoImportPending(fileName) {
  return {
    type: 'IMPORT_TANGO_PENDING',
    payload: fileName,
  }
}

function tangoImportFulfilled(){
  return{
    type:'IMPORT_TANGO_FULFILL',
  }
}

export function importTangosFromCSVFile(csvFile) {
  return function (dispatch) {
    dispatch(setTangoImportPending({name: csvFile.name, startPercent: 0.1}));
    importExportServices.importTangosFromCsvFile(csvFile, dispatch).then(() => {
      dispatch(sourceActions.fetchAllTangos());
      dispatch(tangoImportFulfilled());

    });
  }

}
