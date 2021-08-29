import React, {Component} from 'react';
import {connect} from "react-redux";

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '20px',
    backgroundColor: '#4d4d4d',
    color: '#d2d2d2',
    fontSize: '12px',
    padding: '0px 8px 0px 8px',

  },
};


class Footer extends Component {

  render() {
    return (
      <div style={styles.footer}>
        dj-tango-js v0.1
      </div>
    );
  }
}

export default connect((store) => {
  return {}
})(Footer);

