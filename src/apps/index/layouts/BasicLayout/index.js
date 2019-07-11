import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';
import MainRoutes from './MainRoutes';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
// import BasicLayoutHoc from './BasicLayoutHoc';
// import MainRoutes from './MainRoutes';
import './index.scss';

@withRouter
// @BasicLayoutHoc
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: 'isDesktop',
      status: 0, // 二级路由展示状态
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
  };
  // 切换一级路由
  Statuschange(e) {
    this.setState({
      status: e,
    });
  }

  render() {
    const { profile = {}, userLogout } = this.props;
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = 'ice-design-layout-dark ice-design-layout';
    const { status } = this.state;
    return (
      /**
       * Header头部文件
       * Aside侧边导航栏
       * MainRoutes主题内容
       * Footer尾部
       */
      <div className={layoutClassName}>
        <Layout>
          <Header
            isMobile={isMobile}
            profile={profile}
            handleLogout={userLogout}
            Statuschange={this.Statuschange.bind(this)}
          />
          <Layout.Section>
            <Layout.Aside width="auto" type={null}>
              <Aside isMobile={isMobile} status={status} />
            </Layout.Aside>
            <Layout.Main>
              <MainRoutes />
            </Layout.Main>
          </Layout.Section>
          {/*  <Footer /> */}
        </Layout>
      </div>
    );
  }
}
