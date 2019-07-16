import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { openInvoice,changeInvoiceInfo } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 6 },
  wrapperCol: { s: 12, l: 14 },
};
export default class Edit extends Component {
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
        email: '',
        status1: '',
        status2: '',
        radio1: '',
        radio2: '',
      },
    };
  }

  editclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  editopen(content,confirm) {
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
      <div className='edit-bulletbox'>
        <div className='edit-title'>
          <h2 style={{ display: 'inline-block' }}>编辑</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }}>×</span>
        </div>

        <div className='edit-content'>
          <Form className='form'>
            <FormItem
              label='企业名称'
              {...formItemLayout}
            >
              <Input
                name='psd1'
                htmlType='password'
                placeholder='请填写有效的名称'
                /*              defaultValue={content.company} */
              />
            </FormItem>
            <FormItem
              label='统一社会信用代码'
              {...formItemLayout}
            >
              <Input
                name='invoiceType'
                placeholder='请填写有效的代码'
/*                style={{ width: '100%' }}
                dataSource={confirm}
                defaultValue={content.invoiceType} */
              />
            </FormItem>
            <FormItem
              label='法人姓名'
              {...formItemLayout}
              /*asterisk*/
            >
              <Input
                name="psd2"
                placeholder="请填写有效的姓名"
                /* defaultValue={content.invoiceTitle} */
              />
            </FormItem>

            <FormItem
              label='企业地址'
              {...formItemLayout}
            >
              <Input
                name="bank"
                placeholder='请填写有效的地址'
/*                defaultValue={content.bank}*/
              />
            </FormItem>

            <FormItem
              label='所属行业'
              {...formItemLayout}
            >
              <Input
                name="bankNumber"
                placeholder="请填写有效的行业"
/*                defaultValue={content.bankNumber} */
              />
            </FormItem>

            <FormItem
              label='联系方式'
              {...formItemLayout}
            >
              <Input
                name="taxNumber"
                placeholder="请填写有效的联系方式"
/*                defaultValue={content.taxNumber} */
              />
            </FormItem>
            <FormItem
              label='联系邮箱'
              {...formItemLayout}
            >
              <Input
                name="email"
                placeholder="请填写有效的邮箱地址"
                /*                defaultValue={content.taxNumber} */
              />
            </FormItem>
            <FormItem
              label='登录状态'
              {...formItemLayout}
            >
              <Switch
                name="status1"
              />
            </FormItem>
            <FormItem
              label='权限状态'
              {...formItemLayout}
            >
              <Switch
                name="status2"
              />
            </FormItem>
            <FormItem
              label='认证情况'
              {...formItemLayout}
            >
              <Radio
                name="radio1"
                defaultChecked
              >
                通过
              </Radio>
              <Radio
                name="radio2"
                defaultChecked
              >
                驳回
              </Radio>
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                提交
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.editclose.bind(this)}>取消</Form.Reset>
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
