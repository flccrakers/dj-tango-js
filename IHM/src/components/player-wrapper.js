import React, {Component} from 'react';
import Play from "material-ui-icons/PlayArrow";
import IconButton from "material-ui/IconButton/index";
import {connect} from "react-redux";
import Stop from 'material-ui-icons/Stop';
import Pause from 'material-ui-icons/Pause';
import * as utils from '../services/utils';
import * as playerActions from '../redux/actions/playerAction';
import * as sourceActions from "../redux/actions/sourceActions";
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Howl, Howler} from 'howler';

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
let start = null

class PlayerWrapper extends Component {

  constructor(props) {
    super(props);
    this.sound = null;
    this.start = null;
    this.state={
      progress:0,
      isFading : false,
    };
    window.requestAnimationFrame(this.step);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.playerData.currentTango.path !== '' && this.props.playerData.currentTango.path !== nextProps.playerData.currentTango.path) {
      this.stop();
      this.initHowl(nextProps.playerData.currentTango.path, nextProps.playerData.currentTangoSong);
      this.play();
    }
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    if nextProps.playerData.currentTango.path === this.props.playerData.currentTango.path;
  }*/

  step = (timestamp) => {
    if (this.sound !== null) {
      // console.log(this.sound.seek());
      if (this.start === null) {
        this.start = 0;
      }
      this.listen(this.sound.seek() || 0);
    }

    // If the sound is still playing, continue stepping.
    if (this.sound !== null && this.sound.playing()) {
      window.requestAnimationFrame(this.step);
    }


  };

  initHowl(path, songFile) {
    console.log(path.split('.').pop());
    let ext = path.split('.').pop();
    this.sound = new Howl(
      {
        src: songFile,
        format: [ext],
        onend: () => {
          console.log('Finished!');
          this.playNext();
        },
        onplay: this.handleStartPlay,
      });
    console.log('howl initiated');
    console.log(this.sound);
  }

  handleStartPlay = () => {
    window.requestAnimationFrame(this.step);
  };

  play = () => {
    if (this.sound === null){this.initHowl(this.props.playerData.currentTango.path, this.props.playerData.currentTangoSong)}
    this.props.dispatch(playerActions.updateVolume(1));
    this.props.dispatch(playerActions.updatePause(false));
    this.sound.play();
  };

  pause = () => {
    this.sound.pause()
  };

  stop = () => {
    if (this.sound !== null) {
      this.sound.stop();
      this.sound.unload();
      this.sound = null;
      this.setState({progress:0});
    }
    this.props.dispatch(playerActions.updateVolume(1));
    this.props.dispatch(playerActions.updatePause(true));

  };

  handlePlayPause = () => {

    if (this.sound !== null && this.sound.playing()) {
      this.props.dispatch(playerActions.updatePause(true));
      this.pause();
    } else {
      this.props.dispatch(playerActions.updatePause(false));
      this.play();

      // this.rap.audioEl.pause();
    }
  };


  listen = (position) => {

    position = Math.round(position*1000);
    this.setState({progress:position});
    let tango = this.props.playerData.currentTango;
    let volume = this.props.playerData.volume;
    if (tango.genre === 'cortina' && position >= cortinaDuration-fadeoutDuration && this.state.isFading === false) {
      console.log("I'm suppose to fade out");
      this.sound.fade(1,0, fadeoutDuration);
      this.setState({isFading:true});
    } else if (tango.genre === 'cortina' && position > cortinaDuration) {
      console.log("I'm supposed to end the song");
      this.playNext();
    }
  };

  playNext() {
    this.stop();
    this.setState({isFading:false});
    // console.log("I'm supposed to play next Tango");
    // console.log('current Index: ' + this.props.source.currentIndex);
    let index = this.props.source.currentIndex;
    let tango = this.props.source.displayTangoList[index + 1];
    // console.log(tango.path);
    this.props.dispatch(playerActions.updateCurrentTango(tango));
    this.props.dispatch(sourceActions.updateCurrentIndex(index + 1));
  }

  ended = (event) => {
    console.log(event);
    let audioElement = this.rap.audioEl;

    // let  audioElement = document.getElementById('audioElement').audioEl;
    audioElement.pause();
    audioElement.src = ""; // empty source
    audioElement.title = "";
    // audioElement.load();
    console.log(audioElement);
    this.playNext();
  };

  onUpdate = update => {
    this.setState({update})
  };

  onChange = values => {
    this.setState({values})
  };

  getTitle() {

    // noinspection JSAnnotator
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
    //this.rap.audioEl.currentTime = value / 1000;
    this.sound.seek(value/1000);
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
              value={this.state.progress || 0}
              max={this.props.playerData.currentTango.duration || 100}
              step={1}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              onChange={this.seekSlider}

            />
          </div>
          <span
            style={styles.progressDigit}>{utils.millisToMinutesAndSeconds(this.state.progress)} / {utils.millisToMinutesAndSeconds(this.props.playerData.currentTango.duration)}</span>
          <IconButton
            style={styles.button}
            color={'secondary'}
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
            color={'secondary'}
            onClick={this.stop}
          >
            <Stop style={styles.icon}/>
          </IconButton>


        </div>

      </div>

    );
  }

  handleOnPause = (value) => {
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
(PlayerWrapper);
