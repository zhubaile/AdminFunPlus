import React, { Component } from 'react';
import SelectLang from '../../../../../../assets/Internationalization/SelectLang';
import IceImg from '@icedesign/img';
import '../Footer/footer.css';

export default class Home extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={styles.logoStyle}>
        <div style={styles.left}>
          <IceImg
            height={40}
            width={120}
            src={require('../../../../../../assets/img/index/ailogo.png')}
            style={styles.logo}
          />
        </div>
        <div style={styles.right}>
          <SelectLang />
        </div>
      </div>
    );
  }
}
const styles = {
  logoStyle: {
    display: 'flex',
    width: '100%',
    height: '60px',
    background: 'rgba(213,210,247) ',
  },
  left: {
    display: 'flex',
    flexGrow: '1',
    height: '60px',
    justifyContent: 'center',
  },
  right: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
  },
  logo: {
    marginTop: '10px',
  },
};
