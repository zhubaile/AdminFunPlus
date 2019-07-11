import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化

import {Slider } from '@alifd/next';
import Footers from '../../../layouts/BasicLayout/components/Footer/Footers';
import Demopayendpopup from './Demopayendpopup';
import '../../index.css';


export default class Demopay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zfbopen:false,
      content:null,
    };
  }
  zfbclose(){
    this.setState({
      zfbopen: false,
      content: null
    })
  }
  zfbopen(content,confirm){
    this.setState({
      zfbopen:true,
      content: content
    })
    this.confirmCallBack = confirm
  }
  ceshi(){
    this.Demopayendpopup.zfboveropen();
  }
  render() {
    const setting = {
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots:false,
      speed:500,
      slidesToShow:1,
      slideDirection:'ver',
      adaptiveHeight:true,
    };
    if(!this.state.zfbopen) return null
    return (
      <div className='demopay'>
        <Demopayendpopup ref={(node)=>this.Demopayendpopup=node} zfbclose={this.zfbclose.bind(this)} />
        <div className="hxj-popup-overlay">
              {/*半透明覆盖层*/}
        </div>
       <div className='demopay-main'>
         <div className='demopay-main-content'>
          <div className='demopay-main-top-bg'>
            <div className='demopay-main-top'>
              <div className='pay-left'>
                <FormattedMessage id='app.website.demopay.topleft' />
              </div>
              <div className='pay-right'>
                <FormattedMessage id='app.website.demopay.topright' />
              </div>
            </div>
          </div>
           <div className='demopay-main-conter'>
             <div className='pay-left'>
               <img src={require('../../../../../assets/img/demopay/zlogo.png')} style={{ width: '90%;' }} alt="" />
             </div>
             <div className='pay-right'>
             </div>
           </div>
           {/*  */}
           <div className='demopay-main-footer-bg'>
             <div className='demopay-main-footer'>
               <div className='demopay-main-footer-top'>
                 <div className='pay-left'>
                   <p> <FormattedMessage id='app.website.demopay.mainleft.p1' /></p>
                   <p><strong> <FormattedMessage id='app.website.demopay.mainleft.strong' /></strong>&nbsp;&nbsp; &nbsp; <FormattedMessage id='app.website.demopay.mainleft.p2' /></p>
                 </div>
                 <div className='pay-right'>
                     <p><FormattedMessage id='app.website.demopay.mainright.p1' /> <strong>{this.state.content}</strong><FormattedMessage id='app.website.demoexper.maintopright.con2' /></p>
                     <button><FormattedMessage id='app.website.demopay.mainright.button' /></button>
                 </div>
               </div>
               <div className='demopay-main-footer-bottom'>
                 <div style={{ background:'rgba(191,191,191,1)', height: '4px', width: '100%'  }} />
                 <div className='footer-bottom-left'>
                   <div className='footer-bottom-left-main'>
                     <p><FormattedMessage id='app.website.demopay.mainbottomleft.p1' /></p>
                     <strong>￥{this.state.content}</strong>
                     <div className='qrcode'>
                       <div className='qrcode-top'>
                         <img src={require('../../../../../assets/img/demopay/zf4.png')} style={{ width: '100%;' }} alt="" />
                         <img src={require('../../../../../assets/img/demopay/zf5.png')} style={{ width: '35%', position:'absolute', top:'50%', left:'50%',transform: 'translate(-50%, -50%)' }} alt="" />
                       </div>
                       <div className='qrcode-bottom'>
                         <img src={require('../../../../../assets/img/demopay/er.png')}  alt="" />
                         <div>
                           <p><FormattedMessage id='app.website.demopay.mainbottomleft.p2' />
                             <br />
                             <FormattedMessage id='app.website.demopay.mainbottomleft.p3' />
                           </p>
                         </div>
                       </div>
                     </div>
                     <p><FormattedMessage id='app.website.demopay.mainbottomleft.p4' /></p>
                     <p><FormattedMessage id='app.website.demopay.mainbottomleft.p5' /></p>
                   </div>

                   <div className='footer-bottom-left-img'>
                     <Slider {...setting}>
                       <div><img src={require('../../../../../assets/img/demopay/zf1.png')}  alt="" /></div>
                       <div><img src={require('../../../../../assets/img/demopay/zf2.png')}  alt="" /></div>
                     </Slider>
                   </div>

                 </div>
                 <div className='footer-bottom-right'>
                   <img src={require('../../../../../assets/img/demopay/zf3.png')} style={{ width: '90%;' }} alt="" />
                   <button className='btn top' onClick={this.ceshi.bind(this)}><FormattedMessage id='app.website.demopay.mainbottomright.button1' /></button>
                   <button className='btn bottom' onClick={this.zfbclose.bind(this)}><FormattedMessage id='app.website.demopay.mainbottomright.button2' /></button>
                 </div>
                 <div style={{ clear: 'both' }} />
               </div>
             </div>
           </div>
         </div>
         <Footers />
       </div>
        {/*  */}
      </div>
    );
  }
}
