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
      ret.push(
        <div key={tango._id + '_' + row.field} style={style}>{value}</div>
      );
    });
    return ret;

  }

  render() {

    let tango: tango = this.props.tango;
    let root = {
      ...this.props.style, ...styles.root,
      backgroundColor: tangoColors()[tango.genre.replace('-', '_')],
      WebkitUserSelect: 'none'
    };
    return (
      <div style={root} onDoubleClick={this.handleClickOnLine}>
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
export default connect()(DataLine);
