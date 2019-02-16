import React, {Component} from 'react';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as dialogActions from "../../redux/actions/dialogActions";
import Button from "@material-ui/core/Button";
import {getTranslate} from '../locales/localeUtils';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

const styles = {
  input: {
    opacity: "0",
    width: "0px",
    height: "0px"
  },
  selectFileBloc: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
  }
};

class ImportDataBaseDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      databaseFile: undefined,
      name: 'Cat in the Hat',
    }
  }


  getContentText() {
    return getTranslate(this.props.locale)('IMPORT_DATABASE_TEXT');
  };

 handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  getContent() {
    console.log(this.state.databaseFile);
    let textValue = this.state.databaseFile === undefined ? '' : this.state.databaseFile.name;

    return (
      <div style={styles.selectFileBloc}>
        <TextField   value={this.state.name}
          onChange={this.handleChange('name')}/>
        <input
          // accept="text/csv"
          style={styles.input}
          id="raised-button-file"
          type="file"
          onChange={this.handleSelectFile}
        />
        <label htmlFor="raised-button-file">
          <Button variant={'text'} component="span" color={'secondary'} style={{marginLeft: '25px'}}>
            Select File
          </Button>
        </label>
      </div>
    );
  }

  handleSelectFile = event => {
    console.log("CHANGING FILE");
    // this.setState({databaseFile: event.target.files[0]});
    this.setState({databaseFile: event.target.files[0], name:event.target.files[0].name});
  };

  getActions() {
    let translate = getTranslate(this.props.locale);
    return [
      <Button
        key={'cancel_button'}
        variant="contained"
        color="secondary"
        onClick={this.handleCloseDialog}>
        {translate('CANCEL')}
      </Button>,
      <Button
        key={'import_button'}
        variant="contained"
        color="primary"
        onClick={this.handleImportDataBase}>
        {translate('IMPORT_DATABASE_BUTTON')}
      </Button>,
    ];
  }

  handleImportDataBase = () => {
    console.log(this.state.databaseFile);
  };

  getTitle() {
    return (<div>{getTranslate(this.props.locale)('IMPORT_DATABASE')}</div>);
  }


  /******************************************************/
  /*Fixed part of the dialog, don't touch that          */
  /******************************************************/
  handleCloseDialog = () => {
    this.props.dispatch(dialogActions.closeDialog());
  };

  render() {
    let dialog: dialogReducerDTO = this.props.dialog;
    console.log(this.state.databaseFile);

    return (
      <Dialog open={dialog.open}>
        <DialogTitle>{this.getTitle()}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{whiteSpace: 'pre-wrap'}}>
            {this.getContentText()}
          </DialogContentText>
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
})(ImportDataBaseDialog);

