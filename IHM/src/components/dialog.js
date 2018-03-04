import React from "react";
import {connect} from "react-redux";
import {getTranslate} from "../locales/localeUtils";


class DjTangoDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogContent: null,
      dialogAction: [
        <FlatButton
          label={getTranslate(props.locale)('CLOSE')}
          primary={true}
          onClick={() => {
            props.dispatch(labbookActions.closeListExperimentDialog())
          }}
        />,
      ],
      dialogTitle: '',
    }
  }
}


export default connect(store => {
  return {
    dialog: store.dialog,
    selectedTangos: store.source.selectedTangos,
    tangoList: store.source.displayTangoList,
  };
})(DjTangoDialog);