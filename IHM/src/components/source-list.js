import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as sourceActions from '../redux/actions/sourceActions';
import IconButton from "material-ui/IconButton/index";
// import 'react-virtualized/styles.css';
import VirtualList from 'react-tiny-virtual-list';
import DataLine from './data-line';
import {sortStatus as SORT} from '../services/dj-const';
import ArrowUp from 'material-ui-icons/ArrowDropUp';
import ArrowDown from 'material-ui-icons/ArrowDropDown';
import Shuffle from 'material-ui-icons/Shuffle';
import Refresh from 'material-ui-icons/Refresh';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';
import Paper from "material-ui/es/Paper/Paper";
import * as djUtils from './dj-utils';

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
  filterButton: {
    padding: '0px',
    margin: '0px',
    height: '24px',
  },
  icon: {
    width: '24px',
    height: '24px',
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
    align: 'center',
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
    field: 'bpmHuman',
    size: 80,
    align: 'center',
    sortStatus: SORT.NONE,
  },
  {
    name: 'Time',
    field: 'duration',
    size: 40,
    align: 'center',
    sortStatus: SORT.NONE,
  }
];

const filterTemplate = [
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
    size: 150,
    align: 'center',
    sortStatus: SORT.ASC,
  },
];


class SourceList extends Component {

