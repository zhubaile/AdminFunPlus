/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { Component } from 'react';
// import { Balloon, Nav } from '@alifd/next';
// import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
// import { headerMenuConfig } from '../../../../menuConfig';
// import SelectLang from '../../../../../../assets/Internationalization/SelectLang';


import './index.scss';

const Cookies = require('js-cookie');

@injectIntl
@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 0,
    };
  }
  componentDidMount() {
    /* Cookies.set('applicationId', '5d1023eb8e0d1931a86af94f'); */
  }
  // f9d61ca0837211e99467c3c360ea292a  ,0a1cc81090cb11e992cd4b62d0c37a7c,5d1023eb8e0d1931a86af94f
  handleSetting = () => {
    this.props.history.push('/setting');
  };
  getLocaleKey = (item) => {
    return `app.header.${item.name}`;
  };
  statusbtn0() {
    this.setState({
      status: 0,
    },()=>{
      this.props.Statuschange(0);
    });
  }
  statusbtn1() {
    this.setState({
      status: 1,
    },()=>{
      this.props.Statuschange(1);
    });
  }
  statusbtn2() {
    this.setState({
      status: 2,
    },()=>{
      this.props.Statuschange(2);
    });
  }
  statusbtn3() {
    this.setState({
      status: 3,
    },()=>{
      this.props.Statuschange(3);
    });
  }
  // 跳转到官网
  Websitechange() {
    this.props.history.push('/website');
    window.location.href = "";
  }
  Userchange() {
    this.props.history.push('/user/login');
    window.location.href = "";
  }
  render() {
    const {
      isMobile,
      className,
      style,
      intl: { formatMessage },
    } = this.props;
    console.log(this.props);
    const { status } = this.state;
    return (
      <Layout.Header
        theme="dark"
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        {/* logo */}
        <div className='header-logo' >
          <div className='logo-element' />
          <div className='logo-label'>3FunPlus</div>
        </div>
        {/* 选项 */}
        <div className="PrimaryRouting" >
          <ul>
            <li onClick={this.statusbtn0.bind(this)} className={status == 0 ? 'active' : null}>
              <i className="os-icon os-icon-coins-4" /><span>财会</span>
            </li>
            <li onClick={this.statusbtn1.bind(this)} className={status == 1 ? 'active' : null}>
              <i className="os-icon os-icon-coins-4" /><span>运营</span>
            </li>
            <li onClick={this.statusbtn2.bind(this)} className={status == 2 ? 'active' : null}>
              <i className="os-icon os-icon-coins-4" /><span>服务</span>
            </li>
            <li onClick={this.statusbtn3.bind(this)} className={status == 3 ? 'active' : null}>
              <i className="os-icon os-icon-coins-4" /><span>管控</span>
            </li>
          </ul>
        </div>
        {/* <PrimaryRouting /> */}
        <div style={{ color: '#fff', marginRight: '30px', fontSize: '18px' }}>
          欢迎你，系统管理员
        </div>
        <div style={{ color: '#fff',fontSize: '18px', marginRight: '30px',cursor: 'pointer' }} onClick={this.Websitechange.bind(this)}>
          网站首页
        </div>
        {/* <SelectLang /> */}
        <div className='logged-user-w'>
          <div className='logged-user-i'>
            <div className="avatar-w">
              <img alt="" src={require('@img/img/avatar1.jpg')} />
            </div>
          </div>
        </div>
        <div style={{ marginRight: '20px', marginLeft: '10px',cursor: 'pointer' }} onClick={this.Userchange.bind(this)}>
          <svg t="1562569347121" className="icon" viewBox="0 0 1024 1024" version="1.1"width="28" height="28"><path d="M718.2 932.4zM94.8 932.4zM920.1 64zM491.5 960C272.4 960 94.8 782.4 94.8 563.3c0-165.8 101.8-307.9 246.2-367.1v0.1c4.3-1.5 8.9-2.3 13.7-2.3 22.6 0 41.1 18.4 41.1 41 0 17.8-11.4 33.1-27.4 38.7-112.5 47.9-191.5 159.5-191.5 289.6 0 173.8 140.8 314.6 314.6 314.6S806.1 737 806.1 563.3c0-130-78.9-241.7-191.5-289.6-16-5.6-27.3-20.9-27.3-38.7 0-22.7 18.3-41 41-41 4.8 0 9.3 0.8 13.7 2.3v-0.1c144.5 59.3 246.2 201.3 246.2 367.1 0 219.1-177.6 396.7-396.7 396.7z m0-424c-22.6 0-41-18.4-41-41.1V125.5c0-22.6 18.4-41 41-41 22.7 0 41 18.4 41 41V494.8c0 22.8-18.3 41.2-41 41.2z" p-id="1140" fill="#ffffff" /></svg>
        </div>
      </Layout.Header>
    );
  }
}
