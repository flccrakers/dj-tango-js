import React, {Component} from 'react';
import Play from "material-ui-icons/PlayArrow";
import IconButton from "material-ui/IconButton/index";
// import Button from "material-ui/Button/index";
import ReactAudioPlayer from 'react-audio-player';
import {connect} from "react-redux";
import Stop from 'material-ui-icons/Stop';
import Pause from 'material-ui-icons/Pause';
import * as utils from '../services/utils';
import * as playerActions from '../redux/actions/playerAction';
import * as sourceActions from "../redux/actions/sourceActions";
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';


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
    // flex: '1 1 auto',
    alignItems: 'center',
    marginRight: '15px',
  },
  rightPart: {
    display: 'flex',
    flex: '1 1 auto',
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


const cortinaDuration = 15 * 1000;
const fadeoutDuration = 5 * 1000; // in milliseconds
const listenInterval = 300; //in milliseconds
class PlayerWraper extends Component {

  constructor(props) {
    super(props);
    this.rap = null;
  }

  // componentDidMount(){
  //   this.props.dispatch(playerActions.saveAudioEl(this.rap));
  // }
  playTango = () => {
    this.rap.audioEl.play();
  };
  stopTango = () => {
    let audioElement = this.rap.audioEl;

    // let  audioElement = document.getElementById('audioElement').audioEl;
    audioElement.pause();
    audioElement.src =""; // empty source
    audioElement.load();


    // audio.pause();
    // audio.remove();
    // this.rap = undefined;
    // this.rap = document.getElementById('audioElement');
    // audio = undefined;
    // console.log(audio);
    // audio.src = '';
    // audio.load();

    // audio.disconnect(0);

    // this.rap.audioEl.currentTime = this.props.playerData.currentTango.duration / 1000 +1000;
    this.props.dispatch(playerActions.progress(0));
    this.props.dispatch(playerActions.updateVolume(1));
    this.props.dispatch(playerActions.updatePause(true));

  };

  handlePlayPause = () => {

    if (this.props.playerData.isPaused) {
      this.props.dispatch(playerActions.updatePause(false));
      this.rap.audioEl.play();
    } else {
      this.props.dispatch(playerActions.updatePause(true));
      this.rap.audioEl.pause();
    }
  };


  listen = (position) => {
    let tango = this.props.playerData.currentTango;
    let volume = this.props.playerData.volume;
    this.props.dispatch(playerActions.progress(position * 1000));
    if (tango.genre === 'cortina' && position * 1000 >= cortinaDuration - fadeoutDuration && position * 1000 <= cortinaDuration) {
      // this.rap.audioEl.volume= this.rap.audioEl.volume - 0.8;
      this.props.dispatch(playerActions.updateVolume(volume - listenInterval / fadeoutDuration));
      console.log(this.rap.audioEl.volume);
      console.log("I'm supposed to fade out");
    } else if (tango.genre === 'cortina' && position * 1000 > cortinaDuration) {
      console.log("I'm supposed to end the song");

      this.playNext();


    }
  };

  playNext() {
    this.stopTango();
    console.log("I'm supposed to play next Tango");
    console.log('current Index: ' + this.props.source.currentIndex);
    let index = this.props.source.currentIndex;
    let tango = this.props.source.tangoList[index + 1];
    console.log(tango.path);
    this.props.dispatch(playerActions.updateCurrentTango(tango));
    this.props.dispatch(sourceActions.updateCurrentIndex(index + 1));
  }

  ended = (event) => {
    console.log(event);
    this.playNext();
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
        <div style={styles.titleContainer} key={'title_title'}>
          <span style={styles.title}>{tango.title}</span>
          <span style={styles.title}>{tango.artist} ( {tango.singer} - {tango.year} )</span>
        </div>
      ];

      return ret;
    }
  }

  seekSlider = (value) => {
    console.log(value);
    // this.props.dispatch(playerActions.progress(value));
    this.rap.audioEl.currentTime = value / 1000;
  };

  render() {
    let trackStyle = [{backgroundColor: '#ff4081'}];
    let handleStyle = [{backgroundColor: '#ff4081', borderColor: '#ff4081'}];

    return (
      <div style={styles.playerRoot}>
        <div style={styles.leftPart}>
          {this.getTitle()}

        </div>
        <div style={styles.rightPart}>
          <div style={{display: 'flex', flex: '1 1 auto', padding: '15px'}}>
            <Slider
              value={this.props.playerData.progress || 0}
              max={this.props.playerData.currentTango.duration || 100}
              step={100}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              onChange={this.seekSlider}

            />
          </div>
          <span
            style={styles.progressDigit}>{utils.millisToMinutesAndSeconds(this.props.playerData.progress)} / {utils.millisToMinutesAndSeconds(this.props.playerData.currentTango.duration)}</span>
          <IconButton
            style={styles.button}
            color={'accent'}
            onClick={this.handlePlayPause}
          >
            {this.props.playerData.isPaused &&
            <Play style={styles.icon}/>
            }
            {!this.props.playerData.isPaused &&
            <Pause style={styles.icon}/>
            }


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
            id={'audioElement'}
            style={styles.audioPlayer}
            src={this.props.playerData.currentTangoSong}
            autoPlay={true}
            listenInterval={listenInterval}
            onListen={this.listen}
            onEnded={this.ended}
            volume={this.props.playerData.volume}
            onPause={this.handleOnPause}
            // onPlay={this.props.dispatch(playerActions.updatePause(false))}
            // controls

          />
        </div>

      </div>

    );
  }

  handleOnPause=(value)=>{
    console.log(value);
    // if (!this.props.playerData.isPaused)this.props.dispatch(playerActions.updatePause(true))
  };
}

export default connect(
  (store) => {
    return {
      playerData: store.player,
      source: store.source,
    }
  })
(PlayerWraper);
