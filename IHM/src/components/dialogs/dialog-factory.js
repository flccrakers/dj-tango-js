import React from "react";
import dialogType from "../../services/dialogTypeRef";
import ImportDatabase from './import-database-dialog';

export function generateDialogWithFactory(typeOfDialog, data) {
  switch (typeOfDialog) {
    case dialogType.TANGO_DETAILS: {
      return (<div>TangoDetails</div>)
    }
    case dialogType.IMPORT_DATABASE: {
      return (<ImportDatabase/>);
    }
    default:
      return null;

  }
}