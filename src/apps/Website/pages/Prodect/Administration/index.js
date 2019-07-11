import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav, Tab } from '@alifd/next';
import '../../index.css';

@injectIntl
export default class Ceshi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /* const detachedContentStyle = {
      border: '1px solid #DCDEE3',
      padding: '20px',
    };
    contentStyle={detachedContentStyle} */
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className='prodect'>
        {/* 导航下面的展示内容 */}
        <div className='nav-belowimg' style={{ backgroundImage: `url(${require("../../../../../assets/img/shouye/bg1.png")})` }}>
          <div className='nav-belowimg-conter'>
            <div className='nav-belowimg-conter-left'>
              <h1>-<FormattedMessage id='app.website.chanpinadmin.prodecth1' /></h1>
              <p>
                <FormattedMessage id='app.website.chanpinadmin.prodectp' />
              </p>
            </div>
            <div className='nav-belowimg-conter-right' />
          </div>
        </div>
        {/* 聚合支付 */}
        <div className='service'>
          <div className='service-conter'>
            <div className='service-conter-top'>
              <div>
                <h1 style={{ textAlign: 'center' }}> <FormattedMessage id='app.website.chanpinadmin.service1h1' /></h1>
                <p style={{ fontSize: '20px' , color: 'rgba(102,102,102,1)', fontWeight: '400' }}> <FormattedMessage id='app.website.chanpinadmin.service1p' /></p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='commonly-right'>
          <div className='commonly-conter'>
            <div className='commonly-conter-left'>
              <img
                src={require('../../../../../assets/img/prodect/administration/sy2.png')}
              />
            </div>
            <div className='commonly-conter-right'>
              <p> <FormattedMessage id='app.website.chanpinadmin.commonlyrightp' /></p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='scene'>
          <div className='scene-conter'>
            <div className='scene-conter-top'>
              <div>
                <img src={require('../../../../../assets/img/prodect/administration/small.png')} style={{ width: '60px' }} alt="云" />
                <strong><FormattedMessage id='app.website.chanpinadmin.scene1top.strong' /></strong><FormattedMessage id='app.website.chanpinadmin.scene1top.strongsize' />
              </div>
            </div>
            <div className='scene-conter-botton'>
              <Tab shape='wrapped' tabPosition='left'>
                <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title1' })} key="1">
                  <div className='scene-conter-botton-tab'>
                    <p><FormattedMessage id='app.website.chanpinadmin.tab.p' /></p>
                    <img
                      src={require('../../../../../assets/img/prodect/administration/scene-ds.png')}
                    />
                  </div>
                </Tab.Item>
                <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title1' })} key="2">
                  <div className='scene-conter-botton-tab'>
                    <p><FormattedMessage id='app.website.chanpinadmin.tab.p' /></p>
                    <img
                      src={require('../../../../../assets/img/prodect/administration/scene-wl.png')}
                    />
                  </div>
                </Tab.Item>
                <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title1' })} key="3">
                  <div className='scene-conter-botton-tab'>
                    <p><FormattedMessage id='app.website.chanpinadmin.tab.p' /></p>
                    <img
                      src={require('../../../../../assets/img/prodect/administration/scene-ls.png')}
                    />
                  </div>
                </Tab.Item>
                <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title1' })} key="4">
                  <div className='scene-conter-botton-tab'>
                    <p><FormattedMessage id='app.website.chanpinadmin.tab.p' /></p>
                    <img
                      src={require('../../../../../assets/img/prodect/administration/scene-jr.png')}
                    />
                  </div>
                </Tab.Item>
              </Tab>
            </div>
          </div>
        </div>
        {/**/}
        <div className='scene'>
          <div className='scene-conter'>
            <div className='scene-conter-top'>
              <div>
                <img src={require('../../../../../assets/img/prodect/administration/small.png')} style={{ width: '60px' }} alt="云" />
                <strong><FormattedMessage id='app.website.chanpinadmin.scene2top.strong' /></strong><FormattedMessage id='app.website.chanpinadmin.scene2top.strongsize' />
              </div>
            </div>
          </div>
          <div className='scene-botton'>
            <div className='scene-botton-left'>
              <ul>
                <li><i><img src={require('../../../../../assets/img/prodect/administration/sy0.png')} alt="" /></i><FormattedMessage id='app.website.chanpinadmin.scene2bottom.li1' /></li>
                <li><i><img src={require('../../../../../assets/img/prodect/administration/sy0.png')} alt="" /></i><FormattedMessage id='app.website.chanpinadmin.scene2bottom.li2' /></li>
                <li><i><img src={require('../../../../../assets/img/prodect/administration/sy0.png')} alt="" /></i><FormattedMessage id='app.website.chanpinadmin.scene2bottom.li3' /></li>
                <li><i><img src={require('../../../../../assets/img/prodect/administration/sy0.png')} alt="" /></i><FormattedMessage id='app.website.chanpinadmin.scene2bottom.li4' /></li>
              </ul>
            </div>
            <div className='scene-botton-right'>
              <img src={require('../../../../../assets/img/prodect/administration/pic_5.png')} alt="" />
            </div>
          </div>
        </div>
        {/**/}
        <div className='service'>
          <div className='service-conter'>
            <div className='service-conter-top'>
              <div>
                <img src={require('../../../../../assets/img/prodect/administration/small.png')} style={{ width: '60px' }} alt="云" />
                <strong><FormattedMessage id='app.website.chanpinadmin.service2top.strong' /></strong><FormattedMessage id='app.website.chanpinadmin.service2top.strongsize' />
              </div>

            </div>
            <div className='service-conter-botton'>
              <ul>
                <li className='service-conter-botton-son'>
                  <span className='bgshadow'><img src={require('../../../../../assets/img/prodect/administration/cp1.png')} alt="" /></span>
                  <p><FormattedMessage id='app.website.chanpinadmin.service2bottom.p1' />
                  </p>
                </li>
                <li className='service-conter-botton-son'>
                  <span className='bgshadow'><img src={require('../../../../../assets/img/prodect/administration/cp2.png')} alt="" /></span>
                  <p><FormattedMessage id='app.website.chanpinadmin.service2bottom.p2' />
                  </p>
                </li>
                <li className='service-conter-botton-son'>
                  <span className='bgshadow'><img src={require('../../../../../assets/img/prodect/administration/cp3.png')} alt="" /></span>
                  <p><FormattedMessage id='app.website.chanpinadmin.service2bottom.p3' />
                  </p>
                </li>
                <li className='service-conter-botton-son'>
                  <span className='bgshadow'><img src={require('../../../../../assets/img/prodect/administration/cp4.png')} alt="" /></span>
                  <p><FormattedMessage id='app.website.chanpinadmin.service2bottom.p4' />
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*  */}
        <div className='footer' style={{ backgroundImage: `url(${require("../../../../../assets/img/prodect/administration/sy4.png")})` }}>
          <div className='footer-conter-left'>
            <h1 style={{ color: '#fff' }}><FormattedMessage id='app.website.chanpinadmin.footer.h1' /></h1>
            <p style={{ marginTop: '50px' , width: '55%' }}><FormattedMessage id='app.website.chanpinadmin.footer.p' />
            </p>
          </div>
        </div>
      </div>
    );
  }
}
