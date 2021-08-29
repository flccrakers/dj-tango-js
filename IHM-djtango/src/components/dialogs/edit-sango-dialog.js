import React, {Component} from 'react';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as dialogActions from "../../redux/actions/dialogActions";
import Button from "@material-ui/core/Button";
import {getTranslate} from '../locales/localeUtils';
import {withSnackbar} from "notistack";
import TextField from "@material-ui/core/es/TextField/TextField";


class TangoEdition extends Component {

  getContent() {
    let index = this.props.dialog.additionalData.index;
    // console.log(this.props.tangoList[index]);
    let tango: tangoDTO = this.props.tangoList[index];
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <TextField label={'Title'} value={tango.title}/>
        <TextField label={'Author'} value={tango.author}/>
        <TextField label={'Singer'} value={tango.singer}/>
        <TextField label={'Album'} value={tango.album}/>
        <TextField label={'Year'} value={tango.year}/>
      </div>
    )
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
    return getTranslate(this.props.locale)("TANGO_EDITION.TITLE");
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

const myTangoEdition = withSnackbar(TangoEdition);

export default connect(store => {
  return {
    dialog: store.dialog,
    locale: store.locale,
    tangoList: store.source.tangoList,

  };
})(myTangoEdition);

