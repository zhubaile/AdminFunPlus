import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import Img from '@icedesign/img';
import { Button, Icon, Nav } from '@alifd/next';
import '../../index.css';

export default class Ceshi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='prodect'>
        {/* 导航下面的展示内容 */}
        <div className='nav-belowimg' style={{ backgroundImage: `url(${require("../../../../../assets/img/shouye/bg1.png")})` }}>
          <div className='nav-belowimg-conter'>
            <div className='nav-belowimg-conter-left'>
              <h1>-<FormattedMessage id='app.website.chanpinmode.prodecth1' /></h1>
              <p><FormattedMessage id='app.website.chanpinmode.prodectp' /></p>
            </div>
            <div className='nav-belowimg-conter-right'>
            </div>
          </div>
        </div>
        {/* 聚合支付 */}
        <div className='service'>
          <div className='service-conter'>
            <div className='service-conter-top'>
              <div>
                <h1 style={{ textAlign: 'center' }}><FormattedMessage id='app.website.chanpinmode.servicetoph1' /></h1>
                <p style={{ fontSize: '20px' , opacity: '0.8' }}><FormattedMessage id='app.website.chanpinmode.servicetopp' /></p>
              </div>
            </div>
            <div className='service-conter-botton'>
             <Img
               src={require('../../../../../assets/img/prodect/mode/add.png')}
               type="contain"
               style={{ width: '100%' }}
             />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='commonly-left'>
          <div className='commonly-conter'>
            <div className='commonly-conter-left'>
              <div className='commonly-conter-left-box'>
                <FormattedMessage id='app.website.chanpinmode.commonlyleft1con' />
                <div />
              </div>
              <p><FormattedMessage id='app.website.chanpinmode.commonlyleft1p' /></p>
            </div>
            <div className='commonly-conter-right'>
              <img
                src={require('../../../../../assets/img/prodect/mode/pic_1.png')}
              />
            </div>
          </div>
        </div>

        <div className='commonly-right'>
          <div className='commonly-conter'>
            <div className='commonly-conter-left'>
              <img
                src={require('../../../../../assets/img/prodect/mode/pic_2.png')}
              />
            </div>
            <div className='commonly-conter-right'>
              <div className='commonly-conter-right-box'>
                <FormattedMessage id='app.website.chanpinmode.commonlyright1con' />
                <div />
              </div>
              <p> <FormattedMessage id='app.website.chanpinmode.commonlyright1p' /></p>
            </div>
          </div>
        </div>
        <div className='commonly-left'>
          <div className='commonly-conter'>
            <div className='commonly-conter-left'>
              <div className='commonly-conter-left-box'>
                <FormattedMessage id='app.website.chanpinmode.commonlyleft2con' />
                <div />
              </div>
              <p><FormattedMessage id='app.website.chanpinmode.commonlyleft2p' /></p>
            </div>
            <div className='commonly-conter-right'>
              <img
                src={require('../../../../../assets/img/prodect/mode/pic_3.png')}
              />
            </div>
          </div>
        </div>

        <div className='commonly-right'>
          <div className='commonly-conter'>
            <div className='commonly-conter-left'>
              <img
                src={require('../../../../../assets/img/prodect/mode/pic_4.png')}
              />
            </div>
            <div className='commonly-conter-right'>
              <div className='commonly-conter-right-box'>
                <FormattedMessage id='app.website.chanpinmode.commonlyright2con' />
                <div />
              </div>
              <p> <FormattedMessage id='app.website.chanpinmode.commonlyright2p' /></p>
            </div>
          </div>
        </div>

        {/*  */}
        <div className='footer' style={{ backgroundImage: `url(${require("../../../../../assets/img/prodect/administration/sy4.png")})` }}>
          <div className='footer-conter-left'>
            <h1 style={{ color: '#000' }}><FormattedMessage id='app.website.chanpinmode.footerh1' /></h1>
            <p style={{ marginTop: '50px' , width: '55%' }}><FormattedMessage id='app.website.chanpinmode.footerp' /></p>
          </div>
        </div>
      </div>
    );
  }
}
