import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import IceImg from '@icedesign/img';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo-text">
          <IceImg
            height={40}
            width={100}
            src={require('@img/index/logo.jpg')}
            style={{ ...styles.logoStyle }}
          />
        </Link>
      </div>
    );
  }
}
const styles = {
  logoStyle: {
    display: 'block',
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '28px',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
    background: 'red',
  },
};
