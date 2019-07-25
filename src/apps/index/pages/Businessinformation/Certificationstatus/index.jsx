import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { companyupdateAuditSuccess } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 10, s: 10, l: 10 },
  wrapperCol: { xxs: 12, s: 12, l: 12 },
};
export default class Certificationstatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        reason: '',
        type: null,
      },
    };
  }

  certificationclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  certificationopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
      value: content,
    });
    this.confirmCallBack = confirm;
  }
  SubInvoiceinfo(v,e) {
    debugger;
    const _id = this.state.content._id;
    const content = v.reason;
    debugger;
    companyupdateAuditSuccess({
      _id,
      content,
      type: v.type,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.certificationclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { content, confirm,value } = this.state;
    if (!this.state.open) return null;
    const two = 2; const three = 3;
    return (
      <div className='certificationstatus-bulletbox'>
        <div className='edit-title'>
          <h2 style={{ display: 'inline-block' }}>认证状态</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.certificationclose.bind(this)}>×</span>
        </div>

        <div className='certificationstatus-content'>
          <Form className='form' value={value}>
            <FormItem
              label='认证处理'
              {...formItemLayout}
            >
              <RadioGroup aria-labelledby="radio-a11y" name='type'>
                <Radio value={two}>通过</Radio>
                <Radio value={three}>驳回</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              label='驳回原因'
              {...formItemLayout}
            >
              <Input.TextArea name="reason" />
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
              <Form.Reset style={styles.cancelbtn} onClick={this.certificationclose.bind(this)}>取消</Form.Reset>
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
