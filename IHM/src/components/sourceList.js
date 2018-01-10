import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as sourceActions from '../redux/actions/sourceActions';
import 'react-virtualized/styles.css';
import {Column, Table, SortDirection, SortIndicator} from 'react-virtualized';
// import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {LabeledInput, InputRow} from 'react-virtualized';
import * as utils from '../services/utils';
import DataLine from './data-line';

const styles = {
  leftAligned: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  sourceScrolling: {
    overflow: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flex: '1 1 auto',
    minHeight: '0px',
    flexDirection:'column',
  },
  mainSource: {
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
const sizeTemplate = ['auto', 'auto', 'auto', 'auto', 50, 50, 50, 50];

class SourceList extends Component {

  constructor(props) {
    super(props);
    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;
    const sortedList = props.tangoList;
    this.state = {
      disableHeader: false,
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: sortedList.length,
      scrollToIndex: undefined,
      sortBy,
      sortDirection,
      sortedList,
      useDynamicRowHeight: false,
    };

  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.dispatch(sourceActions.fetchAllTangos());
  }

  /**
   * Calculate the size au column labelled 'auto
   * @param containerSize size of the container in which the table is in (a div for example)
   * @returns {number} the size of column labeled 'auto'
   */
  getAutoSize(containerSize) {
    let autoNb = 0;
    let totalSize = 0;
    let margin = sizeTemplate.length * 2 + 30;
    sizeTemplate.forEach(element => {
      if (element === 'auto') {
        autoNb += 1;
      }
      else {
        totalSize += element
      }
    });
    return (containerSize - totalSize - margin) / autoNb;
  }

  /**
   * Get the table of size for each column
   * @returns {*[] | *}
   */
  getTableSizes() {
    let containerWidth, ret, autoSize = 0;
    ret = sizeTemplate.slice();

    if (document.getElementById('sources')) {
      containerWidth = document.getElementById('sources').getBoundingClientRect().width;
      autoSize = this.getAutoSize(containerWidth);
    }
    ret.forEach((elmt, index, table) => {
      if (elmt === 'auto') {
        table[index] = autoSize
      }
    });
    console.log(ret);
    return ret;
  }

  getHeader() {
    let tableSizes = this.getTableSizes();
    let left = {...styles.leftAligned, paddingBottom: '5px'};
    let center = {...styles.center, paddingBottom: '5px'};
    const table = {
      borderBottom: '1px solid red',
      marginBottom: '15px',
    };
    return [
      <table key={'tableSourceTitle'} style={table}>
        <thead>
        <tr>
          <th style={{...left, width: tableSizes[0]}}>Title</th>
          <th style={{...left, width: tableSizes[1]}}>Artist</th>
          <th style={{...left, width: tableSizes[2]}}>Singer</th>
          <th style={{...left, width: tableSizes[3]}}>Album</th>
          <th style={{...center, width: tableSizes[4]}}>Genre</th>
          <th style={{...center, width: tableSizes[5]}}>Year</th>
          <th style={{...center, width: tableSizes[6]}}>Bpm</th>
          <th style={{...center, width: tableSizes[7]}}>Time</th>
        </tr>
        </thead>
      </table>
    ];
  }

  selectedRow(id, selected) {
    console.log(selected.Target);
    // console.log(selected.get());
  }

  updateTango = (tango) => {
    console.log('should play '+tango.path);
  };

  getBody() {
    let tableSizes = this.getTableSizes();
    let left = {...styles.leftAligned};
    let innerLeft = {...left, ...styles.ellipsis};
    let center = {...styles.center};
    let innerCenter = {...center, ...styles.ellipsis};
    return this.props.tangoList.map((tango: tango) => {
      return ( <DataLine tango={tango} sizeTable={tableSizes} key={tango._id}/> );
    });
  }

  getDatas() {

    return [
      this.getHeader(),
      <div key={'source-scrolling'} style={styles.sourceScrolling}>
        {/*<table>*/}
          {/*<tbody>*/}
          {this.getBody()}
          {/*</tbody>*/}
        {/*</table>*/}
      </div>
    ];
  }

  render() {


    return (
      <div style={styles.mainSource} id='sources'>
        {this.getDatas()}
      </div>


    );
  }


}


export default connect((store) => {
  return {
    tangoList: store.source.tangoList,
  }

})(SourceList);


/*
<tr key={'sourceTango_' + tango._id} style={{backgroundColor: tango.genre === 'tango' ? 'blue' : '#2a2a2a'}}
            onDoubleClick={this.updateTango(tango)}>
          <td>
            <div style={{...innerLeft, width: tableSizes[0]}}>{tango.title}</div>
          </td>
          <td>
            <div style={{...innerLeft, width: tableSizes[1]}}>{tango.artist} </div>
          </td>
          <td>
            <div style={{...innerLeft, width: tableSizes[2]}}>{tango.singer}</div>
          </td>
          <td>
            <div style={{...innerLeft, width: tableSizes[3]}}>{tango.album}</div>
          </td>
          <td>
            <div style={{...innerCenter, width: tableSizes[4]}}>{tango.genre}</div>
          </td>
          <td>
            <div style={{...innerCenter, width: tableSizes[5]}}>{tango.year}</div>
          </td>
          <td>
            <div style={{...innerCenter, width: tableSizes[6]}}>{tango.bpmFromFile}</div>
          </td>
          <td>
            <div style={{...innerCenter, width: tableSizes[7]}}>{utils.millisToMinutesAndSeconds(tango.duration)}</div>
          </td>
        </tr>
 */