/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
// import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio, Select , Button, Grid, Form, DatePicker,Table,Pagination } from '@alifd/next';
// import { withRouter, Link } from 'react-router-dom';
import '../../../index.css';

const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

// @withRouter
export default class Demopayendpopup extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      zfbover: false,
      content: null,
      payvalue: '',
      zfbopen: this.props.zfbopen,
    };
    this.zfboverclose=this.zfboverclose.bind(this);
  }
  zfboverclose() {
    this.setState({
      zfbover: false,
      content: null,
    });
  }
  zfboveropen(content,confirm) {
    debugger;
    this.setState({
      zfbover: true,
      content,
    });
    this.confirmCallBack = confirm;
  }

  onNestChange(value) {
    debugger;
    this.setState({
      payvalue: value,
    });
  }
  complete(){
    location.reload()
  }
  replace(){
    this.zfboverclose();
    // this.props.zfbclose();
  }
  render() {
    if (!this.state.zfbover) return null;
    return (
      <div className="demopayendpopup">
        <div className='demopayendpopup-top'>
          支付确认
        </div>
        <div className='demopayendpopup-bottom'>
          <p style={{ fontSize: '12px'}}>请在打开新的界面完成支付<strong>支付完成前，请不要关闭此窗口</strong></p>
          <Button onClick={this.complete.bind(this)}>已完成支付</Button><Button onClick={this.replace.bind(this)}>更换支付方式</Button>
          <p>支付遇到问题，请联系3FunPlus客服获得帮助</p>
        </div>
      </div>
    );
  }
}
