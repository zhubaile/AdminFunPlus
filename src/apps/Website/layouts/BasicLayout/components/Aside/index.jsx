/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { FormattedMessage, injectIntl } from 'react-intl';
import Layout from '@icedesign/layout';
import { Nav } from '@alifd/next';
import React, { Component } from 'react';
import { asideMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './index.scss';
@injectIntl
@withRouter
export default class Aside extends Component {
  constructor(props) {
    super(props);
    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 获取当前展开的菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;

    let openKeys = [];
    if (Array.isArray(asideMenuConfig)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }
    return openKeys;
  };
  getLocaleKey = (item) => {
    return `app${item.replace(/\//g, '.')}`;
  };
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { location } = this.props;
    const { pathname } = location;
    return (
      <Layout.Aside className="custom-aside">
        <div className="aside-logo">
          <Logo />
        </div>
        <Nav
          defaultSelectedKeys={[pathname]}
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          onOpen={this.onOpenChange}
          onClick={this.onMenuClick}
          className="custom-menu"
          type="line"
          direction="hoz"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              const navname = formatMessage({ id: this.getLocaleKey(nav.path) });
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    label={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol
                            style={{ marginRight: '8px' }}
                            size="small"
                            type={nav.icon}
                          />
                        ) : null}
                        <span className="ice-menu-collapse-hide">
                          {navname}
                        </span>
                      </span>
                    }
                  >
                    {nav.children.map((item) => {
                      const linkProps = {};
                      if (item.newWindow) {
                        linkProps.href = item.path;
                        linkProps.target = '_blank';
                      } else if (item.external) {
                        linkProps.href = item.path;
                      } else {
                        linkProps.to = item.path;
                      }
                      const itemname = formatMessage({ id: this.getLocaleKey(item.path) });
                      return (
                        <Nav.Item key={item.path}>
                          <Link {...linkProps}>{itemname}</Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav.SubNav>
                );
              }
              const linkProps = {};
              if (nav.newWindow) {
                linkProps.href = nav.path;
                linkProps.target = '_blank';
              } else if (nav.external) {
                linkProps.href = nav.path;
              } else {
                linkProps.to = nav.path;
              }
              return (
                <Nav.Item key={nav.path}>
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol
                          style={{ marginRight: '8px' }}
                          size="small"
                          type={nav.icon}
                        />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{navname}</span>
                    </span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </Layout.Aside>
    );
  }
}
