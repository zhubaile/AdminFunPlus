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
import '../Icon/iconfont.css';

const Cookies = require('js-cookie');

@injectIntl
@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
    };
  }
  componentDidMount() {
    const status = Cookies.get('status');
    this.statusbtn(status);
    /* Cookies.set('applicationId', '5d1023eb8e0d1931a86af94f'); */
  }
  handleSetting = () => {
    this.props.history.push('/setting');
  };
  getLocaleKey = (item) => {
    return `app.header.${item.name}`;
  };
  statusbtn(i) {
    Cookies.set('status', i);
    this.setState({
      status: i,
    },()=>{
      this.props.Statuschange(i);
    }
    );
  }
  // 跳转到官网
  /*  Websitechange() {
    this.props.history.push('/website');
    window.location.href = "";
  } */
  // 跳转到登录
  Userchange() {
    Cookies.remove('userId');
    Cookies.remove('status');
    // this.props.history.push('/backadminuser/login');
    window.location.href = "/backadminuser/login";
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
            <li onClick={this.statusbtn.bind(this,0)} className={status == 0 ? 'active' : null}>
              <i className="iconfont icon-caiwu-copy" /><span>财会</span>
            </li>
            <li onClick={this.statusbtn.bind(this,1)} className={status == 1 ? 'active' : null}>
              <i className="iconfont icon-yunying" /><span>运营</span>
            </li>
            <li onClick={this.statusbtn.bind(this,2)} className={status == 2 ? 'active' : null}>
              <i className="iconfont icon-fuwu" /><span>服务</span>
            </li>
            <li onClick={this.statusbtn.bind(this,3)} className={status == 3 ? 'active' : null}>
              <i className="iconfont icon-guanliguankong" /><span>管控</span>
            </li>
          </ul>
        </div>
        {/* <PrimaryRouting /> */}
        <div style={{ color: '#fff', marginRight: '30px', fontSize: '18px' }}>
          欢迎你，系统管理员
        </div>
        {/* <div style={{ color: '#fff',fontSize: '18px', marginRight: '30px',cursor: 'pointer' }} onClick={this.Websitechange.bind(this)}>
          网站首页
        </div> */}
        {/* <SelectLang /> */}
        <div className='logged-user-w'>
          <div className='logged-user-i'>
            <div className="avatar-w">
              <img alt="" src={require('@img/img/avatar1.jpg')} />
            </div>
          </div>
        </div>
        <div style={{ marginRight: '20px', marginLeft: '10px',cursor: 'pointer' }} onClick={this.Userchange.bind(this)}>
          <i className='iconfont icon-guanji' style={{ fontSize: '22px' , color: '#fff' }} />
        </div>
      </Layout.Header>
    );
  }
}
