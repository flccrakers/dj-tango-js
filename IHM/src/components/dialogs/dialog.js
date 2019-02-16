import React, {Component} from 'react';
import {connect} from "react-redux";
// import {getTranslate} from "../locales/localeUtils";
import * as  dialogActions from '../../redux/actions/dialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import dialogType from "../../services/dialogTypeRef";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as playerActions from "../../redux/actions/playerActions";
import {generateDialogWithFactory} from '../dialogs/dialog-factory';

class DjTangoDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedPlayMusic: false,
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
        flex: '1 1 50%',
        flexWrap: 'no-wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      fullSection: {
        display: 'flex',
        flex: '1 1 auto',
      }
    };
    let tango, ret = [], additionalData;
    additionalData = this.props.dialog.additionalData;
    // console.log(additionalData);
    if (additionalData !== null && additionalData !== undefined) {
      tango = {...this.props.tangoList[additionalData.index]};
      // console.log(tango);
      ret.push(
        <div style={styles.line} key={'details_title_year'}>
          <div style={styles.section}>
            <span style={styles.name}>Title:</span>
            <TextField value={tango.title}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Year:</span>
            <TextField value={tango.year}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line} key={'details_artist_singer'}>
          <div style={styles.section}>
            <span style={styles.name}>Artist:</span>
            <TextField value={tango.artist}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Singer:</span>
            <TextField value={tango.singer}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line} key={'details_album_genre'}>
          <div style={styles.section}>
            <span style={styles.name}>Album:</span>
            <TextField value={tango.album}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Genre:</span>
            <TextField value={tango.genre}/>
          </div>
        </div>
      );
      ret.push(
        <div style={styles.line} key={'details_composer_author'}>
          <div style={styles.section}>
            <span style={styles.name}>Compo.:</span>
            <TextField value={tango.composer}/>
          </div>
          <div style={styles.section}>
            <span style={styles.name}>Author:</span>
            <TextField value={tango.author}/>
          </div>
        </div>
      );
      ret.push(
        <div style={{...styles.line, marginTop: '20px'}} key={'details_path'}>
          <div style={styles.fullSection}>
            <span style={styles.name}>Path:</span>
            <TextField value={tango.path} multiline={true} rows={3} fullWidth={true} disabled={true}/>
          </div>
        </div>
      );
      ret.push(
        <div style={{...styles.line, marginTop: '20px'}} key={'details_check_play_music'}>
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
    this.setState({[name]: event.target.checked});
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
          key={'edit_tango_previous'}
          variant="raised"
          // color="primary"
          onClick={() => {
            this.displayDetailsOfPreviousOrNextTangoSong(false);
          }}>
          PREVIOUS
        </Button>,
        <Button
          key={'edit_tango_next'}
          variant="raised"
          // color="primary"
          onClick={() => {
            this.displayDetailsOfPreviousOrNextTangoSong(false);
            console.log('click on next');
          }}>
          Next
        </Button>,
        <Button
          key={'edit_tango_save'}
          variant="raised"
          onClick={() => {
            this.props.dispatch(dialogActions.closeDialog())
          }}>
          Save
        </Button>,
      ]
    );
  }

  displayDetailsOfPreviousOrNextTangoSong(isPrevious = true) {
    let additionalData = {...this.props.dialog.additionalData};
    isPrevious === true ? additionalData.index -= 1 : additionalData.index += 1;
    if (additionalData.index > (this.props.tangoList.length - 1)) additionalData.index = this.props.tangoList.length - 1;
    this.props.dispatch(dialogActions.updateDialogAndShow(dialogType.TANGO_DETAILS, additionalData));
    if (this.state.checkedPlayMusic === true) {
      this.props.dispatch(playerActions.updateCurrentTango(this.props.tangoList[additionalData.index]));
    }
  }

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
    selectedTangos: store.source.selectedTangos,
    tangoList: store.source.displayTangoList,
  };
})(DjTangoDialog);