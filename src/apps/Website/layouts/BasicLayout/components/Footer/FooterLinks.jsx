import React, { Component } from 'react';
import { Button } from '@alifd/next';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';



export default class FooterLinks extends Component {
  static displayName = 'FooterLinks';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-box" style={styles.footerBox}>
        <div className="footer-box-content" style={styles.footerBoxContent}>
          <div className="footer-clearfix" style={styles.footerClearfix} />
          <div className="footer-box-left" style={styles.footerBoxLeft}>
            <ul
              className="footer-box-content-ul"
              style={styles.footerBoxContentUl}
            >
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    <FormattedMessage id='app.website.footer.productcenter' />
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Paymentmethod' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Solution' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.businessmanagement' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    <FormattedMessage id='app.website.footer.Helpcenter' />
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Developingdocuments' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Rapiddevelopment' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Membershipsystem' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Commonproblem' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    <FormattedMessage id='app.website.footer.Aboutus' />
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Contactus' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.newsmedia' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.Qualifications' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    <FormattedMessage id='app.website.footer.Servicesupport' />
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <FormattedMessage id='app.website.footer.SDKDownload' />
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="javascript:;"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          <Link to='/website/demo/experience' style={styles.footerBoxContentItemLinks}>
                            <FormattedMessage id='app.website.footer.DEMOexperience' />
                          </Link>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="footer-clearfix" style={styles.footerClearfix} />
            </ul>
          </div>
          <div className="footer-box-right" style={styles.footerBoxRight}>
            <div
              className="footer-box-right-title"
              style={styles.footerBoxRightTitle}
            >
              <FormattedMessage id='app.website.footer.hotline' />：010-666-888
            </div>
            <div>
              <Button type="primary" style={{ borderRadius: '20px' }}> <FormattedMessage id='app.website.footer.Immediateconsultation' /></Button>
            </div>
          </div>
          <div className="footer-clearfix" style={styles.footerClearfix} />
        </div>
      </div>
    );
  }
}

const styles = {
  footerBox: {
    backgroundColor: '#fff',
    WebkitFontSmoothing: 'antialiased',
    fontFamily: 'Tahoma,arial,Hiragino Sans GB,Microsoft Yahei',
    lineHeight: '1.6',
    boxSizing: 'border-box',
    minWidth: '1280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBoxContent: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: '0 auto',
    // padding: '50px 0px 30px',
    boxSizing: 'border-box',
    marginTop: '50px',
  },
  footerClearfix: {
    display: 'block',
    height: 0,
    boxSizing: 'border-box',
    clear: 'both',
  },
  footerBoxLeft: {
    float: 'left',
    width: '75%',
    boxSizing: 'border-box',
  },
  footerBoxRight: {
    float: 'right',
    width: '22%',
    paddingLeft: '2%',
    borderLeft: '1px solid rgba(151,151,151,0.4)',
    boxSizing: 'border-box',
  },
  footerBoxContentUl: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
  },
  footerBoxContentLi: {
    listStyle: 'none',
    marginLeft: '0',
    boxSizing: 'border-box',
    float: 'left',
    width: '25%',
    paddingRight: '10px',
  },
  footerBoxContentItem: {
    width: '208px',
    boxSizing: 'border-box',
  },
  footerBoxContentName: {
    fontSize: '22px',
    color: '#000',
    paddingBottom: '20px',
    boxSizing: 'border-box',
  },
  footerBoxContentSubli: {
    paddingTop: '14px',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    overflow: 'hidden',
    boxSizing: 'border-box',
    listStyle: 'none',
  },
  footerBoxContentItemLink: {
    fontSize: '16px',
    color: '#000',
    opacity: '0.6',
    textDecoration: 'none',
  },
  footerBoxContentItemLinks: {
    fontSize: '16px',
    color: '#000',
    textDecoration: 'none',
  },
  footerBoxRightTitle: {
    paddingBottom: '16px',
    fontSize: '22px',
    color: '#000',
    boxSizing: 'border-box',
  },
  footerBoxRightItem: {
    paddingTop: '12px',
    fontSize: '14px',
    color: '#000',
    boxSizing: 'border-box',
  },
  footerBoxRightItemOpacity: {
    opacity: 0.6,
  },
  footerBoxRightItemImg: {
    width: '97px',
    height: '97px',
    border: '0',
    boxSizing: 'border-box',
  },
};
