import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { changePwd } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 6, s: 6, l: 6 },
  wrapperCol: { xxs: 14, s: 14, l: 14 },
};
export default class Resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        password: '',
        passwordTwo: '',
      },
    };
  }

  resetPasswordclose() {
    this.setState({
      open: false,
      content: null,
      value: {
        password: '',
        passwordTwo: '',
      },
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
  Subadd() {
    const content = this.state.content;
    const value = this.state.value;
    changePwd({
      _id: content,
      ...value,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.resetPasswordclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { content, confirm,value } = this.state;
    if (!this.state.open) return null;
    return (
      <div className='resetpsd-bulletbox'>
        <div className='resetpsd-title'>
          <h2 style={{ display: 'inline-block' }}>重置密码</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.resetPasswordclose.bind(this)}>×</span>
        </div>

        <div className='resetpsd-content'>
          <Form className='form' name={value} onChange={this.formChange}>
            <FormItem
              label='新密码'
              {...formItemLayout}
              asterisk
            >
              <Input
                name='password'
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
                name="passwordTwo"
                htmlType='password'
                placeholder="请输入确认新密码"
              />
            </FormItem>
            {/* <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Reset style={styles.cancelbtn} onClick={this.resetPasswordclose.bind(this)}>取消</Form.Reset>
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                确认
              </Form.Submit>
            </FormItem> */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button className='btn-all' type='secondary' size='large' style={styles.submitbtn} onClick={this.resetPasswordclose.bind(this)}>取消</Button>
              <Button type='primary' size='large' style={styles.submitbtn} onClick={this.Subadd.bind(this)}>添加</Button>
            </div>
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
    width: '76px',
    margin: '0 10px',
  },
};
