import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as playerActions from '../redux/actions/playerAction';
import {connect} from 'react-redux';

const styles = {
  root: {
    width: '100%',
    height: '25px',
    cursor: 'pointer',
  },
  cell: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }
};


class DataLine extends Component {

  handleClickOnLine = () => {
  let tango = this.props.tango;
  console.log(tango.path);
  this.props.dispatch(playerActions.updateCurrentTango(tango));

  };

  render() {
    let size = this.props.sizeTable;
    let tango: tango = this.props.tango;
    return (
      <div style={styles.root} onDoubleClick={this.handleClickOnLine}>
        <div style={{...styles.cell, width: size[0]}}>{tango.path}</div>

      </div>
    );
  }
}

DataLine.propTypes = {
  tango: PropTypes.object.isRequired,
  sizeTable: PropTypes.array.isRequired,
};
export default connect()(DataLine);
