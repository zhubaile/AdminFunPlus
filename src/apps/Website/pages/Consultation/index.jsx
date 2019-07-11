import React, { Component } from 'react';
import Popup from './Popup';
import { FormattedMessage, injectIntl } from 'react-intl';
/* import ScrollAnim from "rc-scroll-anim/lib/index";
const Link = ScrollAnim.Link;
const EventListener = ScrollAnim.Event;
ScrollAnim.scrollScreen.init({ loop: true }); */


export default class Consultation extends Component {
  static displayName = 'TeamManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  consultationpopup() {
    this.Popup.open();
  }
  render() {
    return (
      <div>
        <Popup ref={ node => this.Popup = node } />
        <div className='consultation'>
          <a href='javascript:;' onClick={this.consultationpopup.bind(this)}><img src={require('../../../../assets/img/shouye/syf1.png')} style={{ width: '22px', height: '20px', marginTop: '12px' }} /></a>
          <p>
            <FormattedMessage id='app.Online.consultation' /> </p>
          <a href='#linktop'><img src={require('../../../../assets/img/shouye/syf2.png')} style={{ width: '21px', height: '23px', marginTop: '11px' }} /></a>
        </div>
      </div>
    );
  }
}
