import React, {Component} from 'react';
import './App.css';
import Main from './components/main';
import PropTypes from 'prop-types';
import {SnackbarProvider, withSnackbar} from 'notistack';
// todo: use the following link to use and configure 
// https://wykrhm.medium.com/creating-standalone-desktop-applications-with-react-electron-and-sqlite3-269dbb310aee

class App extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp/>
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;



