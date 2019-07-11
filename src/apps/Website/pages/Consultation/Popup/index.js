import React, { Component } from 'react';
// import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav } from '@alifd/next';
import '../../index.css';


export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  close() {
    this.setState({
      open: false,
      content: null,
    });
  }
  open(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  render() {
    if (!this.state.open) return null;
    return (
      <div className='consultpopup'>
        <div className='consultpopup-head'>
          <p className='consultpopup-head-left'>3FunPlus</p>
          <p className='consultpopup-head-right' onClick={this.close.bind(this)}>×</p>
        </div>
        <div className='consultpopup-main'>
          <p style={{ textAlign: 'center' }}>--客服014为您服务--</p>
        </div>
        <div className='consultpopup-footer'>
          <textarea
            className='consultpopup-userinput'
            placeholder= '输入消息...'
          />
          <Button type="primary" className='sendbtn'>发送</Button>
        </div>
      </div>
    );
  }
}
