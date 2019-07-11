import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav, Slider } from '@alifd/next';
import HelpcenterHeader from '../../Components/HelpcenterHeader';
import HelpcenterFooter from '../../Components/HelpcenterFooter';
import '../../index.css';
// import $ from 'jquery';
@injectIntl
export default class Member extends Component {
  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = this.props;
    const headerh1 = formatMessage({ id: 'app.website.helpmultistage.header.h1' }) ,
      headerp = formatMessage({ id: 'app.website.helpmultistage.header.p' }) ,
      footerh1 = formatMessage({ id: 'app.website.helpmultistage.footer.h1' }) ,
      footerp = formatMessage({ id: 'app.website.helpmultistage.footer.p' });
    this.state = {
      HHcontent: headerh1,
      HPcontent: headerp,
      FHcontent: footerh1,
      FPcontent: footerp,
    };
  }
  render() {
    const settings = {
      className: 'custom-slide center',
      autoplay: true,
      autoplaySpeed: '4000',
      lazyLoad: true,
      slidesToShow: 3,
      centerMode: true,
      infinite: true,
      dots: true,
      centerPadding: '60px',
      speed: 500,
      arrowSize: "large",
      arrowPosition: "outer",
      dotsClass: 'dots-cusst',
    };
    const { intl: { formatMessage } } = this.props;
    const dots1 = formatMessage({ id: 'app.website.helpmultistage.slider.dots1' }) ,
      dots2 = formatMessage({ id: 'app.website.helpmultistage.slider.dots2' }) ,
      dots3 = formatMessage({ id: 'app.website.helpmultistage.slider.dots3' }) ,
      dots4 = formatMessage({ id: 'app.website.helpmultistage.slider.dots4' }) ,
      dots5 = formatMessage({ id: 'app.website.helpmultistage.slider.dots5' });
    const navigation = [dots1,dots2,dots3,dots4,dots5];
    return (
      <div className='helpmember'>
        <HelpcenterHeader HHcontent={this.state.HHcontent} HPcontent={this.state.HPcontent} />
        {/* 导航下面的展示内容 */}
        <div className="helpmember-topcontent">
          <h2 style={{ fontSize: '26px' }}><FormattedMessage id='app.website.helpmultistage.topcontent.h2' /></h2>
          <p><FormattedMessage id='app.website.helpmultistage.topcontent.p' />
          </p>
        </div>
        {/* 多级商户管理系统 */}
        <div className='helpmember-account'>
          <div className=' helpmember-account-top'>
            <strong><FormattedMessage id='app.website.helpmultistage.accounttop.strong' /></strong><FormattedMessage id='app.website.helpmultistage.accounttop.strongsize' />
          </div>
          <div className='helpmember-account-bottom'>
            <Slider {...settings}
                    dotsRender={(index, current) => {
                      // 锚点问题
                      // 两个错误，不能使用遍历，遍历之前没有return
                      /* return zbl.map((index) => {
                        debugger;
                        return <a>{index}</a>;
                      }); */
                      return <a>{navigation[index]}</a>;
                    }}
            >
              <div>
                <div className='Carousel' >
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj10.png')} style={{ width: '50px',textAlign: 'center' ,marginTop: '0' }} alt="" />
                  <h2><FormattedMessage id='app.website.helpmultistage.slider.dots1' /></h2>
                  <button><FormattedMessage id='app.website.helpmultistage.Carousel.button' /></button>
                  <p><FormattedMessage id='app.website.helpmultistage.Carousel1p' /></p>
                  <a href="javascript:;"><FormattedMessage id='app.website.helpmultistage.Carousel.a' /></a>
                </div>
              </div>
              <div>
                <div className='Carousel' >
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj7.png')} style={{ width: '50px',textAlign: 'center' ,marginTop: '0' }} alt="" />
                  <h2><FormattedMessage id='app.website.helpmultistage.slider.dots2' /></h2>
                  <button><FormattedMessage id='app.website.helpmultistage.Carousel.button' /></button>
                  <p><FormattedMessage id='app.website.helpmultistage.Carousel2p' /></p>
                  <a href="javascript:;"><FormattedMessage id='app.website.helpmultistage.Carousel.a' /></a>
                </div>
              </div>
              <div>
                <div className='Carousel' >
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj8.png')} style={{ width: '50px',textAlign: 'center' ,marginTop: '0' }} alt="" />
                  <h2><FormattedMessage id='app.website.helpmultistage.slider.dots3' /></h2>
                  <button><FormattedMessage id='app.website.helpmultistage.Carousel.button' /></button>
                  <p><FormattedMessage id='app.website.helpmultistage.Carousel3p' /></p>
                  <a href="javascript:;"><FormattedMessage id='app.website.helpmultistage.Carousel.a' /></a>
                </div>
              </div>
              <div>
                <div className='Carousel' >
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj9.png')} style={{ width: '50px',textAlign: 'center' ,marginTop: '0' }} alt="" />
                  <h2><FormattedMessage id='app.website.helpmultistage.slider.dots4' /></h2>
                  <button><FormattedMessage id='app.website.helpmultistage.Carousel.button' /></button>
                  <p><FormattedMessage id='app.website.helpmultistage.Carousel4p' /></p>
                  <a href="javascript:;"><FormattedMessage id='app.website.helpmultistage.Carousel.a' /></a>
                </div>
              </div>
              <div>
                <div className='Carousel' >
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj11.png')} style={{ width: '50px',textAlign: 'center' ,marginTop: '0' }} alt="" />
                  <h2><FormattedMessage id='app.website.helpmultistage.slider.dots5' /></h2>
                  <button><FormattedMessage id='app.website.helpmultistage.Carousel.button' /></button>
                  <p><FormattedMessage id='app.website.helpmultistage.Carousel5p' /></p>
                  <a href="javascript:;"><FormattedMessage id='app.website.helpmultistage.Carousel.a' /></a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        {/* 电商 */}
        <div className='helpmember-imgleft'>
          <div className='helpmember-imgleft-left'>
            <h2><FormattedMessage id='app.website.helpmultistage.imgleftleft' /></h2>
            <img src={require('../../../../../assets/img/helpcenter/member/hy7.png')} style={{ width: '300px', height: '300px' }} alt="" />
          </div>
          <div className='helpmember-imgleft-right'>
            <FormattedMessage id='app.website.helpmultistage.imgleftright' />
          </div>
        </div>
        <div className='helpmember-imgright'>
          <div className='helpmember-imgright-left'>
            <FormattedMessage id='app.website.helpmultistage.imgrightleft' />
          </div>
          <div className='helpmember-imgright-right'>
            <h2><FormattedMessage id='app.website.helpmultistage.imgrightright' /></h2>
            <img src={require('../../../../../assets/img/helpcenter/member/hy8.png')} style={{ width: '300px', height: '300px' }} alt="" />
          </div>
        </div>

        {/*  */}
        <div className='helpmember-footer'>
          <div className='helpmember-footer-conter'>
            <div className='helpmember-footer-conter-top'>
              <div>
                <h1><strong><FormattedMessage id='app.website.helpmultistage.footertop.strong' /></strong><FormattedMessage id='app.website.helpmultistage.footertop.strongsize' /></h1>
              </div>
            </div>
            <div className='helpmember-footer-conter-botton'>
              <ul>
                <li>
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj3.png')} alt="" />
                  <strong><FormattedMessage id='app.website.helpmultistage.footerbottom.strong1' /></strong>
                  <p><FormattedMessage id='app.website.helpmultistage.footerbottom.p1' /></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj4.png')} alt="" />
                  <strong><FormattedMessage id='app.website.helpmultistage.footerbottom.strong2' /></strong>
                  <p><FormattedMessage id='app.website.helpmultistage.footerbottom.p2' /></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj5.png')} alt="" />
                  <strong><FormattedMessage id='app.website.helpmultistage.footerbottom.strong3' /></strong>
                  <p><FormattedMessage id='app.website.helpmultistage.footerbottom.p3' /></p>
                </li>
                <li>
                  <img src={require('../../../../../assets/img/helpcenter/multistage/dj6.png')} alt="" />
                  <strong><FormattedMessage id='app.website.helpmultistage.footerbottom.strong4' /></strong>
                  <p><FormattedMessage id='app.website.helpmultistage.footerbottom.p4' /></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*  */}
        <HelpcenterFooter FHcontent={this.state.FHcontent} FPcontent={this.state.FPcontent} />
      </div>
    );
  }
}
