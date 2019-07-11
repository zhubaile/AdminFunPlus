import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav, Tab } from '@alifd/next';
import HelpcenterHeader from '../../Components/HelpcenterHeader';
import '../../index.css';

@injectIntl
export default class Develop extends Component {
  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = this.props;
    const headerh1 = formatMessage({ id: 'app.website.helpdevelop.header.h1' }) ,
      headerp = formatMessage({ id: 'app.website.helpdevelop.header.p' }) ;
    this.state = {
      HHcontent: headerh1,
      HPcontent: headerp,
    };
  }
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className='helpdevelop'>
        <HelpcenterHeader  HHcontent={this.state.HHcontent} HPcontent={this.state.HPcontent} />
        {/* 导航下面的展示内容 */}
        <div className='helpdevelop-main'>
          <div className='helpdevelop-main-top'></div>
          <div className='helpdevelop-main-bottom'>
            <Tab shape='wrapped' tabPosition='left'>
              <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title1' })} key="1">
                <div className='helpdevelop-main-bottom-tab'>
                  <ul>
                    <li>
                     <h2><FormattedMessage id='app.website.helpdevelop.tab1.li1h2' />
                     <strong> <FormattedMessage id='app.website.helpdevelop.tab1.li1strong' /></strong>
                     </h2>
                      <p><FormattedMessage id='app.website.helpdevelop.tab1.li1p' /></p>
                      <a href="javascript:;"><FormattedMessage id='app.website.helpdevelop.tab1.li1a' /></a>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab1.li2h2' />
                      <strong><FormattedMessage id='app.website.helpdevelop.tab1.li2strong' /></strong>
                      </h2>
                      <p><FormattedMessage id='app.website.helpdevelop.tab1.li2p1' /></p>
                      <a href="javascript:;"><FormattedMessage id='app.website.helpdevelop.tab1.li2a' /></a>
                      <p><FormattedMessage id='app.website.helpdevelop.tab1.li2p2' />
                        <br />
                        <FormattedMessage id='app.website.helpdevelop.tab1.li2p3' /></p>
                    </li>
                    <li>
                      <h2> <FormattedMessage id='app.website.helpdevelop.tab1.li3h2' /><strong> <FormattedMessage id='app.website.helpdevelop.tab1.li3strong' /></strong></h2>
                      <p>
                        <span>· <FormattedMessage id='app.website.helpdevelop.tab1.li3span1' /></span>
                        <br />
                        <FormattedMessage id='app.website.helpdevelop.tab1.li3p1' /></p>
                      <p><span>· <FormattedMessage id='app.website.helpdevelop.tab1.li3span2' /></span>
                        <br />
                        <FormattedMessage id='app.website.helpdevelop.tab1.li3p2' /></p>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab1.li4h2' /><strong><FormattedMessage id='app.website.helpdevelop.tab1.li4strong' /></strong></h2>
                    </li>
                  </ul>
                </div>
              </Tab.Item>
              <Tab.Item title={formatMessage({ id: 'app.website.chanpinadmin.tab.title2' })} key="2">
                <div className='helpdevelop-main-bottom-tab'>
                  <ul>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li1h21' /></h2>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li1p1' /></p>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li1h22' /></h2>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li1p2' />
                        <br /><FormattedMessage id='app.website.helpdevelop.tab2.li1p3' />
                        <br /><FormattedMessage id='app.website.helpdevelop.tab2.li1p4' />
                      </p>
                      <a href="javascript:;"><FormattedMessage id='app.website.helpdevelop.tab2.li1a' /></a>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li2h2' /></h2>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li2strong1' /></strong>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p1' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p2' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p3' /></p>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li2strong2' /></strong>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p4' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p5' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li2p6' /></p>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li3h2' /></h2>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li3strong1' /></strong>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p1' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p2' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p3' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p4' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p5' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p6' /></p>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li3strong2' /></strong>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p7' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p8' /></p>
                      <p><FormattedMessage id='app.website.helpdevelop.tab2.li3p9' /></p>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li4h2' /></h2>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li4strong1' /></strong>
                      <br />
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li4strong2' /></strong>
                    </li>
                    <li>
                      <h2><FormattedMessage id='app.website.helpdevelop.tab2.li5h2' /></h2>
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li5strong1' /></strong>
                      <br />
                      <strong><FormattedMessage id='app.website.helpdevelop.tab2.li5strong2' /></strong>
                    </li>
                  </ul>
                </div>
              </Tab.Item>
            </Tab>
          </div>
        </div>
      </div>
    );
  }
}
