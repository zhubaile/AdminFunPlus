import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import IceImg from '@icedesign/img';

export default class Logo extends PureComponent {
  render() {
    return (
      <div >
        <Link to="/website/index">
          <IceImg
            width={120}
            height={40}
            src={require('@img/index/ailogo.png')}
            style={{ ...styles.logoStyle }}
          />
        </Link>
      </div>

    );
  }
}

const styles = {
  logoStyle: {
    width: '100%',
    display: 'block',
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '28px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};
