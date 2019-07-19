/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Button, Grid, Form, Select } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { createUser } from '@indexApi';
import '../../../index.css';
import { Message } from "@alifd/next/lib/index";

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class Addmenber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        email: '',
        phone: '',
        passwordTwo: '',
        password: '',
        notes: '',
        yingyong: '选择应用',
        jiaose: '选择角色',
      },
      open: false,
      content: null,
      payvalue: '',
    };
  }
  addmemberclose() {
    this.setState({
      open: false,
      content: null,
      value: '',
    });
  }
  addmemberopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  // 添加成员
  addmember = () => {
    this.refs.form.validateAll((errors, values) => {
      createUser({
        ...values,
      }).then(({ status,data })=>{
        if (data.errCode == 0) {
          this.addmemberclose();
          Message.success(data.message);
          this.props.fetchData();
          // location.reload();
        }
        Message.success(data.message);
      });
    });
  }
  render() {
    const yingyong = [
      { value: '选择应用 ', label: '选择应用' },
      { value: '待分配', label: '待分配' },
    ];
    const jiaose = this.state.content;
    if (!this.state.open) return null;
    return (
      <div className="addmenber">
        <h2>添加成员</h2>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <FormBinder name="username"
            autoWidth={false}
          >
            <Input hasClear placeholder='姓名' />
          </FormBinder>

          <FormBinder name='email' >
            <Input hasClear placeholder='邮箱' />
          </FormBinder>
          <FormBinder name='phone'>
            <Input hasClear placeholder='手机号' />
          </FormBinder>
          <FormBinder name='password'>
            <Input hasClear placeholder='密码' htmlType="password" />
          </FormBinder>
          <FormBinder name='passwordTwo'>
            <Input hasClear placeholder='重复密码' htmlType="password" />
          </FormBinder>
          <FormBinder name='notes'>
            <Input hasClear placeholder='备注' htmlType="text" />
          </FormBinder>
          <FormBinder name='quanbuyingyong'>
            <Select dataSource={yingyong} placeholder='选择应用' />
          </FormBinder>
          <FormBinder name='roles'>
            <Select dataSource={jiaose} placeholder='选择角色' />
          </FormBinder>
          <button onClick={this.addmemberclose.bind(this)}>取消</button>
          <button onClick={this.addmember}>添加</button>
        </FormBinderWrapper>
      </div>
    );
  }
}
