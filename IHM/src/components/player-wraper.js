import React, {Component} from 'react';
import Play from "material-ui-icons/PlayArrow";
import IconButton from "material-ui/IconButton/index";
import Button from "material-ui/Button/index";
import ReactAudioPlayer from 'react-audio-player';
import {connect} from "react-redux";
import Stop from 'material-ui-icons/Stop';
import * as utils from '../services/utils';
import * as playerActions from '../redux/actions/playerAction';
import Slider from 'react-compound-slider';

const styles = {
  playerRoot: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '50px',
  },
  audioPlayer: {
    flex: '0 1 auto',
    padding: '0px',
    margin: '0px',
    backgroundColor: '#2a2a2a',
  },
  leftPart: {
    display: 'flex',
    flex: '1 1 50%',
    alignItems: 'center',
  },
  rightPart: {
    display: 'flex',
    flex: '1 1 50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
  icon: {
    width: '48px',
    height: '48px',
  },
  progressDigit: {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'bold',
  }
};


const domain = [100, 500];
const defaultValues = [150];

class PlayerWraper extends Component {

  playTango = () => {
    this.rap.audioEl.play();
  };
  stopTango = () => {
    this.rap.audioEl.pause();
  };
  listen = (event) => {
    // console.log(utils.millisToMinutesAndSeconds(event*1000));
    this.props.dispatch(playerActions.progress(event * 1000));
  };

  onUpdate = update => {
    this.setState({update})
  };

  onChange = values => {
    this.setState({values})
  };

  getTitle() {

    let tango: tango, ret, styles, space, color;
    tango = this.props.playerData.currentTango;
    ret = null;
    space = '8px';
    color = 'white';
    styles = {
      genre: {
        color,
        fontSize: '40px',
        fontWeight: 'bold',
      },
      title: {
        color,
      },
      orchestra: {},
      titleContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      separator: {
        minWidth: '1px',
        minHeight: '48px',
        marginLeft: space,
        marginRight: space,
        backgroundColor: color,
      }
    };

    if (tango.path !== '') {

      ret = [
        <span style={styles.genre} key={'title_genre'}>{tango.genre.toUpperCase()}</span>,
        <div style={styles.separator} key={'title_separator'}/>,
        <div style={styles.titleContainer} key={'title_title'} >
          <span style={styles.title} >{tango.title}</span>
          <span style={styles.title} >{tango.artist} ( {tango.singer} - {tango.year} )</span>
        </div>
      ];

      return ret;
    }
  }

  render() {


    return (
      <div style={styles.playerRoot}>
        <div style={styles.leftPart}>
          {this.getTitle()}

        </div>
        <div style={styles.rightPart}>
          <span
            style={styles.progressDigit}>{utils.millisToMinutesAndSeconds(this.props.playerData.progress)} / {utils.millisToMinutesAndSeconds(this.props.playerData.currentTango.duration)}</span>
          <IconButton
            style={styles.button}
            color={'accent'}
            onClick={this.playTango}
          >
            <Play style={styles.icon}/>
          </IconButton>
          <IconButton
            style={styles.button}
            color={'accent'}
            onClick={this.stopTango}
          >
            <Stop style={styles.icon}/>
          </IconButton>

          <ReactAudioPlayer
            ref={(element) => {
              this.rap = element;
            }}
            style={styles.audioPlayer}
            src={this.props.playerData.currentTangoSong}
            autoPlay={true}
            listenInterval={300}
            onListen={this.listen}
          />
        </div>

      </div>

    );
  }

}

export default connect(
  (store) => {
    return {
      playerData: store.player
      ,

    }
  })
(PlayerWraper);
