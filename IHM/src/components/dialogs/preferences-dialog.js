import React, {Component} from 'react';
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as dialogActions from "../../redux/actions/dialogActions";
import * as preferencesActions from "../../redux/actions/preferencesActions";
import Button from "@material-ui/core/Button";
import {getTranslate} from '../locales/localeUtils';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {isNumber} from "../dj-utils";
import {withSnackbar} from "notistack";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
};

class PreferenceDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      preferences: props.preferences,
    };
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (this.props.preferences !== this.state.preferences) {
      this.setState({preferences: this.props.preferences})
    }
  }

  getContent() {
    let ret = [];

    ret.push(this.getBaseDir());
    ret.push(this.getLanguage());
    ret.push(this.getTimeCortinaAndFadeOut());
    ret.push(this.getSwitches());
    return ret;
  };

  getBaseDir() {
    let translate = getTranslate(this.props.locale);
    return (
      <div key={'preferences_baseDir'} style={{display: 'flex', flex: '1 1 auto', alignItems: 'center'}}>
        <TextField
          autoFocus
          value={this.state.preferences.baseDir}
          label={translate('PREFERENCES.BASE_DIRECTORY')}
          onChange={this.handleBaseDirChange}
          onBlur={this.updatePreferencesInDB}
          style={{width: '450px', margin: '15px 0'}}
        />
        <Tooltip title={translate('PREFERENCES.TOOLTIP_BASE_DIR')}>
          <IconButton
            variant={'text'}
            color={'secondary'}
            style={{marginLeft: '25px'}}
          >

            <Info/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  handleBaseDirChange = event => {
    this.updateStatePreferencesField('baseDir', event.target.value);
  };

  getLanguage() {
    let translate = getTranslate(this.props.locale);
    let formControl = {
      margin: '0 0 15px 0',
      minWidth: '120px',
    };
    return (
      <FormControl style={formControl} key={'SelectLanguageInPreferences'}>
        <InputLabel htmlFor="language">{translate('LANGUAGE')}</InputLabel>
        <Select
          value={this.state.preferences.language}
          onChange={this.handleLanguageChange}
          inputProps={{
            name: 'language',
            id: 'language',
          }}
        >
          <MenuItem value={'en-en'}>{translate('ENGLISH')}</MenuItem>
          <MenuItem value={'fr-fr'}>{translate('FRENCH')}</MenuItem>
        </Select>
      </FormControl>
    )
  }

  handleLanguageChange = event => {
    console.log("In language change");
    console.log(event.target.value);
    this.updateStatePreferencesField('language', event.target.value);
    setTimeout(() => {
      this.updatePreferencesInDB()
    }, 500);
  };

  getTimeCortinaAndFadeOut() {
    let translate = getTranslate(this.props.locale);
    return (
      <div key={'preferences_cortina_times'} style={{display: 'flex', flex: '1 1 auto', alignItems: 'center',}}>
        <TextField
          value={this.state.preferences.timeCortina}
          label={translate('PREFERENCES.CORTINA_DURATION')}
          onChange={this.handleTimeCortinaChange}
          onBlur={this.updatePreferencesInDB}
          style={{width: '150px', margin: '0 15px 0 0'}}
          helperText={translate('PREFERENCES.IN_SECONDS')}
        />
        <TextField
          value={this.state.preferences.timeFadeOut}
          label={translate('PREFERENCES.FADEOUT_DURATION')}
          onChange={this.handleFadeOutChange}
          onBlur={this.updatePreferencesInDB}
          style={{width: '150px', margin: '0 0 0 15px'}}
          helperText={translate('PREFERENCES.IN_SECONDS')}
        />
        <TextField
          value={this.state.preferences.timeBetweenSongsMS}
          label={translate('PREFERENCES.LATENCY_TIME')}
          onChange={this.handleTimeBetweenSong}
          onBlur={this.updatePreferencesInDB}
          style={{width: '150px', margin: '0 0 0 15px'}}
          helperText={translate('PREFERENCES.IN_MILLISECONDS')}
        />

      </div>
    );
  }

  handleTimeCortinaChange = event => {
    let value = event.target.value === '' ? 0 : event.target.value;
    if (isNumber(value) === true) {
      this.updateStatePreferencesField('timeCortina', parseInt(value));
    } else {
      this.props.enqueueSnackbar(getTranslate(this.props.locale)('PREFERENCES.SHOULD_BE_NUMBER'), {
        variant: 'warning',
        autoHideDuration: 4000
      })
    }
  };

  handleFadeOutChange = event => {
    let value = event.target.value === '' ? 0 : event.target.value;
    if (isNumber(value) === true) {
      this.updateStatePreferencesField('timeFadeOut', parseInt(value));
    } else {
      this.props.enqueueSnackbar(getTranslate(this.props.locale)('PREFERENCES.SHOULD_BE_NUMBER'), {
        variant: 'warning',
        autoHideDuration: 4000
      })
    }
  };
  handleTimeBetweenSong = event => {
    let value = event.target.value === '' ? 0 : event.target.value;
    if (isNumber(value) === true) {
      this.updateStatePreferencesField('timeBetweenSongsMS', parseInt(value));
    } else {
      this.props.enqueueSnackbar(getTranslate(this.props.locale)('PREFERENCES.SHOULD_BE_NUMBER'), {
        variant: 'warning',
        autoHideDuration: 4000
      })
    }
  };

  getSwitches() {
    let translate = getTranslate(this.props.locale);
    return (
      <div key={'preferences_cortina_times'}
           style={{display: 'flex', flex: '1 1 auto', flexDirection: 'column', margin: '25px 0 0 0'}}>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.preferences.normalize}
              onChange={this.handleChangeSwitch('normalize')}
              value="normalize"
            />
          }
          label={translate('PREFERENCES.NORMALIZE_FILE_NAME')}
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.preferences.writeId3Tag}
              onChange={this.handleChangeSwitch('writeId3Tag')}
              value="writeId3Tag"
            />
          }
          label={translate('PREFERENCES.WRITE_ID3_TAG')}
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.preferences.newSongAvailable}
              onChange={this.handleChangeSwitch('newSongAvailable')}
              value="newSongAvailable"
            />
          }
          label={translate('PREFERENCES.NEW_SONG_AVAILABLE')}
        />

      </div>
    );
  }

  handleChangeSwitch = field => event => {
    this.updateStatePreferencesField(field, event.target.checked);
    this.updatePreferencesInDB();

  };

  updateStatePreferencesField(field, value) {
    let preferences: preferencesDTO = this.state.preferences;
    preferences[field] = value;
    console.log(preferences);
    this.setState({preferences});
  }

  updatePreferencesInDB = () => {
    let preferences = this.state.preferences;
    this.props.dispatch(preferencesActions.updatePreferencesInDB(preferences));
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
      </Button>
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

const myPreferenceDialog = withSnackbar(PreferenceDialog);
export default connect(store => {
  return {
    dialog: store.dialog,
    locale: store.locale,
    preferences: store.preferences,
  };
})(myPreferenceDialog);

