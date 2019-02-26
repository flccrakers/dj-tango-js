import React from "react";
import dialogType from "../../services/dialogTypeRef";
import ImportDatabase from './import-database-dialog';
import DjTangoPreferences from './preferences-dialog';
import EditTango from './edit-sango-dialog';

export function generateDialogWithFactory(typeOfDialog, data) {
  switch (typeOfDialog) {
    case dialogType.EDIT_TANGO: {
      return (<EditTango data={data}/>)

    }
    case dialogType.IMPORT_DATABASE: {
      return (<ImportDatabase/>);
    }
    case dialogType.PREFERENCES: {
      return (<DjTangoPreferences/>);
    }
    default:
      return null;

  }
}