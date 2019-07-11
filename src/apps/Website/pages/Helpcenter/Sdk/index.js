import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import Img from '@icedesign/img';
import { Button, Icon, Nav, Tab } from '@alifd/next';
import HelpcenterHeader from '../../Components/HelpcenterHeader';
import '../../index.css';

@injectIntl
export default class Sdk extends Component {
  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = this.props;
    const headerh1 = formatMessage({ id: 'app.website.helpsdk.header.h1' }) ,
      headerp = formatMessage({ id: 'app.website.helpsdk.header.p' }) ;
    this.state = {
      HHcontent: headerh1,
      HPcontent: headerp,
    };
  }
  render() {
    return (
      <div className='helpsdk'>
        <HelpcenterHeader  HHcontent={this.state.HHcontent} HPcontent={this.state.HPcontent} />
        {/* 导航下面的展示内容 */}
        <div className='helpsdk-main'>
          <h1>SDK Download</h1>
          <div className='helpsdk-main-conter'>
            <ul>
              <li>
                <img src={require('../../../../../assets/img/helpcenter/SDK/android.2.png')} alt="" />
                <strong>Android SDK</strong>
                <p><FormattedMessage id='app.website.helpsdk.main.li1p' /></p>
              </li>
              <li>
                <img src={require('../../../../../assets/img/helpcenter/SDK/ios.2.png')} alt="" />
                <strong>IOS SDK</strong>
                <p><FormattedMessage id='app.website.helpsdk.main.li2p' /></p>
              </li>
              <li>
                <img src={require('../../../../../assets/img/helpcenter/SDK/h5.2.png')} alt="" />
                <strong>H5 SDK</strong>
                <p><FormattedMessage id='app.website.helpsdk.main.li3p' /></p>
              </li>
              <li>
                <img src={require('../../../../../assets/img/helpcenter/SDK/PC.2.png')} alt="" />
                <strong>PC SDK</strong>
                <p><FormattedMessage id='app.website.helpsdk.main.li4p' /></p>
              </li>
              <li>
                <img src={require('../../../../../assets/img/helpcenter/SDK/cloud.2.png')} alt="" />
                <strong>SERVICE DEMO</strong>
                <p><FormattedMessage id='app.website.helpsdk.main.li5p' /></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
