import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
/*import { openInvoice,changeInvoiceInfo } from '@indexApi';*/
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 6 },
  wrapperCol: { s: 12, l: 14 },
};
export default class Addmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      data: [],
      isLoading: [],
      value: {
        psd1: '',
        psd2: '',
        companyname: '',
        invoicetype: '',
        invoice: '',
        bank: '',
        accountopening: '',
        taxnumber: '',
        email: '',
        status1: '',
        status2: '',
        radio1: '',
        radio2: '',
        e_mail: '',
        jiaose: '',
      },
    };
  }
  addmemberclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  addmemberopen(content,confirm) {
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

  /*  SubInvoiceinfo(r,v) {
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
    /!* this.refs.form.validateAll((errors, values) => {
      debugger;
    }) *!/
  } */
  render() {
    const { content, confirm, value, data } = this.state;
    const jiaose = [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
    ];
    if (!this.state.open) return null;
    return (
      <div className='addmember-bulletbox'>
        <div className='addmember-title'>
          <h2 style={{ display: 'inline-block' }}>添加成员</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }}>×</span>
        </div>

        <div className='addmember-content'>
          <Form className='form'
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <FormItem
              label='商户ID'
              {...formItemLayout}
            >
              <Input
                name='invoiceType'
                placeholder='请输入用户名'
                /*                style={{ width: '100%' }}
                                dataSource={confirm}
                                defaultValue={content.invoiceType} */
              />
            </FormItem>
            <FormItem
              label='企业名称'
              {...formItemLayout}
            >
              <Input
                name='psd1'
                placeholder='请输入用户名'
                /*              defaultValue={content.company} */
              />
            </FormItem>

            <FormItem
              label='真实姓名'
              {...formItemLayout}
              /* asterisk */
            >
              <Input
                name="psd2"
                placeholder="请输入用户名"
                /* defaultValue={content.invoiceTitle} */
              />
            </FormItem>

            <FormItem
              label='用户名'
              {...formItemLayout}
            >
              <Input
                name="bank"
                placeholder='请输入用户名'
/*                defaultValue={content.bank} */
              />
            </FormItem>

            <FormItem
              label='密码'
              {...formItemLayout}
            >
              <Input
                name="psd1"
                htmlType='password'
                placeholder='请输入密码'
                /*                defaultValue={content.bank} */
              />
            </FormItem>
            <FormItem
              label='确认密码'
              {...formItemLayout}
            >
              <Input
                name="psd2"
                htmlType='password'
                placeholder='请输入确认密码'
                /*                defaultValue={content.bank} */
              />
            </FormItem>
            <FormItem
              label='联系方式'
              {...formItemLayout}
            >
              <Input
                name="tel"
                placeholder='请输入联系方式'
                /*                defaultValue={content.bank} */
              />
            </FormItem>
            <FormItem
              label='电子邮箱'
              {...formItemLayout}
            >
              <Input
                name="e_mail"
                placeholder='请输入电子邮箱'
              />
            </FormItem>
            <FormItem
              label='所属角色'
              {...formItemLayout}
            >
              <Select
                name=''
                dataSource={jiaose}
                style={{ width: '200px' }}
              />
              <span style={styles.prompt}>(角色可多选)</span>
            </FormItem>
            <FormItem
              label='状态'
              {...formItemLayout}
            >
              <Switch defaultChecked value="" />
              <span style={styles.prompt}>（是否禁用）</span>
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
/*                onClick={(v, e) => this.SubInvoiceinfo(v,e)} */
              >
                添加
              </Form.Submit>
              <Form.Reset
                style={styles.cancelbtn}
                onClick={this.addmemberclose.bind(this)}
              >取消
              </Form.Reset>
            </FormItem>
          </Form>
        </div>


      </div>
    );
  }
}

const styles = {
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
  prompt: {
    color: 'rgba(108, 117, 125, 0.7)',
    marginLeft: '10px',
  },
};
