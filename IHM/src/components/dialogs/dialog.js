import {Component} from 'react';
import {connect} from "react-redux";
import {generateDialogWithFactory} from '../dialogs/dialog-factory';

class DjTangoDialog extends Component {

  render() {
    if (this.props.dialog.open === true) {
      return generateDialogWithFactory(this.props.dialog.dialogType);
    }
    return null
  }
}

export default connect(store => {
  return {
    dialog: store.dialog,
    // selectedTangos: store.source.selectedTangos,
    // tangoList: store.source.displayTangoList,
  };
})(DjTangoDialog);