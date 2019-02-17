import React, {Component} from 'react';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as dialogActions from "../../redux/actions/dialogActions";
import Button from "@material-ui/core/Button";
import {getTranslate} from '../locales/localeUtils';


class templateClassName extends Component {

  getContent() {
  };

  getActions() {
    let translate = getTranslate(this.props.locale);
    return [
      <Button
        key={'closeButton'}
        variant="contained"
        color="secondary"
        onClick={this.handleCloseDialog}>
        {translate('CLOSE')}
      </Button>,
    ];
  }

  getTitle() {
    return getTranslate(this.props.locale)('MENU.PREFERENCES')
  }


  /******************************************************/
  /*Fixed part of the dialog, don't touch that          */
  /******************************************************/
  handleCloseDialog = () => {
    this.props.dispatch(dialogActions.closeDialog());
  };

  render() {
    let dialog = this.props.dialog;
    return (
      <Dialog open={dialog.open}>
        <DialogTitle id={dialog.dialogTitle}>{this.getTitle()}</DialogTitle>
        <DialogContent>
          {this.getContent()}
        </DialogContent>
        <DialogActions>
          {this.getActions()}
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(store => {
  return {
    dialog: store.dialog,
    locale: store.locale,
  };
})(templateClassName);

