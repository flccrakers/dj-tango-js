import React, {Component} from 'react';
import Header from "./header";
import Source from './sourceList';
import * as sourceActions from '../redux/actions/sourceActions';
import {connect} from 'react-redux';
import PlayerWraper from './player-wraper';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import Footer from './footer';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const styles = {
  rootApp: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    height: '100%',
    position: 'relative', /* need to position inner content*/
    backgroundColor: 'red',
    padding: '15px',

  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    padding: '5px',
    backgroundColor: '#2a2a2a',
  },


  playListRoot: {
    display: 'flex',
    flex: '1 1 auto',
    backgroundColor: '#2a2a2a',
  },
  playLists: {
    display: 'flex',
    flex: '1 1 50%',
    margin: '3px 0px 0px 0px',
    padding: '2px',
    color: 'white',
    // backgroundColor: 'blue',
    border: '1pt solid ' + '#5f5f5f',
    overflow: 'hidden',
  },
  verticalSeparator: {
    width: '5px',
  },


};

class Main extends Component {


  render() {
    return [

      <MuiThemeProvider theme={theme} key={'main_app'}>
        <Header/>
        <div style={styles.content}>
          <PlayerWraper/>
          <div style={styles.playListRoot}>
            <Source/>
            <div style={styles.verticalSeparator}/>
            <div style={styles.playLists} id='milongas'>milonga</div>
          </div>
        </div>
        <Footer/>

      </MuiThemeProvider>
    ];
  }
}


export default connect((store) => {
  return {}
})(Main);