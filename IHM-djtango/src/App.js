import React, {Component} from 'react';
import './App.css';
import Main from './components/main';
import PropTypes from 'prop-types';
import {SnackbarProvider, withSnackbar} from 'notistack';

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



