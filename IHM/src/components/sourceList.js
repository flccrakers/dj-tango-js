import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as sourceActions from '../redux/actions/sourceActions';
import 'react-virtualized/styles.css';
import VirtualList from 'react-tiny-virtual-list';
import DataLine from './data-line';
import {sortStatus as SORT} from '../services/dj-const';
import ArrowUp from 'material-ui-icons/ArrowDropUp';
import ArrowDown from 'material-ui-icons/ArrowDropDown';

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
  virtualListContainer: {
    flex: "1",
    display: 'flex',
    flexDirection: 'column',
  },
};


const rowsTemplate = [
  {
    name: '',
    field: 'played',
    size: 40,
    align: 'center',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Title',
    field: 'title',
    size: 'auto',
    align: 'left',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Artist',
    field: 'artist',
    size: 'auto',
    align: 'left',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Singer',
    field: 'singer',
    size: 'auto',
    align: 'left',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Album',
    field: 'album',
    size: 'auto',
    align: 'left',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Genre',
    field: 'genre',
    size: 100,
    align: 'left',
    sortStatus: SORT.ASC,
  },
  {
    name: 'Year',
    field: 'year',
    size: 50,
    align: 'center',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Bpm',
    field: 'bpmFromFile',
    size: 40,
    align: 'center',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Time',
    field: 'duration',
    size: 40,
    align: 'center',
    sortStatus: SORT.NONE,
  },
];

class SourceList extends Component {

  constructor(props) {
    super(props);
    const sortBy = 'index';
    //const sortDirection = SortDirection.ASC;
    // const sortedList = props.tangoList;
    this.state = {
      containerHeight: 600,

    };

  }


  componentDidMount() {
    const containerHeight = this.refs.virtualContainer.clientHeight;
    this.setState({containerHeight});
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps);
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
    let margin = rowsTemplate.length * 4 + 30;
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

  getHeaderContent(sizedRows) {
    let ret = [];
    let left = {...styles.leftAligned, padding: '0px 2px 5px 2px', WebkitUserSelect:'none'};
    let center = {...styles.center, padding: '0px 2px 5px 2px', WebkitUserSelect:'none'};
    let titleContainer = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
    };
    // console.log(this.props.source.sortingField);
    sizedRows.forEach(row => {
      let style;
      if (row.align === 'left') {
        style = {...left, minWidth: row.size, height:'24px'};
      } else if (row.align === 'center') {
        style = {...center, minWidth: row.size, height:'24px'};
      }
      let sort = [];

      if (row.field === this.props.source.sortingField) {
        // console.log('sortingStatus: ' + this.props.source.sortingStatus);
        if (this.props.source.sortingStatus === SORT.ASC) {
          sort = [<ArrowUp style={{color: 'white'}} key={'sortUp'}/>];
        }
        else if (this.props.source.sortingStatus === SORT.DESC) {
          sort = [<ArrowDown style={{color: 'white'}} key={'sortDown'}/>];
        }
      }

      ret.push(
        <th key={'header_' + row.name} style={style} onClick={(event) => {
          this.handleTitleClick(event,row.name)
        }}>
          <div style={titleContainer}>
            {row.name}{sort}
          </div>
        </th>
      );
    });
    return ret;

  }

  getHeader() {
    let sizedRows = this.getSizedRows();
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

  rowRenderer = (params) => {
    let sizedRows = this.getSizedRows();
    let tango = this.props.source.tangoList[params.index];
    return (
      <DataLine tango={tango} sizedRows={sizedRows} rowHeight={this.props.source.listRowHeight} style={params.style} index={params.index}
                key={tango._id}/>);
  };


  _noRowsRenderer = () => {
    return (<span>NOTHING</span>);
  };


  render() {

    let source: sourceReducer = this.props.source;
    return (
      <div style={styles.mainSource} id='sources'>
        {this.getHeader()}
        <div style={styles.virtualListContainer} ref={'virtualContainer'}>
          <VirtualList
            width='100%'
            height={this.state.containerHeight + source.listRowHeight}
            itemCount={source.tangoList.length}
            itemSize={source.listRowHeight} // Also supports variable heights (array or function getter)
            renderItem={(index, style) => {
              return (this.rowRenderer(index))
            }}
          />

        </div>
      </div>


    );
  }


  handleTitleClick(event, field) {
    event.preventDefault();
    console.log(field);
    this.updateTitleStatus(field.toLowerCase());
    // this.sortData();

  }

  updateTitleStatus(newField) {
    let field = this.props.source.sortingField;
    let status = this.props.source.sortingStatus;
    if (newField !== field) {
      status = SORT.NONE;
    }

    this.props.dispatch(sourceActions.updateSortStatusAndSort(newField, status, this.props.source.tangoList));

  }

  sortData() {
    let datas, field, sortDirection;
    datas = this.props.source.tangoList;
    field = this.props.source.sortingField;
    sortDirection = this.props.source.sortingStatus;

    this.props.dispatch(sourceActions.sortDatas(datas,field,sortDirection))
  }
}


export default connect((store) => {
  return {
    // tangoList: store.source.tangoList,
    source: store.source,
  }

})(SourceList);


