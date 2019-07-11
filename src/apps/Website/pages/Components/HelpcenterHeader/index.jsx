import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Icon, Nav } from '@alifd/next';

export default class HelpcenterHeader extends Component {
  static displayName = 'HelpcenterHeader';

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <h1 style={{ fontSize: '38px' }}>{this.props.HHcontent}</h1>
          <p sstyle={{ fontSize: '20px', paddingTop: '25px', lineHeight: '36px' }}>{this.props.HPcontent}</p>
        </div>
        <div style={styles.right}>

        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${require("../../../../../assets/img/helpcenter/develop/ks-bg1.png")})`,
    backgroundSize: '100% 100%',
  },
  left: {
    width: '50%',
    marginTop: '100px',
    marginBottom: '200px',
    color: '#fff',
  },
  right: {
    width: '20%',
  },
};
