import React from "react";
import dialogType from "../../services/dialogTypeRef";
import ImportDatabase from './import-database-dialog';
import DjTangoPreferences from './preferences-dialog';

export function generateDialogWithFactory(typeOfDialog, data) {
  switch (typeOfDialog) {
    case dialogType.TANGO_DETAILS: {
      return (<div>TangoDetails</div>)
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