import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as milongaActions from '../redux/actions/milongaActions';
import Save from '@material-ui/icons/Save';
import OpenMilonga from '@material-ui/icons/FolderOpen';
import Info from '@material-ui/icons/Info';
import Delete from '@material-ui/icons/DeleteForever';
import Sweep from '@material-ui/icons/DeleteSweep'
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import VirtualList from 'react-tiny-virtual-list';
import {ItemTypes, sortStatus as SORT} from "../services/dj-const";
import DataLine from './data-line';
import * as djUtils from "./dj-utils";
import {DropTarget} from 'react-dnd';

const milongaTarget = {
  drop(props, monitor) {
    // moveTango(props.beforeId, props.afterId);
    //
    let tangoToAdd = djUtils.getTangoListFromIdList(props.selectedTangos, props.tangoList);

    // console.log(props.milonga.indexToDrop);
    // console.log(tangoToAdd);
    // console.log(props.milonga.list);
    props.dispatch(milongaActions.dropTangos(props.milonga.indexToDrop, tangoToAdd, props.milonga.list));


    // console.log(props, monitor);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

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
  mainHided: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // flexBasis: '25px',
    // minWidth: '25px',
    flex: '0 0 auto',
    borderLeft: '1pt solid ' + '#5f5f5f',
    overflow: 'hidden',
  },
  virtualListContainer: {
    flex: "1",
    display: 'flex',
    flexDirection: 'column',
  },

};

class MilongaList extends Component {
  handleClearMilonga = () => {
    this.props.dispatch(milongaActions.clearMilonga());
  };

  constructor(props) {
    super(props);
    this.state = {
      containerHeight: 600,
      containerWidth: 600,
      shouldHide: false,
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
    if (this.state.shouldHide === false) {
      const containerHeight = this.refs.virtualContainer.clientHeight;
      const containerWidth = this.refs.virtualContainer.clientWidth;
      this.setState({containerHeight, containerWidth});
    }
  }

  handleOnClick = () => {
    /*  // console.log("I have clicked on the div");
      let tangoToAdd = [];
      this.props.selectedTangos.forEach((id) => {
        // console.log("I will add tango "+this.props.tangoList[id].title);
        tangoToAdd.push(this.props.tangoList[id]);
      });
      console.log(tangoToAdd);
      this.props.dispatch(milongaActions.addTango(tangoToAdd, this.props.milonga.list));
  */
  };

  getHeader() {

    let sizedRows = djUtils.getSizedRows(rowsTemplate, this.state.containerWidth);
    // console.log(sizedRows);

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
        padding:'0 12px',
      },
      toolTip: {
        fontSize: '20px',
      },
      tooltip: {
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        minHeight: '30px',
      },
      overlayStyle: {
        // backgroundColor:'#000',
        opacity: '1'

      }
    };
    if (this.state.shouldHide === false) {
      return (
        <Paper style={styles.paperContainer} elevation={4} key={'filter_source_menu'}>
          <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Hide milonga panel'}</div>}
                   overlayStyle={styles.overlayStyle}>
            <IconButton
              style={styles.button}
              color={'secondary'}
              onClick={() => {
                this.setState({shouldHide: !this.state.shouldHide});
              }}
            >
              <ArrowRight style={styles.icon}/>
            </IconButton>
          </Tooltip>
          <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Save'}</div>}
                   overlayStyle={styles.overlayStyle}>
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

          <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Open a milonga'}</div>}
                   overlayStyle={styles.overlayStyle}>
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

          <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Show infos about Milonga'}</div>}
                   overlayStyle={styles.overlayStyle}>
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

          <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Delete the milonga'}</div>}
                   overlayStyle={styles.overlayStyle}>
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

          <Tooltip placement={'bottom'}
                   overlay={<div style={styles.tooltip}>{'Empty the milonga and start a new one'}</div>}
                   overlayStyle={styles.overlayStyle}>
            <IconButton
              style={styles.button}
              color={'secondary'}
              onClick={this.handleClearMilonga}
            >
              <Sweep style={styles.icon}/>
            </IconButton>
          </Tooltip>
        </Paper>
      );
    } else {
      return (
        <Tooltip placement={'bottom'} overlay={<div style={styles.tooltip}>{'Show milonga panel'}</div>}
                 overlayStyle={styles.overlayStyle}>
          <IconButton
            style={{...styles.button, width: '24px'}}
            color={'secondary'}
            onClick={() => {
              this.setState({shouldHide: !this.state.shouldHide});
            }}
          >
            {this.state.shouldHide === false && <ArrowRight style={styles.icon}/>}
            {this.state.shouldHide === true && <ArrowLeft style={styles.icon}/>}
          </IconButton>
        </Tooltip>
      );

    }
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
        key={'milonga_' + tango._id + '_' + params.index}
        isMilonga
      />
    );
  }

  render() {
    let milonga = this.props.milonga;
    const {x, y, connectDropTarget, isOver} = this.props;
    if (this.state.shouldHide !== true) {
      return connectDropTarget(
        <div
          style={styles.main}
          onClick={this.handleOnClick}
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
    } else {
      return (
        <div
          style={styles.mainHided}
          onClick={this.handleOnClick}
        >
          {this.getMenu()}
        </div>
      );
    }
  }

}

/*MilongaList.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};*/


MilongaList = DropTarget(ItemTypes.TANGO, milongaTarget, collect)(MilongaList);

export default connect((store) => {
  return {
    milonga: store.milonga,
    selectedTangos: store.source.selectedTangos,
    tangoList: store.source.displayTangoList,
  }

})(MilongaList);
