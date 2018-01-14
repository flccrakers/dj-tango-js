import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as playerActions from '../redux/actions/playerAction';
import {connect} from 'react-redux';
import {millisToMinutesAndSeconds, tangoColors} from '../services/utils';
import Playing from 'material-ui-icons/VolumeUp';


const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    // width: '100%',
    //minHeight: '25px',
    float: 'left',
    cursor: 'pointer',
  },
  cell: {
    // display:'flex',
    // alignItems:'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '0px 2px 0px 2px',

  },
  center: {
    textAlign: 'center',
  }
};


class DataLine extends Component {


  handleClickOnLine = () => {
    let tango = this.props.tango;
    console.log(tango.path);
    this.props.dispatch(playerActions.updateCurrentTango(tango));

  };

  getLineContent() {
    let sizedRows = this.props.sizedRows;
    let tango: tango = this.props.tango;
    let ret = [];
    sizedRows.forEach(row => {
      let style;
      if (row.align === 'left') {
        style = {...styles.cell, maxWidth: row.size, minWidth: row.size, lineHeight: this.props.rowHeight + 'px'};
      } else if (row.align === 'center') {
        style = {
          ...styles.cell, ...styles.center,
          maxWidth: row.size,
          minWidth: row.size,
          lineHeight: this.props.rowHeight + 'px'
        };
      }
      let value = tango[row.field];
      if (row.field === 'duration') {
        value = millisToMinutesAndSeconds(value)
      }
      if (value === 'Unknown') {
        value = " - ";
      }
      if (row.field === 'played' && this.isTangoPlaying()) {
        value = [<Playing style={{color: 'white'}} key={'playing_beacon'}/>];
      }
      ret.push(
        <div key={tango._id + '_' + row.field} style={style} >{value}</div>
      );
    });
    return ret;

  }


  isTangoPlaying() {
    return this.props.tango._id === this.props.playedId;
  }

  render() {
    let tango, root, rootBase;
    rootBase = {...this.props.style, ...styles.root, WebkitUserSelect: 'none'};
    tango: tango = this.props.tango;
    if (this.isTangoPlaying()) {
      root={...rootBase, backgroundColor:'#3a3a3a', color:'#1ba500'}
    }
    else {
      root = {...rootBase, backgroundColor: tangoColors()[tango.genre.replace('-', '_')]};
    }
    return (
      <div style={root} onDoubleClick={this.handleClickOnLine} draggable={true}>
        {this.getLineContent()}

      </div>
    );
  }
}

DataLine.propTypes = {
  tango: PropTypes.object.isRequired,
  sizedRows: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default connect((store) => {
  return {
    playedId: store.player.currentTango._id,
  }
})(DataLine);
