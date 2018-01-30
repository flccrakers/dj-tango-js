import React, {Component} from 'react';
import {LinearProgress} from 'material-ui/Progress';
import propTypes from 'prop-types';

const styles={
  label:{
    color:'#d4d4d4',
    fontSize:'12px',
    margin:'2px 0px 5px 5px',

  },
  progress:{
    margin:'0px 5px 0px 5px',
  }
};
class DjProgress extends Component {

  render() {
    let ret = null;
    if (this.props.isImporting) {
      console.log(this.props.percentEnded);
      if (this.props.percentEnded > 0) {
        ret = [
          <span style={styles.label}>{this.props.label}</span>,
          <LinearProgress
            color="secondary"
            mode="determinate"
            value={this.props.percentEnded}
            key={'linearProgressImport'}
            style={styles.progress}
          />
        ];
      } else {
        ret = [<LinearProgress color="secondary"/>];
      }
    }
    return ret;

  }
}
// Specifies the default values for props:
DjProgress.defaultProps = {
  isImporting: 'false',
  percentEnded: 0,
  label: '',
};
DjProgress.propTypes = {
  isImporting: propTypes.bool.isRequired,
  percentEnded: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
};

export default DjProgress;