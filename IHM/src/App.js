import React, {Component} from 'react';
import './App.css';
import Main from './components/main';


class App extends Component {

  listen = position => {
    //console.log('listen ');
    //console.log(position * 1000);
  };

  render() {
    return (
      <Main/>
    );
  }
}

export default App;
