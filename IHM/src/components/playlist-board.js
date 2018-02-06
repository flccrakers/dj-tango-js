import React, {Component} from 'react';
import Source from './source-list';
import Milonga from './milonga-list';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const styles = {
  playListRoot: {
    display: 'flex',
    flex: '1 1 auto',
    backgroundColor: '#2a2a2a',
  },
  verticalSeparator: {
    width: '5px',
  },
};

class PlayListBoard extends Component {
  render() {
    return [
      <div style={styles.playListRoot} key={'playListBoard'}>
        <Source/>
        <div style={styles.verticalSeparator}/>
        <Milonga/>
      </div>
    ];
  }
}

export default DragDropContext(HTML5Backend)(PlayListBoard);