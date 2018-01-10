import React, {Component} from 'react';
import Play from "material-ui-icons/PlayArrow";
import IconButton from "material-ui/IconButton/index";
import Button from "material-ui/Button/index";
import ReactAudioPlayer from 'react-audio-player';
import {connect} from "react-redux";
import Stop from 'material-ui-icons/Stop';

const styles={
  playerRoot: {
    display: 'flex',
    alignItems: 'center',
    minHeight:'50px',
  },
  audioPlayer: {
    flex: '0 1 auto',
    padding: '0px',
    margin: '0px',
    backgroundColor: '#2a2a2a',
  },
};
class PlayerWraper extends Component {

  playTango = () => {
    this.rap.audioEl.play();
  };
  stopTango = () => {
    this.rap.audioEl.pause();
  };

  /*handleLoadingTangos() {
    this.props.dispatch(sourceActions.fetchAllTangos())
    //sourceActions.fetchAllTangos();
  }*/

  render(){
    // let tangoSource = 'tango/'+this.props.playerData.currentTango.path;
    // console.log(tangoSource);
    // require
    return(

      <div style={styles.playerRoot}>
        <IconButton
          style={styles.play}
          color={'accent'}
          onClick={this.playTango}
        >
          <Play/>
        </IconButton>
        <IconButton
          style={styles.play}
          color={'accent'}
          onClick={this.stopTango}
        >
          <Stop/>
        </IconButton>
        {/*<Button*/}
          {/*raised*/}
          {/*color="accent"*/}
          {/*onClick={this.handleLoadingTangos.bind(this)}*/}
        {/*>*/}
          {/*Load tangos*/}
        {/*</Button>*/}
        <ReactAudioPlayer
          ref={(element) => {
            this.rap = element;

          }}
          style={styles.audioPlayer}
          // src={require("tango/"+this.props.playerData.currentTango.path)}
          autoPlay={false}
          listenInterval={300}
          onListen={this.listen}
        />
      </div>

    );
  }

}

export default connect((store) => {
  return {
    playerData: store.player,

  }
})(PlayerWraper);