  handleShuffle = () => {
    this.props.dispatch(sourceActions.shuffleTangoList(this.props.source.displayTangoList))
  };

  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 600,
      containerWidth: 600,
    };

  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    const containerHeight = this.refs.virtualContainer.clientHeight;
    const containerWidth = this.refs.virtualContainer.clientWidth;
    this.setState({containerHeight, containerWidth});
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    /*if (this.props.tangoList.length === 0) {
      this.props.dispatch(sourceActions.fetchAllTangos());
    }*/

  }

  handleClickListItem(field, event) {
    console.log(field);
    let anchorEl = this.props.source.anchorEl;
    anchorEl[field] = event.currentTarget;
    this.setState({anchorEl});
  }

  handleMenuItemClick = (event, index, field) => {
    // console.log(index, field,);
    let {selectedIndex, anchorEl} = this.props.source;
    selectedIndex[field] = index;
    anchorEl[field] = null;
    this.props.dispatch(sourceActions.updateFilter(anchorEl, selectedIndex));
    this.props.dispatch(sourceActions.filterTangoList(selectedIndex, this.props.source.filterList, this.props.source.tangoList, this.props.source.sortingDatas))
  };

  handleClose = (field) => {
    // console.log(field + ' to close');
    let anchorEl = this.props.source.anchorEl;
    anchorEl[field] = null;
    this.props.dispatch(sourceActions.updateAnchorState(anchorEl));
  };


  getFilterContent(sizedRows) {
    let ret = [];
    let left = {...styles.leftAligned, padding: '0px 2px 0px 2px', WebkitUserSelect: 'none'};
    let center = {...styles.center, padding: '0px 2px 0px 2px', WebkitUserSelect: 'none'};
    let titleContainer = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
    };
    let optionsList = this.props.source.filterList;
    const anchorEl = this.props.source.anchorEl;
    if (optionsList !== null) {
      sizedRows.forEach(row => {
        let style;
        if (row.align === 'left') {
          style = {...left, width: row.size, height: '24px'};
        } else if (row.align === 'center') {
          style = {...center, width: row.size, height: '24px'};
        }
        // console.log(row.name);
        if (row.name !== '') {
          // console.log(optionsList[row.field]);
          ret.push(
            <div key={'filter_' + row.name} style={style}>
              <List style={styles.filterButton}>
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="When device is locked"
                  onClick={this.handleClickListItem.bind(this, row.field)}
                  style={styles.filterButton}
                >
                  <ListItemText
                    primary={optionsList[row.field][this.props.source.selectedIndex[row.field]] || ''}
                  />
                </ListItem>
              </List>
              <Menu
                id={"lock-menu" + row.name}
                anchorEl={anchorEl[row.field]}
                open={Boolean(anchorEl[row.field])}
                onClose={this.handleClose.bind(this, row.field)}
                // classes={styles.filterButton}
                styles={styles.filterButton}
              >
                {optionsList[row.field].map((option, index) => {
                  return (
                    <MenuItem
                      key={option}
                      selected={index === this.props.source.selectedIndex[row.field]}
                      onClick={event => this.handleMenuItemClick(event, index, row.field)}
                    >
                      {option}
                    </MenuItem>
                  )
                })}
              </Menu>
            </div>
          );
        } else {
          ret.push(
            <th key={'filter_' + row.name} style={style}>
              <div style={titleContainer}>
              </div>
            </th>
          );
        }
      });
    }
    return ret;

  }

  getHeaderContent(sizedRows) {
    let ret = [];
    let left = {...styles.leftAligned, padding: '0px 2px 5px 2px', WebkitUserSelect: 'none'};
    let center = {...styles.center, padding: '0px 2px 5px 2px', WebkitUserSelect: 'none'};
    let titleContainer = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
    };
    let sortingDatas = this.props.source.sortingDatas;
    sizedRows.forEach(row => {
      let style;
      if (row.align === 'left') {
        style = {...left, width: row.size, height: '24px'};
      } else if (row.align === 'center') {
        style = {...center, width: row.size, height: '24px'};
      }
      let sort = [];
      if (row.field === sortingDatas.sortingField) {
        if (sortingDatas.sortingDirection === SORT.ASC) {
          sort = [<ArrowUp style={{color: 'white'}} key={'sortUp'}/>];
        }
        else if (sortingDatas.sortingDirection === SORT.DESC) {
          sort = [<ArrowDown style={{color: 'white'}} key={'sortDown'}/>];
        }
      }

      ret.push(
        <th key={'header_' + row.name} style={style} onClick={(event) => {
          this.handleTitleClick(event, row.field)
        }}>
          <div style={titleContainer}>
            {row.name}{sort}
          </div>
        </th>
      );
    });
    return ret;

  }

  getFilter() {
    let sizedRows = djUtils.getSizedRows(filterTemplate, this.state.containerWidth - 100);

    const styles = {
      paperContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '0px 2px 5px 2px',
      },
      button: {
        height: '36px',
      }
    };
    return [
      <Paper style={styles.paperContainer} elevation={4} key={'filter_source_menu'}>
        <IconButton
          style={styles.button}
          color={'secondary'}
          onClick={this.handleShuffle}
        >
          <Shuffle style={styles.icon}/>
        </IconButton>
        <IconButton
          style={styles.button}
          color={'secondary'}
          onClick={() => {
            this.props.dispatch(sourceActions.clearFilter(this.props.source.filterList, this.props.source.tangoList, this.props.source.sortingDatas))
          }}
        >
          <Refresh style={styles.icon}/>
        </IconButton>
        {this.getFilterContent(sizedRows)}
      </Paper>
    ];
  }

  getHeader() {
    let sizedRows = djUtils.getSizedRows(rowsTemplate, this.state.containerWidth);
    // console.log(sizedRows);
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
    let sizedRows = djUtils.getSizedRows(rowsTemplate, this.state.containerWidth);
    let tango = this.props.source.displayTangoList[params.index];
    return (
      <DataLine tango={tango}
                sizedRows={sizedRows}
                rowHeight={this.props.source.listRowHeight}
                style={params.style}
                index={params.index}
                key={tango._id}
      />
    );
  };


  _noRowsRenderer = () => {
    return (<span>NOTHING</span>);
  };


  render() {

    let source: sourceReducer = this.props.source;
    return (
      <div style={styles.mainSource} id='sources' ref={'sources'}>
        {this.getFilter()}
        {this.getHeader()}
        <div style={styles.virtualListContainer} ref={'virtualContainer'}>
          <VirtualList
            width='100%'
            height={this.state.containerHeight + source.listRowHeight}
            itemCount={source.displayTangoList.length}
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
    // console.log(field);
    this.updateTitleStatus(field);

  }

  updateTitleStatus(newField) {
    let field = this.props.source.sortingDatas.sortingField;
    let status = this.props.source.sortingDatas.sortingDirection;
    if (newField !== field) {
      status = SORT.NONE;
    }
    this.props.dispatch(sourceActions.updateSortStatusAndSort(newField, status, this.props.source.displayTangoList));
  }

}


export default connect((store) => {
  return {
    // tangoList: store.source.tangoList,
    source: store.source,
  }

})(SourceList);


