import React, {Component} from 'react';
import logo from '../logo.svg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {connect} from "react-redux";
import DjProgress from './dj-progress';
import * as dialogActions from '../redux/actions/dialogActions';
import dialogType from "../services/dialogTypeRef";
import DjTangoDialog from './dialogs/dialog';
import {getTranslate} from "./locales/localeUtils";
import {withSnackbar} from 'notistack';
import {fetchPreferences} from "../redux/actions/preferencesActions";

const styles = {

  headerRoot: {
    display: 'flex',
    backgroundColor: '#2a2a2a',
    minHeight: '50px',
  },
  headerButtons: {
    display: 'flex',
    alignItems: 'center',
    // flex: '1 1 auto',
    height: '100%',
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
    this.closeMenu();
    this.props.dispatch(dialogActions.updateDialogAndShow(dialogType.IMPORT_DATABASE));

  };


  render() {

    return (
      <div style={styles.headerRoot}>
        {this.getMenuButtons()}
        <DjProgress
          key={'djProgress'}
          isImporting={this.props.menu.isImporting}
          percentEnded={this.props.menu.percentEnded}
          label={'Importing ' + this.props.menu.importedFile + '...'}
        />
        <DjTangoDialog/>

      </div>
    );
  }

  getMenuButtons() {

    return (
      <div style={styles.headerButtons}>
        <img src={logo} className="App-logo" color={'white'} alt={'logo'}/>
        {this.getFileMenuButton()}
        {this.getEditionMenuButton()}
        {this.getDisplayMenuButton()}
      </div>
    );
  }


  getFileMenuButton() {
    let translate = getTranslate(this.props.locale);
    return (
      <div>
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
          <MenuItem onClick={this.closeMenu}>{translate("MENU.IMPORT_FILE")}</MenuItem>
          <MenuItem onClick={this.closeMenu}>{translate("MENU.IMPORT_DIRECTORIES")}</MenuItem>
          <Divider/>
          <MenuItem onClick={this.handleImportDatabase}>{translate("MENU.IMPORT_DATABASE")}</MenuItem>
          <MenuItem onClick={this.handleTestSnack}>Test snack</MenuItem>
        </Menu>
      </div>
    )
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleTestSnack = () => {
    let table, variant, min = 0, max = 4, index;
    index = this.getRandomInt(min, max);
    // console.log(index);
    table = ['success', 'error', 'warning', 'info', ''];
    variant = table[index];
    // console.log(variant);
    this.props.enqueueSnackbar('I love snacks.', {variant});
  };

  getEditionMenuButton() {
    let translate = getTranslate(this.props.locale);
    return (
      <div>
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
          <MenuItem onClick={this.handlePreferences}>{translate('MENU.PREFERENCES')}</MenuItem>
          <Divider/>
          <MenuItem onClick={this.closeMenu} disabled>{translate('MENU.EDIT_DETAILS_OF_SELECTED_SONG')}</MenuItem>
          <MenuItem onClick={this.closeMenu} disabled>{translate('MENU.TAB_BMP')}</MenuItem>

        </Menu>
      </div>
    )
  }

  handlePreferences = () => {
    console.log('preferences');
    this.closeMenu();
    this.props.dispatch(fetchPreferences());
    this.props.dispatch(dialogActions.updateDialogAndShow(dialogType.PREFERENCES));
  };

  getDisplayMenuButton() {
    let translate = getTranslate(this.props.locale);
    return (
      <div>
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
          <MenuItem onClick={this.closeMenu} disabled>{translate("MENU.FULL_SCREEN")}</MenuItem>
          <MenuItem onClick={this.displaySideScreen}>{translate("MENU.DISPLAY_SIDE_SCREEN")}</MenuItem>
        </Menu>

      </div>
    )
  }

  displaySideScreen = () => {
    this.closeMenu();
    window.open('http://www.google.com/', 'sharer', 'type=fullWindow, fullscreen, scrollbars=yes, toolbar=0');

  };

}

const exportHeader = withSnackbar(Header);

export default connect((store) => {
  return {
    menu: store.menu,
    locale: store.locale,
  }
})(exportHeader);

