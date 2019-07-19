import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { openInvoice,changeInvoiceInfo } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 6 },
  wrapperCol: { s: 12, l: 14 },
};
export default class Resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        psd1: '',
        psd2: '',
        companyname: '',
        invoicetype: '',
        invoice: '',
        bank: '',
        accountopening: '',
        taxnumber: '',
      },
    };
  }

  resetPasswordclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  resetPasswordopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
    });
    this.confirmCallBack = confirm;
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  SubInvoiceinfo(r,v) {
    changeInvoiceInfo({
      ...r,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.billinginformationclose();
        this.props.fetchData();
      }
    });
    debugger;
    /* this.refs.form.validateAll((errors, values) => {
      debugger;
    }) */
  }
  render() {
    const { content, confirm } = this.state;
    const fptype = [
      { value: '0', label: '企业增值税专用发票' },
      { value: '1', label: '企业增值税普通发票' },
      { value: '2', label: '组织增值税普通发票' },
      { value: '3', label: '个人增值税普通发票' },
    ];
    if (!this.state.open) return null;
    return (
      <div className='resetpsd-bulletbox'>
        <div className='resetpsd-title'>
          <h2 style={{ display: 'inline-block' }}>重置密码</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }}>×</span>
        </div>

        <div className='resetpsd-content'>
          <Form className='form'>
            <FormItem
              label='新密码'
              {...formItemLayout}
              asterisk
            >
              <Input
                name='psd1'
                htmlType='password'
                placeholder='请输入新密码'
                /*              defaultValue={content.company} */
              />
              <p style={styles.promptMessage}>提示：密码由6-16个字符组成，区分大小写（不能包含空格）</p>
            </FormItem>
            <FormItem
              label='确认新密码'
              {...formItemLayout}
              asterisk
            >
              <Input
                name="psd2"
                htmlType='password'
                placeholder="请输入确认新密码"
                /* defaultValue={content.invoiceTitle} */
              />
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                确认
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.resetPasswordclose.bind(this)}>取消</Form.Reset>
            </FormItem>
            {/* <Button type='secondary'style={styles.cancelbtn} siza='large' onClick={this.billinginformationclose.bind(this)}>取消</Button> */}
            {/* <Button type='primary'style={styles.submitbtn} siza='large' onClick={this.SubInvoiceinfo.bind(this)}>提交</Button> */}
          </Form>
        </div>


      </div>
    );
  }
}

const styles = {
  promptMessage: {
    fontSize: '12px',
    color: 'rgba(48, 49, 51, 0.7)',
  },
  cancelbtn: {
    display: 'inline-block',
    marginLeft: '10px',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(230, 241, 252, 1)',
    color: 'rgba(78, 126, 232, 1)',
    borderColor: 'rgba(193, 241, 248, 1)',
    borderRadius: '4px',
  },
  submitbtn: {
    display: 'inline-block',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    borderRadius: '4px',
  },
};
