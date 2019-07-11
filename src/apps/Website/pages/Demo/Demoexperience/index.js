import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav, Tab } from '@alifd/next';
import HelpcenterHeader from '../../Components/HelpcenterHeader';
// import { Link } from 'react-router-dom';
import Demopay from '../Demopay';
import '../../index.css';

@injectIntl
export default class Demoexperience extends Component {
  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = this.props;
    const headerh1 = formatMessage({ id: 'app.website.demoexper.header.h1' }) ,
      headerp = formatMessage({ id: 'app.website.demoexper.header.p' }) ;
    this.state = {
      HHcontent: headerh1,
      HPcontent: headerp,
    };
  }
  zfbpay() {
    this.Demopay.zfbopen();
  }
  render() {
    return (
      <div className='demoience'>
        <Demopay ref={ (node) => this.Demopay = node } />
        <HelpcenterHeader  HHcontent={this.state.HHcontent} HPcontent={this.state.HPcontent} />
        {/* 导航下面的展示内容 */}
        <div className='demoience-main'>
          <div className='demoience-main-updown'>
            <div className='demoience-main-updown-left'>
              <p><FormattedMessage id='app.website.demoexper.maintopleft.p1'/></p>
              <p><FormattedMessage id='app.website.demoexper.maintopleft.p2'/></p>
            </div>
            <div className='demoience-main-updown-right'>
              <FormattedMessage id='app.website.demoexper.maintopright.con1'/> <input type="text" value='10' style={{ width: '50px' ,height: '30px', textAlign: 'center'}} /><FormattedMessage id='app.website.demoexper.maintopright.con2'/>
            </div>
          </div>
          <div className='demoience-main-center'>
            <h2><FormattedMessage id='app.website.demoexper.maincenter.h2'/></h2>
            <div className='demoience-main-center-box'>
              <ul>
                <li>
                  <img src={require('../../../../../assets/img/demoience/zfb.png')}style={{ width: '36px' , height: '26px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p1'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/zfb.png')}style={{ width: '36px' , height: '26px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p2'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/d.wx.png')} style={{ width: '40px' , height: '32px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p3'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/qq.png')} style={{ width: '29px' , height: '35px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p4'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/qq.png')}style={{ width: '29px' , height: '35px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p5'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/yl.png')} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p6'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/yl.png')} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p7'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/yl.png')} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p8'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/jd.png')}style={{ width: '42px' , height: '17px'}} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p9'/></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/demoience/yl.png')} alt="" />
                  <p><FormattedMessage id='app.website.demoexper.maincenter.p10'/></p>
                </li>
              </ul>
            </div>
          </div>
          <div className='demoience-main-updown'>
            <div className='demoience-main-updown-left'>
            </div>
            <div className='demoience-main-updown-right'>
              <FormattedMessage id='app.website.demoexper.mainupdown.con'/> <strong><FormattedMessage id='app.website.demoexper.mainupdown.strong'/></strong><FormattedMessage id='app.website.demoexper.maintopright.con2'/> &nbsp; &nbsp; &nbsp;
              <Button size='large' type='primary' onClick={ this.zfbpay.bind(this)}> <FormattedMessage id='app.website.demoexper.mainupdown.Button'/></Button>
              {/*<button><Link to='/demo/pay'>立即支付</Link></button>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
