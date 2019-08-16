/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Message, Switch, Form, Select,Button } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { sysCreateUser } from '@indexApi';
import '../../../index.css';

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
        roles: [],
        status: false,
      },
      open: false,
      content: null,
      confirm: null,
      payvalue: '',
    };
  }
  addmemberclose() {
    this.setState({
      open: false,
      content: null,
      value: {},
    });
  }
  addmemberopen(content,confirm) {
    debugger;
    if (!confirm.id) {
      this.setState({
        open: true,
        content,
        confirm,
      });
    } else {
      this.setState({
        open: true,
        content,
        confirm,
        value: confirm,
      });
    }
  }
  // 添加成员
  addmember = () => {
    this.refs.form.validateAll((errors, values) => {
      const _id = this.state.confirm._id;
      debugger;
      sysCreateUser({
        _id,
        ...values,
      }).then(({ status,data })=>{
        debugger;
        if (data.errCode == 0) {
          this.addmemberclose();
          Message.success(data.message);
          this.props.fetchData();
          // location.reload();
        } else {
          Message.success(data.message);
        }
      });
    });
  }
  render() {
    // const jiaose = this.state.content;
    const { content , confirm,value } = this.state;
    if (!this.state.open) return null;
    debugger;
    return (
      <div className="addmenber">
        <div className='addmenber-title'>
          <p style={{ display: 'inline-block' }}>{!confirm.id ? '添加成员' : '编辑成员'}</p>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.addmemberclose.bind(this)}>×</span>
        </div>
        <div className='addmenber_span'>
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <FormBinder name="username" >
              <Input hasClear placeholder='账号' defaultValue={confirm.username} readOnly={confirm.id} />
            </FormBinder>

            <FormBinder name='email' >
              <Input hasClear placeholder='邮箱' defaultValue={confirm.username} />
            </FormBinder>
            <FormBinder name='phone'>
              <Input hasClear placeholder='手机号' defaultValue={confirm.username} />
            </FormBinder>
            {
              !confirm.id ? (
                <FormBinder name='password'>
                  <Input hasClear placeholder='密码' htmlType="password" />
                </FormBinder>
              ) : null
            }
            {
              !confirm.id ? (
                <FormBinder name='passwordTwo'>
                  <Input hasClear placeholder='重复密码' htmlType="password" />
                </FormBinder>
              ) : null
            }
            <FormBinder name='notes'>
              <Input hasClear placeholder='备注' htmlType="text" defaultValue={confirm.notes} />
            </FormBinder>
            <FormBinder name='roles'>
              <Select mode="multiple" dataSource={content} placeholder='选择角色' defaultValue={confirm.roles} />
              {/* <Select dataSource={content} placeholder='选择角色' defaultValue={confirm.roles} /> */}
            </FormBinder>
            <FormBinder name="status">
              <Switch checkedChildren="正常" unCheckedChildren="禁止" defaultChecked={value.status} style={{ marginTop: '10px', marginLeft: '10%', width: '100px' }} />
            </FormBinder>
          </FormBinderWrapper>
        </div>
        <div className='addmenber_btn'>
          <Button className='btn-all' type='secondary' size='large' onClick={this.addmemberclose.bind(this)}>取消</Button>
          <Button type='primary' size='large' onClick={this.addmember}>添加</Button>
        </div>
      </div>
    );
  }
}
