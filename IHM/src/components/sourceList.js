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
    flexDirection: 'column',
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
// const sizeTemplate = [40, 'auto', 'auto', 'auto', 'auto', 150, 50, 40, 40];
{/*<th style={{...left, width: tableSizes[0]}}>Title</th>*/
}
{/*<th style={{...left, width: tableSizes[1]}}>Artist</th>*/
}
{/*<th style={{...left, width: tableSizes[2]}}>Singer</th>*/
}
{/*<th style={{...left, width: tableSizes[3]}}>Album</th>*/
}
{/*<th style={{...center, width: tableSizes[4]}}>Genre</th>*/
}
{/*<th style={{...center, width: tableSizes[5]}}>Year</th>*/
}
{/*<th style={{...center, width: tableSizes[6]}}>Bpm</th>*/
}
{/*<th style={{...center, width: tableSizes[7]}}>Time</th>*/
}

const rowsTemplate = [
  {
    name: '',
    field: '',
    size: 40,
    align:'center',
  },
  {
    name: 'Title',
    field: 'title',
    size: 'auto',
    align:'left',
  }, {
    name: 'Artist',
    field: 'artist',
    size: 'auto',
    align:'left',
  },
  {
    name: 'Singer',
    field: 'singer',
    size: 'auto',
    align:'left',
  },
  {
    name: 'Album',
    field: 'album',
    size: 'auto',
    align:'left',
  },
  {
    name: 'Genre',
    field: 'genre',
    size: 150,
    align:'center',
  },
  {
    name: 'Year',
    field: 'year',
    size: 50,
    align:'center',
  },
  {
    name: 'Bpm',
    field: 'bpmFromFile',
    size: 40,
    align:'center',
  },
  {
    name: 'Time',
    field: 'duration',
    size: 40,
    align:'center',
  },
];

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

  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    /*if (this.props.tangoList.length === 0) {
      this.props.dispatch(sourceActions.fetchAllTangos());
    }*/

  }

  /**
   * Calculate the size au column labelled 'auto
   * @param containerSize size of the container in which the table is in (a div for example)
   * @returns {number} the size of column labeled 'auto'
   */
  getAutoSize(containerSize) {
    let autoNb = 0;
    let totalSize = 0;
    let margin = rowsTemplate.length * 2 + 30;
    rowsTemplate.forEach(element => {
      // console.log(element);
      if (element.size === 'auto' || element.size === 0) {
        autoNb += 1;
      }
      else {
        totalSize += element.size
      }
    });
    return (containerSize - totalSize - margin) / autoNb;
  }

  /**
   * Get the table of size for each column
   * @returns {*[] | *}
   */
  getSizedRows() {
    let containerWidth, ret, autoSize = 0;
    ret = rowsTemplate.slice();

    if (document.getElementById('sources')) {
      containerWidth = document.getElementById('sources').getBoundingClientRect().width;
      autoSize = this.getAutoSize(containerWidth);
    }
    ret.forEach((elmt, index, table) => {
      if (elmt.size === 'auto' || elmt.size === 0) {
        table[index].size = autoSize
      }
    });
    // console.log(ret);
    return ret;
  }

  getHeaderContent(sizedRows){
    let ret=[];
    let left = {...styles.leftAligned, paddingBottom: '5px'};
    let center = {...styles.center, paddingBottom: '5px'};
    sizedRows.forEach(row=>{
      let style;
      if(row.align === 'left'){
        style = {...left, minWidth:row.size};
      }else if (row.align ==='center' ){
        style = {...center, minWidth:row.size};
      }
      ret.push(
        <th key={'header_'+row.name}style={style}>{row.name}</th>
      );
    });
    return ret;

  }
  getHeader() {
    let sizedRows = this.getSizedRows();
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
          {this.getHeaderContent(sizedRows)}
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
    console.log('should play ' + tango.path);
  };

  getBody() {
    let sizedRows = this.getSizedRows();
    let left = {...styles.leftAligned};
    let innerLeft = {...left, ...styles.ellipsis};
    let center = {...styles.center};
    let innerCenter = {...center, ...styles.ellipsis};
    return this.props.tangoList.map((tango: tango) => {
      return (<DataLine tango={tango} sizedRows={sizedRows} key={tango._id}/>);
    });
  }

  getDatas() {

    return [
      this.getHeader(),
      <div key={'source-scrolling'} style={styles.sourceScrolling}>
        {this.getBody()}
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