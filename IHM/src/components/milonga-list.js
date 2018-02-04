import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as milongaActions from '../redux/actions/sourceActions';
import Save from 'material-ui-icons/Save';
import OpenMilonga from 'material-ui-icons/FolderOpen';
import Info from 'material-ui-icons/Info';
import Delete from 'material-ui-icons/DeleteForever';
import Sweep from 'material-ui-icons/DeleteSweep'
import IconButton from "material-ui/IconButton/index";
import Paper from "material-ui/es/Paper/Paper";
import Tooltip from 'material-ui/Tooltip';

import VirtualList from 'react-tiny-virtual-list';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 50%',
    margin: '3px 0px 0px 0px',
    padding: '2px',
    color: 'white',
    // backgroundColor: 'blue',
    border: '1pt solid ' + '#5f5f5f',
    overflow: 'hidden',
  },

};

class MilongaList extends Component {
  handleOnClick = () => {

  };

  getMenu() {
    const styles = {
      paperContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '0px 2px 5px 2px',
      },
      button: {
        height: '36px',
      },
      toolTip:{
        fontSize:'20px',
      }
    };
    return (
      <Paper style={styles.paperContainer} elevation={4} key={'filter_source_menu'}>
        <Tooltip id="tooltip-icon" title="Save" classes={{tooltip:styles.toolTip}}>
          <IconButton
            style={styles.button}
            color={'secondary'}
            onClick={() => {
              console.log('save milonga')
            }}
          >
            <Save style={styles.icon}/>
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-icon" title="Open milonga">
          <IconButton
            style={styles.button}
            color={'secondary'}
            onClick={() => {
              console.log('open milonga')
            }}
          >
            <OpenMilonga style={styles.icon}/>
          </IconButton>
        </Tooltip>

        <Tooltip id="tooltip-icon" title="Display info about the milonga">
          <IconButton
            style={styles.button}
            color={'secondary'}
            onClick={() => {
              console.log('info about milonga')
            }}
          >
            <Info style={styles.icon}/>
          </IconButton>
        </Tooltip>

        <Tooltip id="tooltip-icon" title="Delete the milonga">
          <IconButton
            style={styles.button}
            color={'secondary'}
            onClick={() => {
              console.log('delete milonga')
            }}
          >
            <Delete style={styles.icon}/>
          </IconButton>
        </Tooltip>
        <Tooltip id="tooltip-icon" title="Empty the milonga and start a new one">
          <IconButton
            style={styles.button}
            color={'secondary'}
            onClick={() => {
              console.log('empty milonga')
            }}
          >
            <Sweep style={styles.icon}/>
          </IconButton>
        </Tooltip>
      </Paper>
    );
  }

  render() {
    return (
      <div
        style={styles.main}
        onClick={this.handleOnClick}
      >
        {this.getMenu()}
        
        <span>milonga</span>
      </div>
    );
  }

}

export default connect((store) => {
  return {
    milonga: store.milonga,
  }

})(MilongaList);
