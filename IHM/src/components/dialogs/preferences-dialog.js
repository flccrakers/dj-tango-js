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

class templateClassName extends Component {

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
    let preferences: preferencesDTO, ret = [];
    preferences = this.state.preferences;
    ret.push(this.getBaseDir(preferences));
    ret.push(this.getLanguage(preferences));
    return ret;
  };

  getBaseDir(preferences: preferencesDTO) {
    // console.log(preferences);
    let translate = getTranslate(this.props.locale);
    return (
      <div key={'preferences_baseDir'} style={{display: 'flex', flex: '1 1 auto', alignItems: 'center'}}>
        <TextField
          autoFocus
          value={preferences.baseDir}
          label={translate('PREFERENCES.BASE_DIRECTORY')}
          onChange={this.updateStatePreferencesField('baseDir')}
          onBlur={this.updatePreferencesInDB}
          style = {{width: '450px', margin:'15px 0'}}
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

  updateStatePreferencesField = field => event => {
    let preferences: preferencesDTO = this.state.preferences;
    preferences[field] = event.target.value;
    this.setState({preferences});
    // this.props.dispatch(preferencesActions.updatePreferences(preferences));
  };

  updatePreferencesInDB = () => {
    let preferences = this.state.preferences;
    this.props.dispatch(preferencesActions.updatePreferencesInDB(preferences));
  };

  getLanguage(preferences: preferencesDTO) {
    return (
      <TextField
        key={'language'}
        value={preferences.language}
        label={'Language'}
      />
    )
  }

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

export default connect(store => {
  return {
    dialog: store.dialog,
    locale: store.locale,
    preferences: store.preferences,
  };
})(templateClassName);

