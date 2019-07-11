import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
// import IceImg from '@icedesign/img';
import { Button } from '@alifd/next';
import Consultation from '../Consultation';
// import { Link } from 'react-router-dom';
import '../index.css';

// 差不多全是全局的意思
@injectIntl
export default class Ceshi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='shouye'>
        <Consultation />
        {/* 导航下面的展示内容 */}
        <div className='nav-belowimg' style={{ backgroundImage: `url(${require("../../../../assets/img/shouye/bg1.png")})` }}>
          <div className='nav-belowimg-conter'>
            <div className='nav-belowimg-conter-left'>
              <h1>3FunPlus/<FormattedMessage id='app.website.shouye.toph1' /></h1>
              <h3><FormattedMessage id='app.website.shouye.toph3' /></h3>
              <p><FormattedMessage id='app.website.shouye.topp' /></p>
              <Button style={{ borderRadius: '20px' , color: '#00a292', marginTop: '50px', width: '150px', height: '43px' }}><FormattedMessage id='app.website.shouye.topButton' /></Button>
            </div>
            <div className='nav-belowimg-conter-right'>
              <img
                src={require('../../../../assets/img/shouye/s1.png')}
              />
            </div>
          </div>
        </div>
        {/* 依托的内容 */}
        <div className='rely'>
          <div className='rely-conter'>
            <div className='rely-conter-left'>
              <h1><FormattedMessage id='app.website.shouye.rely1h1' /></h1>
              <p><FormattedMessage id='app.website.shouye.rely1p' /></p>
            </div>
            <div className='rely-conter-right'>
              <img
                style={{ width: '55%', heght: '55%' }}
                src={require('../../../../assets/img/shouye/pic01.png')}
              />
              <p style={{ fontSize: '16px' }}>依托蓝牙和NFC技术 支持多种移动硬件</p>
            </div>
          </div>
        </div>
        {/* 产品服务 */}
        <div className='service'>
          <div className='service-conter'>
            <div className='service-conter-top'>
              <div>
                <img src={require('../../../../assets/img/shouye/small.png')} style={{ width: '60px' }} alt="云" />
                <strong><FormattedMessage id='app.website.shouye.servicetop.strong' /></strong><FormattedMessage id='app.website.shouye.servicetop.strongsize' />
                <p className='text'>-PRODUCT SERVICE-</p>
              </div>

            </div>
            <div className='service-conter-botton'>
              <ul>
                <li className='service-conter-botton-box'>
                  <img src={require('../../../../assets/img/shouye/sy04.png')} alt="" />
                  <h2><FormattedMessage id='app.website.shouye.servicebottom.box1h2' /></h2>
                  <div style={{ width: '40%', height: '1px', borderTop: '2px solid #EB6100' }} />
                  <p><FormattedMessage id='app.website.shouye.servicebottom.box1p' />
                  </p>
                </li>
                <li className='service-conter-botton-box'>
                  <img src={require('../../../../assets/img/shouye/sy05.png')} alt="" />
                  <h2><FormattedMessage id='app.website.shouye.servicebottom.box2h2' /></h2>
                  <div style={{ width: '40%', height: '1px', borderTop: '2px solid #E5DB4C' }} />
                  <p><FormattedMessage id='app.website.shouye.servicebottom.box2p' />
                  </p>
                </li>
                <li className='service-conter-botton-box'>
                  <img src={require('../../../../assets/img/shouye/sy06.png')} alt="" />
                  <h2><FormattedMessage id='app.website.shouye.servicebottom.box3h2' /></h2>
                  <div style={{ width: '40%', height: '1px', borderTop: '2px solid #009944' }} />
                  <p><FormattedMessage id='app.website.shouye.servicebottom.box3p' />
                  </p>
                </li>
                <li className='service-conter-botton-box'>
                  <img src={require('../../../../assets/img/shouye/sy07.png')} alt="" />
                  <h2><FormattedMessage id='app.website.shouye.servicebottom.box4h2' /></h2>
                  <div style={{ width: '40%', height: '1px', borderTop: '2px solid #AE5DA1' }} />
                  <p><FormattedMessage id='app.website.shouye.servicebottom.box4p' />
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='rely'>
          <div className='rely-conter'>
            <div className='rely-conter-left'>
              <img
                src={require('../../../../assets/img/shouye/sy09.png')}
                style={{ width: '80%' }}
              />
            </div>
            <div className='rely-conter-right'>
              <p style={{ width: '50%' }}><FormattedMessage id='app.website.shouye.rely2p' /></p>
              <img className='myimg' src={require('@img/shouye/sy08.png')} />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='rely'>
          <div className='rely-conter-special'>
            <div className='rely-conter-left-special'>
              <h1>平滑</h1>
              <h2 style={{ textIndent: '2em' }}><FormattedMessage id='app.website.shouye.rely3h2' /></h2>
              <p style={{ marginTop: '20px' }}><FormattedMessage id='app.website.shouye.rely3p' />
              </p>
            </div>
            <div className='rely-conter-right-special'>
              <img
                src={require('../../../../assets/img/shouye/b.png')}
                style={{ backgroundSize: '100% 100%' , width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='son'>
          <div className='son-conter'>
            <div className='son-conter-left' style={{ position: 'relative' }}>

              <div style={{ width: '4px', height: '100%', background: 'rgba(109,166,252,1)', position: 'absolute', left: '30%', borderRadius: '2px' }} />
              <div style={{ width: '100%', height: '4px', background: 'rgba(109,166,252,1)', borderRadius: '2px' }} />
              <img
                style={{ backgroundSize: '100% 100%', width: '100%' }}
                src={require('../../../../assets/img/shouye/pic02.png')}
              />

              {/*              <img
                style={{ backgroundSize: '100% 100%', width: '100%' }}
                src={require('../../../../assets/img/shouye/pic2.png')}
              /> */}
{/*               <p style={styles.promptMessage}>提供便捷、稳定和安全的技术服务</p>*/}
            </div>
            <div className='son-conter-right'>
              <div>
                <h1><FormattedMessage id='app.website.shouye.sonh1' /></h1>
                <h2><FormattedMessage id='app.website.shouye.sonh2' /></h2>
                <p><FormattedMessage id='app.website.shouye.sonp' /></p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='rely'>
          <div className='rely-conter'>
            <div className='rely-conter-left'>
              <img
                src={require('../../../../assets/img/shouye/sy08.png')}
                style={{ width: '80%' }}
              />
            </div>
            <div className='rely-conter-right'>
              <div className='rely-conter-right-box'>
                <h1 style={{ marginLeft: '5%' }}><FormattedMessage id='app.website.shouye.rely4h1' /></h1>
                <h2 style={{ marginLeft: '8%' }}><FormattedMessage id='app.website.shouye.rely4h2' /></h2>
                <p style={{ width: '60%' }}><FormattedMessage id='app.website.shouye.rely4p' /></p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='rely'>
          <div className='rely-conter'>
            <div className='rely-conter-left'>
              <h1><FormattedMessage id='app.website.shouye.rely5h1' /></h1>
              <h2 style={{ textIndent: '2em' }}><FormattedMessage id='app.website.shouye.rely5h2' /></h2>
              <p style={{ marginTop: '20px' }}><FormattedMessage id='app.website.shouye.rely5p' /></p>
            </div>
            <div className='rely-conter-right'>
              <img
                style={{ width: '100%' }}
                src={require('../../../../assets/img/shouye/sy03.png')}
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='footer' style={{ backgroundImage: `url(${require("../../../../assets/img/shouye/bg2.png")})` }}>
          <div className='footer-conter-left'>
            <h1 style={{ color: '#000' }}><FormattedMessage id='app.website.shouye.footerh1' /></h1>
            <h3 style={{ textIndent: '2em', color: '#fff' }}><FormattedMessage id='app.website.shouye.footerh3' /></h3>
            <p style={{ marginTop: '30px' , width: '40%' }}><FormattedMessage id='app.website.shouye.footerp' /></p>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  promptMessage: {
    fontSize: '16px',
    color: 'rgba(51, 51, 51, 1)',
  },
};
