import React, {Component} from 'react';
import logo from '../logo.svg';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import * as menuActions from '../redux/actions/menuActions';
import {connect} from "react-redux";
import DjProgress from './dj-progress';

const styles = {

  headerRoot: {
    display: 'flex',
    //alignItems: 'center',
    backgroundColor: '#2a2a2a',
    flexDirection: 'column',
    minHeight: '50px',
  },
  headerButtons: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
  },
  logo: {},
  input: {
    opacity: "0",
    width: "0px",
    height: "0px"
  },
  button: {
    margin: '0px 7px 0px 7px',
    padding: '0px',
    minWidth: '0px',
  }
};

const closeAll = {
  file_menu_open: false,
  edition_menu_open: false,
  display_menu_open: false,
};

class Header extends Component {


  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      menus: {
        file_menu_open: false,
        edition_menu_open: false,
        display_menu_open: false,
      },
      dialog: {
        open: false,
        title: '',
        contentText: '',
      },
      databaseFile: undefined,

    };
  }

  handleClick = event => {
    let menus = {...closeAll};
    if (event.currentTarget.id === 'btn-file-menu') {
      menus.file_menu_open = true;
    } else if (event.currentTarget.id === 'btn-edition-menu') {
      menus.edition_menu_open = true;
    } else if (event.currentTarget.id === 'btn-display-menu') {
      menus.display_menu_open = true;
    }

    this.setState({menus: menus, anchorEl: event.currentTarget});
  };

  closeMenu = () => {
    this.setState({menus: closeAll});
  };

  handleImportDatabase = () => {
    let dialog = this.state.dialog;
    dialog.open = true;
    dialog.title = 'Import a Database';
    dialog.contentText = 'Select a database to import and click import. We import csv (coma separated value) file. ' +
      'The first line correspond to the name of the field. The field should be:' +
      'Title, Artist, Album, Type, Year, Singer, Bpm, Time';
    this.closeMenu();
  };
  handleImportData = () => {
    console.log('supposed to import data');
    console.log(this.state.databaseFile);
    this.props.dispatch(menuActions.importTangosFromCSVFile(this.state.databaseFile));
    this.closeDialog();
  };

  closeDialog = () => {
    let dialog = this.state.dialog;
    dialog.open = false;
    this.setState({dialog})
  };

  displaySideScreen = () => {
    this.closeMenu();
    window.open('http://www.google.com/', 'sharer', 'type=fullWindow, fullscreen, scrollbars=yes, toolbar=0');

  };

  render() {
    return (
      <div style={styles.headerRoot}>
        <div style={styles.headerButtons}>
          <img src={logo} className="App-logo" color={'white'} alt={'logo'}/>
          <Button
            id={'btn-file-menu'}
            aria-owns={this.state.file_menu_open ? 'file-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            color={'secondary'}
            style={styles.button}
          >
            File
          </Button>
          <Menu
            id="file-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menus.file_menu_open}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.closeMenu}>Import files</MenuItem>
            <MenuItem onClick={this.closeMenu}>Import directories</MenuItem>
            <Divider/>
            <MenuItem onClick={this.handleImportDatabase}>Import database</MenuItem>
          </Menu>
          <Button
            id={'btn-edition-menu'}
            aria-owns={this.state.menus.edition_menu_open ? 'edition-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            color={'secondary'}
            style={styles.button}
          >
            Edition
          </Button>
          <Menu
            id="edition-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menus.edition_menu_open}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.closeMenu}>Preferences</MenuItem>
            <Divider/>
            <MenuItem onClick={this.closeMenu}>Edit details of selected song</MenuItem>
            <MenuItem onClick={this.closeMenu}>Tap BMP</MenuItem>

          </Menu>

          <Button
            id={'btn-display-menu'}
            aria-owns={this.state.menus.display_menu_open ? 'display-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            color={'secondary'}
            style={styles.button}
          >
            Display
          </Button>
          <Menu
            id="display-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.menus.display_menu_open}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.closeMenu}>Full screen</MenuItem>
            <MenuItem onClick={this.displaySideScreen}>Display side screen</MenuItem>
          </Menu>

          <Dialog
            open={this.state.dialog.open}
            onClose={this.closeDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{this.state.dialog.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.state.dialog.contentText}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="databaseFile"
                label="Database file"
                type="txt"
                // fullWidth
                value={this.state.databaseFile ? this.state.databaseFile.name : ''}
              />
              <input
                accept="text/csv"
                style={styles.input}
                id="raised-button-file"
                multiple
                type="file"
                onChange={e => {
                  this.setState({databaseFile: e.target.files[0]})
                }}
              />
              <label htmlFor="raised-button-file">
                <Button raised component="span">
                  Select File
                </Button>
              </label>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleImportData} color="primary">
                Import Data
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <DjProgress
          isImporting={this.props.menu.isImporting}
          percentEnded={this.props.menu.percentEnded}
          label={'Importing ' + this.props.menu.importedFile + '...'}/>

      </div>
    );
  }
}

export default connect((store) => {
  return {
    menu: store.menu,
  }
})(Header);

