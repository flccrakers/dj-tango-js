import React, {Component} from 'react';
import Header from "./header";
import {connect} from 'react-redux';
import PlayerWrapper from './player-wrapper';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Footer from './footer';
import PlaylistBoard from './playlist-board';
import DjDialog from './dialogs/dialog';
import * as localizeActions from "../redux/actions/localizeActions";
import * as sourceActions from "../redux/actions/sourceActions";


const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const styles = {

  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    padding: '5px',
    backgroundColor: '#2a2a2a',
  },


};

class Main extends Component {

  componentWillMount(): void {
    const languages = ["en-us", "fr-fr", "ger-ger"];
    this.props.dispatch(localizeActions.initialize(languages));
    this.props.dispatch(localizeActions.addTranslationForLanguage(require("./locales/en-us.json"), "en-us"));
    this.props.dispatch(localizeActions.addTranslationForLanguage(require("./locales/fr-fr.json"), "fr-fr"));
    this.props.dispatch(localizeActions.addTranslationForLanguage(require("./locales/ger-ger.json"), "ger-ger"));
    this.props.dispatch(sourceActions.fetchAllTangos(true))
  }

  render() {
    return [

      <MuiThemeProvider theme={theme} key={'main_app'}>
        <Header/>
        <div style={styles.content}>
          <PlayerWrapper/>
          <PlaylistBoard/>
          <DjDialog/>
        </div>
        <Footer/>

      </MuiThemeProvider>
    ];
  }
}


export default connect((store) => {
  return {}
})(Main);