import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as milongaActions from '../redux/actions/milongaActions';
import Save from 'material-ui-icons/Save';
import OpenMilonga from 'material-ui-icons/FolderOpen';
import Info from 'material-ui-icons/Info';
import Delete from 'material-ui-icons/DeleteForever';
import Sweep from 'material-ui-icons/DeleteSweep'
import IconButton from "material-ui/IconButton/index";
import Paper from "material-ui/es/Paper/Paper";
import Tooltip from 'material-ui/Tooltip';
import VirtualList from 'react-tiny-virtual-list';
import {sortStatus as SORT} from "../services/dj-const";
import DataLine from './data-line';
import * as djUtils from "./dj-utils";

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
  virtualListContainer: {
    flex: "1",
    display: 'flex',
    flexDirection: 'column',
  },

};

class MilongaList extends Component {
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

  handleOnClick = () => {
    // console.log("I have clicked on the div");
    let tangoToAdd = [];
    this.props.selectedTangos.forEach((id) => {
      // console.log("I will add tango "+this.props.tangoList[id].title);
      tangoToAdd.push(this.props.tangoList[id]);
    });
    console.log(tangoToAdd);
    this.props.dispatch(milongaActions.addTango(tangoToAdd, this.props.milonga.list));

  };

  getHeader() {

    let sizedRows = djUtils.getSizedRows(rowsTemplate, this.state.containerWidth);
    console.log(sizedRows);

  }

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
      toolTip: {
        fontSize: '20px',
      }
    };
    return (
      <Paper style={styles.paperContainer} elevation={4} key={'filter_source_menu'}>
        <Tooltip id="tooltip-icon" title="Save" style={{fontSize: '25px'}}>
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

  rowRenderer(params) {

    let sizedRows = djUtils.getSizedRows(rowsTemplate, this.state.containerWidth);
    let tango = this.props.milonga.list[params.index];
    return (
      <DataLine
        tango={tango}
        sizedRows={sizedRows}
        rowHeight={this.props.milonga.listRowHeight}
        style={params.style}
        index={params.index}
        key={'milonga_' + tango._id+'_'+params.index}
      />
    );
  }

  render() {
    let milonga = this.props.milonga;
    return (
      <div
        style={styles.main}
        onClick={this.handleOnClick}
        ref={'milonga'}
      >
        {this.getMenu()}
        {this.getHeader()}
        <div style={styles.virtualListContainer} ref={'virtualContainer'}>
          <VirtualList
            width='100%'
            height={this.state.containerHeight + milonga.listRowHeight}
            itemCount={milonga.list.length}
            itemSize={milonga.listRowHeight} // Also supports variable heights (array or function getter)
            renderItem={(index, style) => {
              return (this.rowRenderer(index))
            }}
          />
        </div>

      </div>
    );
  }

}

export default connect((store) => {
  return {
    milonga: store.milonga,
    selectedTangos: store.source.selectedTangos,
    tangoList: store.source.displayTangoList,
  }

})(MilongaList);
