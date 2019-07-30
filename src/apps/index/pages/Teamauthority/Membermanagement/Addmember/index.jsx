import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { createUser,changeUser } from '@indexApi';
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
      value: {
        name: '',
        username: '',
        password: '',
        passwordTwo: '',
        phone: '',
        email: '',
        roles: [],
        enabled: '',
        groupId: '',
      },
      open: false,
      content: null, // 下拉框数据
      confirm: '', // id
      record: null, // 编辑的时候详细信息
      data: [],
      isLoading: [],
    };
  }
  addmemberclose() {
    this.setState({
      open: false,
      content: null,
      value: {},
    });
  }
  addmemberopen(content,confirm,record) {
    this.setState({
      open: true,
      content,
      confirm,
      value: record,
      record,
    });
    this.confirmCallBack = confirm;
  }
  //   addmemberopen(content,confirm) {
  //   debugger;
  //   if (!confirm.id) {
  //     this.setState({
  //       open: true,
  //       content,
  //       confirm,
  //     });
  //   } else {
  //     this.setState({
  //       open: true,
  //       content,
  //       confirm,
  //       value: confirm,
  //     });
  //   }
  // }
  // formChange = (value) => {
  //   this.setState({
  //     value,
  //   });
  // };

  // 提交
  Addbtn=()=> {
    this.refs.form.validateAll((errors, values) => {
      const _id = this.state.confirm;
      const groupId = this.state.confirm;
      debugger;
      const addedit = !_id ? createUser : changeUser;
      addedit({
        _id,
        groupId,
        ...values,
      }).then(({ status, data }) => {
        debugger;
        if (data.errCode == 0) {
          this.addmemberclose();
          Message.success(data.message);
          this.props.fetchData();
        } else {
          Message.success(data.message);
        }
      });
    });
  }
  render() {
    const { content, confirm, value, data, record } = this.state;
    debugger;
    if (!this.state.open) return null;
    return (
      <div className='addmember-bulletbox'>
        <div className='addmember-title'>
          <h2 style={{ display: 'inline-block' }}>添加成员</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.addmemberclose.bind(this)}>×</span>
        </div>

        <div className='addmember-content'>
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <span style={styles.formLabel}>真实姓名</span>
              <FormBinder name="name">
                <Input
                  placeholder="请输入用户名"
                  /* defaultValue={content.invoiceTitle} */
                />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formLabel}>用户名</span>
              <FormBinder name="username">
                <Input
                  readOnly={confirm}
                  placeholder='请输入用户名'
                />
              </FormBinder>
            </div>
            {
              !confirm ?
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>密码</span>
                  <FormBinder name="password">
                    <Input
                      htmlType='password'
                      placeholder='请输入密码'
                      /*                defaultValue={content.bank} */
                    />
                  </FormBinder>
                </div> : null
            }
            {
              !confirm ?
                <div style={styles.formItem}>
                  <span style={styles.formLabel}>确认密码</span>
                  <FormBinder name="passwordTwo">
                    <Input
                      htmlType='password'
                      placeholder='请输入确认密码'
                      /*                defaultValue={content.bank} */
                    />
                  </FormBinder>
                </div> : null
            }
            <div style={styles.formItem}>
              <span style={styles.formLabel}>联系方式</span>
              <FormBinder name="phone">
                <Input
                  placeholder='请输入联系方式'
                  /*                defaultValue={content.bank} */
                />
              </FormBinder>
            </div>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>电子邮箱</span>
              <FormBinder name="email">
                <Input
                  placeholder='请输入电子邮箱'
                />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formLabel}>所属角色</span>
              <FormBinder name="roles">
                <Select
                  mode="multiple"
                  dataSource={content}
                  // defaultValue={confirm.roles}
                  style={{ width: '200px' }}
                />
              </FormBinder>
              <p style={styles.prompt}>(角色可多选)</p>
            </div>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>状态</span>
              <FormBinder name="enabled">
                <Switch value="" checked={content} />
              </FormBinder>
              <p style={styles.prompt}>（是否禁用）</p>
            </div>
            <Button style={styles.submitbtn} onClick={this.Addbtn}>添加</Button>
            <Button style={styles.cancelbtn} onClick={this.addmemberclose.bind(this)}>取消</Button>
          </FormBinderWrapper>

        </div>


      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '20px',
  },
  formLabel: {
    width: '70px',
    marginRight: '10px',
    textAlign: 'right',
    display: 'inline-block',
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
  prompt: {
    color: 'rgba(108, 117, 125, 0.7)',
    marginLeft: '10px',
  },
};
