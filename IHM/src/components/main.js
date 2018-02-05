import React, {Component} from 'react';
import Header from "./header";
import {connect} from 'react-redux';
import PlayerWrapper from './player-wrapper';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import Footer from './footer';
import PlaylistBoard from './playlist-board'


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


  render() {
    return [

      <MuiThemeProvider theme={theme} key={'main_app'}>
        <Header/>
        <div style={styles.content}>
          <PlayerWrapper/>
          <PlaylistBoard/>
        </div>
        <Footer/>

      </MuiThemeProvider>
    ];
  }
}


export default connect((store) => {
  return {}
})(Main);