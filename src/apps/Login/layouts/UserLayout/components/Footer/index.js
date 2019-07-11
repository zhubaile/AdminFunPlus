import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IceImg from '@icedesign/img';
import './footer.css';


export default () => {
  return (
    <div style={styles.footer}>
      <div style={styles.left}>
      Copyright ©2015 - 20193funplus.com.cn
        <FormattedMessage id='app.main.footer' />All Rights Reserved
      </div>
      <div style={styles.right}>
        <div className='image'>
          <IceImg
            height={24}
            width={24}
            src={require('@img/shouye/wx.png')}
          />
        </div>
        <div className='image'>
          <IceImg
            height={24}
            width={24}
            src={require('@img/shouye/wb.png')}
          />
        </div>
        <div className='image'>
          <IceImg
            height={24}
            width={24}
            src={require('@img/shouye/face.png')}
          />
        </div>
        <div className='image'>
          <IceImg
            height={24}
            width={24}
            src={require('@img/shouye/twittter.png')}
          />
        </div>
        <div className='image'>
          <IceImg
            height={24}
            width={24}
            src={require('@img/shouye/in.png')}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    display: 'flex',
    color: '#000',
    height: '60px',
    background: '#fff',
  },
  left: {
    display: 'flex',
    fontSize: '16px',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.6',
  },
  right: {
    display: 'flex',
    flexGrow: '1',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};
