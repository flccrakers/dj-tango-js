import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as playerActions from '../redux/actions/playerAction';
import {connect} from 'react-redux';
import {millisToMinutesAndSeconds, tangoColors} from '../services/utils';


const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    // width: '100%',
    minHeight: '25px',
    float: 'left',
    cursor: 'pointer',
  },
  cell: {
    display:'flex',
    //flex:'1 1 auto',
    alignItems:'center',
    // display: 'table-cell', /* comportement visuel de cellule */
    // verticalAlign: 'middle',
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

  /*getTangoColor(genre) {
    switch (genre) {
      case'tango': {
        return 'blue';
      }
      case'cortina': {
        return 'brown';
      }
      case'vals': {
        return 'pink';
      }
      case 'milonga': {
        return 'yellow';
      }
      default:
        return '';
    }
  }*/

  handleClickOnLine = () => {
    let tango = this.props.tango;
    console.log(tango.path);
    this.props.dispatch(playerActions.updateCurrentTango(tango));

  };

  getLineContent() {
    let sizedRows = this.props.sizedRows;
    let tango: tango = this.props.tango;
    let ret = [];
    // let left = {...styles.leftAligned, paddingBottom: '5px'};
    // let center = {...styles.center, paddingBottom: '5px'};
    sizedRows.forEach(row => {
      let style;
      if (row.align === 'left') {
        style = {...styles.cell, minWidth: row.size};
      } else if (row.align === 'center') {
        style = {...styles.cell, ...styles.center, minWidth: row.size};
      }
      let value = tango[row.field];
      if (row.field === 'duration') {
        value = millisToMinutesAndSeconds(value)
      }
      ret.push(
        <div key={tango._id + '_' + row.field} style={style}>{value}</div>
      );
    });
    return ret;

  }

  render() {

    let tango: tango = this.props.tango;
    let root = {...styles.root, backgroundColor: tangoColors()[tango.genre]};
    return (
      <div style={root} onDoubleClick={this.handleClickOnLine}>
        {this.getLineContent()}
        {/*<div style={{...styles.cell, width: size[0]}}>{tango.title}</div>*/}
        {/*<div style={{...styles.cell, width: size[1]}}>{tango.artist}</div>*/}
        {/*<div style={{...styles.cell, width: size[2]}}>{tango.singer}</div>*/}
        {/*<div style={{...styles.cell, width: size[3]}}>{tango.album}</div>*/}
        {/*<div style={{...styles.cell, ...styles.center, width: size[4]}}>{tango.genre}</div>*/}
        {/*<div style={{...styles.cell, ...styles.center, width: size[5]}}>{tango.year}</div>*/}
        {/*<div style={{...styles.cell, ...styles.center, width: size[6]}}>{tango.bpmFromFile}</div>*/}
        {/*<div*/}
        {/*style={{...styles.cell, ...styles.center, width: size[7]}}>{millisToMinutesAndSeconds(tango.duration)}</div>*/}

      </div>
    );
  }
}

DataLine.propTypes = {
  tango: PropTypes.object.isRequired,
  sizedRows: PropTypes.array.isRequired,
};
export default connect()(DataLine);
