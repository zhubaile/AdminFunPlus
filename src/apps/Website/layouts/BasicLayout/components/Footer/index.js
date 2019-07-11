import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import Logo from '../Logo';
import FooterLinks from './FooterLinks';
import Footers from './Footers';
import './index.scss';

export default class Footer extends PureComponent {
  render() {
    const { className, style } = this.props;
    return (
      <Layout.Footer
        className={cx('ice-design-layout-footer', className)}
        style={{
          ...style,
          backgroundColor: 'transparent',
          lineHeight: '36px',
        }}
      >
        <FooterLinks />
        <Footers />
      </Layout.Footer>
    );
  }
}
