import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as playerActions from '../redux/actions/playerActions';
import * as sourceActions from '../redux/actions/sourceActions';
import {connect} from 'react-redux';
import {millisToMinutesAndSeconds, tangoColors} from '../services/utils';
import Playing from 'material-ui-icons/VolumeUp';
import Menu, {MenuItem} from 'material-ui/Menu';
import {ItemTypes} from '../services/dj-const';
import {DragSource} from 'react-dnd';

const tangoSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    float: 'left',
    cursor: 'pointer',
  },
  cell: {
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


  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      anchorEl: null,
      anchorPosition: {top: 0, left: 0},
      isDragging: false,
    }
  }

  handleClose = () => {
    this.setState({anchorEl: null, hover: false});
  };

  handleRightClick(event) {
    console.log(event.clientX);
    let position = {top: event.clientY - 35, left: event.clientX - 20};
    this.setState({anchorEl: event.currentTarget, anchorPosition: position});
  };

  handleLeftClick = (event) => {
    let shouldAdd = event.ctrlKey || event.shiftKey;
    let toAdd = [this.props.index,];
    if (event.shiftKey) {
      let maxIndex = this.props.selectedTangos.reduce(function (a, b) {
        return Math.max(a, b);
      });
      let minIndex = this.props.selectedTangos.reduce(function (a, b) {
        return Math.min(a, b);
      });
      if (this.props.index > maxIndex) {
        for (let i = maxIndex + 1; i < this.props.index; i++) {
          toAdd.push(i);
        }
      } else (this.props.index < minIndex)
      {
        for (let i = minIndex - 1; i > this.props.index; i--) {
          toAdd.push(i);
        }
      }
    }
    this.props.dispatch(sourceActions.updateSelectedTangoIndex(toAdd, this.props.selectedTangos, shouldAdd));
  };

  handleDoubleClick = () => {
    let tango = this.props.tango;
    console.log(tango.path);
    this.props.dispatch(playerActions.updateCurrentTango(tango));
    this.props.dispatch(sourceActions.updateCurrentIndex(this.props.index))

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

      if (row.field === 'genre' && !this.isTangoPlaying()) {
        style = {...style, backgroundColor: tangoColors()[tango.genre.replace('-', '_')]};
      }

      if (this.isInSelectedIndex() === true) {
        style = {...style, backgroundColor: 'black', color: '#f50057'}
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

      if (row.field === 'bpmHuman') {
        // value = tango.bpmFromFile === 0 ? tango.bpmHuman : tango.bpmFromFile;
        value = Math.round(tango[row.field] * 100) / 100
      }

      ret.push(
        <div key={tango._id + '_' + row.field} style={style}>{value}</div>
      );
    });
    return ret;

  }


  isTangoPlaying() {
    return this.props.tango._id === this.props.playedId;
  }

  handleContextMenu(event) {

    console.log('Display context menu');
    this.handleRightClick(event);
  }

  render() {

    const {connectDragSource, isDragging} = this.props;
    // console.log('is dragging:' + isDragging);
    const {anchorEl, anchorPosition} = this.state;
    let tango, root, rootBase;
    rootBase = {...this.props.style, ...styles.root, WebkitUserSelect: 'none'};
    tango: tango = this.props.tango;
    if (this.isTangoPlaying()) {
      root = {...rootBase, backgroundColor: '#3a3a3a', color: '#1ba500'}
    }
    else {
      root = {...rootBase};
    }

    if (this.state.hover === true && this.props.isMilonga === false) {
      root = {...root, backgroundColor: '#272727'}
    } else if (this.state.hover === true && this.props.isMilonga === true && this.props.isDragging === true) {
      console.log("I'm over a tango in milonga list");
      root = {...root, borderBottom: '1px solid white'}
    }
    let ref = this.props.tango.id;
    if (this.props.isMilonga === true) {
      ref += 'milonga';
    }
    return connectDragSource(
      <div
        ref={this.props.tango.id}
        style={root}
        onClick={this.handleLeftClick}
        onDoubleClick={this.handleDoubleClick}
        onMouseEnter={() => {
          this.setState({hover: true})
        }}
        onMouseMove={event => {
          // console.log();
          // console.log('Y:' + event.clientY, 'X:' + event.clientY);
        }}
        onMouseLeave={() => {
          this.setState({hover: false})
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          console.log('Display context menu');
          this.handleRightClick(event);
        }}

        draggable={true}
      >
        {this.getLineContent()}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorReference={'anchorPosition'}
          anchorPosition={anchorPosition}
        >
          <MenuItem onClick={this.handleClose}>Edit tango</MenuItem>
          <MenuItem onClick={this.handleClose}>Calculate bpm</MenuItem>
          <MenuItem onClick={this.handleClose}>Open with audacity</MenuItem>
        </Menu>

      </div>
    );
  }

  isInSelectedIndex() {
    return this.props.selectedTangos.find(element => {
      return element === this.props.index
    }) !== undefined;
  }
}

DataLine.defaultProps = {
  isMilonga: false,

};


DataLine.propTypes = {
  tango: PropTypes.object.isRequired,
  sizedRows: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isMilonga: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

DataLine = DragSource(ItemTypes.TANGO, tangoSource, collect)(DataLine);

export default connect((store) => {
  return {
    playedId: store.player.currentTango._id,
    selectedTangos: store.source.selectedTangos,
  }
})(DataLine);
