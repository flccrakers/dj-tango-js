import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
// import {getTranslate} from "../locales/localeUtils";
import * as  dialogActions from '../redux/actions/dialogActions';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import dialogType from "../services/dialogTypeRef";
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

class DjTangoDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogContent: null,
      dialogAction: [
        <Button color="primary"
                onClick={() => {
                  props.dispatch(dialogActions.closeDialog())
                }}>
          CLOSE
        </Button>,
      ],
      dialogTitle: '',
      dialogId: 'dialogId',
      checkedPlayMusic:false,
    }
  }

  /**
   * Get the content of the dialog box
   * @returns {Array}
   */
  getContent() {
    let dialog: dialogReducerDTO = this.props.dialog;
    switch (dialog.dialogType) {
      case dialogType.TANGO_DETAILS: {
        return this.getDetailsContent();
      }
      default: {
        return [];
      }
    }
  }

  getDetailsContent() {
    const styles = {
      name: {
        color: '#fff',
        marginRight: '8px',
      },
      yearDiv: {
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        maxWidth: '79px',
      },
      textFieldYear: {
        maxWidth: '50px',
      },
      line: {
        display: 'flex',
        flex: '1 1 auto',
        flexWrap: 'no-wrap',
      },
      section: {
        display: 'flex',
        flex:'1 1 50%',
        flexWrap: 'no-wrap',
        justifyContent: 'flex-end',
        alignItems:'center',
      },
      fullSection:{
        display:'flex',
        flex:'1 1 auto',
      }
    };
    let tango, ret = [], additionalData;
    additionalData = this.props.dialog.additionalData;
    console.log(additionalData);
    if (additionalData !== null && additionalData !== undefined) {
      tango = this.props.tangoList[additionalData.index];
      console.log(tango.title);
      ret.push(
        <div style={styles.line}>
          <div style={styles.section}>
            <span style={styles.name}>Title:</span>
            <TextField defaultValue={tango.title}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Year:</span>
            <TextField defaultValue={tango.year}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line}>
          <div style={styles.section}>
            <span style={styles.name}>Artist:</span>
            <TextField defaultValue={tango.artist}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Singer:</span>
            <TextField defaultValue={tango.singer}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line}>
          <div style={styles.section}>
            <span style={styles.name}>Album:</span>
            <TextField defaultValue={tango.album}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Genre:</span>
            <TextField defaultValue={tango.genre}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line}>
          <div style={styles.section}>
            <span style={styles.name}>Compo.:</span>
            <TextField defaultValue={tango.composer}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Author:</span>
            <TextField defaultValue={tango.author}/>
          </div>
        </div>
      );
      ret.push(
        <div style={{...styles.line, marginTop:'20px'}}>
          <div style={styles.fullSection}>
            <span style={styles.name}>Path:</span>
            <TextField defaultValue={tango.path} multiline={true} rows={3} fullWidth={true} disabled={true}/>
          </div>
        </div>
      );
      ret.push(
        <div style={{...styles.line, marginTop:'20px'}}>
          <div style={styles.fullSection}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedPlayMusic}
                  onChange={this.handleChangeCheckBoxes('checkedPlayMusic')}
                  value="checkedA"
                />
              }
              label="Play music when click next or previous"
            />
          </div>
        </div>
      );

    }
    return ret;
  }

  handleChangeCheckBoxes = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  /**
   * Get the title of the tango
   * @returns {string}
   */
  getTitle() {
    let dialog: dialogReducerDTO = this.props.dialog;
    switch (dialog.dialogType) {
      case dialogType.TANGO_DETAILS: {
        return 'Tango details';
      }
      default: {
        return 'What am I doing here ?';
      }
    }
  }


  /**
   * Get the actions according to the selected context
   * @returns {*}
   */
  getActions() {
    let dialog: dialogReducerDTO = this.props.dialog;
    switch (dialog.dialogType) {
      case dialogType.TANGO_DETAILS: {
        return this.getDetailsActions();
      }
      default: {
        return [
          <Button
            variant="raised"
            color="secondary"
            onClick={() => {
              this.props.dispatch(dialogActions.closeDialog())
            }}>
            CLOSE
          </Button>,
        ]
      }
    }
  }

  getDetailsActions() {
    return (
      [
        <Button
          key={'edit_tango_cancel'}
          variant="raised"
          color="secondary"
          onClick={() => {
            this.props.dispatch(dialogActions.closeDialog())
          }}>
          CANCEL
        </Button>,
        <Button
          key={'edit_tango_next'}
          variant="raised"
          // color="primary"
          onClick={() => {
            this.props.dispatch(dialogActions.closeDialog())
          }}>
          Next
        </Button>,
        <Button
          key={'edit_tango_previous'}
          variant="raised"
          // color="primary"
          onClick={() => {
            this.props.dispatch(dialogActions.closeDialog())
          }}>
          PREVIOUS
        </Button>,
        <Button
          key={'edit_tango_save'}
          variant="raised"
          // color="primary"
          onClick={() => {
            this.props.dispatch(dialogActions.closeDialog())
          }}>
          Save
        </Button>,
      ]
    );
  }

  render() {
    let dialog: dialogReducerDTO = this.props.dialog;

    return (

      <Dialog onClose={this.handleClose} open={dialog.open}>
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
    selectedTangos: store.source.selectedTangos,
    tangoList: store.source.displayTangoList,
  };
})(DjTangoDialog);