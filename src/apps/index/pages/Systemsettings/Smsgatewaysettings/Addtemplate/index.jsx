/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Button, Grid, Form, Select, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { createUser } from '@indexApi';
import '../../../index.css';
import { Message } from "@alifd/next/lib/index";

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class Addtemplate extends Component {
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
  addtemplateclose() {
    this.setState({
      open: false,
      content: null,
      value: '',
    });
  }
  addtemplateopen(content,confirm) {
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
      { value: '1 ', label: '1' },
      { value: '2', label: '2' },
    ];
    const jiaose = this.state.content;
    if (!this.state.open) return null;
    return (
      <div className="addtemplate">
        <div className='addtemplate_title'>
          <h2 style={{ display: 'inline-block' }}>添加</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.addtemplateclose.bind(this)}>×</span>
        </div>
        <div className='addtemplate_content'>
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>名称：</span>
              <FormBinder name="username"
                autoWidth={false}
              >
                <Input hasClear placeholder='' />
              </FormBinder>
            </div>


            {/*          <FormBinder name='email' >
            <Input hasClear placeholder='邮箱' />
          </FormBinder>
          <FormBinder name='password'>
            <Input hasClear placeholder='密码' htmlType="password" />
          </FormBinder>
          <FormBinder name='passwordTwo'>
            <Input hasClear placeholder='重复密码' htmlType="password" />
          </FormBinder> */}

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>内容：</span>
              <FormBinder name='notes'>
                <Input.TextArea hasClear placeholder='' />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>有效时间：</span>
              <FormBinder name='quanbuyingyong'>
                <Select dataSource={yingyong} placeholder='2分钟' />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>是否启用：</span>
              <FormBinder name='phone'>
                <Switch />
              </FormBinder>
            </div>


            {/*          <FormBinder name='roles'>
            <Select dataSource={jiaose} placeholder='选择角色' />
          </FormBinder> */}
            <div className='addtemplate_content_bottom'>
{/*              <Button className='btn-all' size='large' type='secondary' onClick={this.addtemplateclose.bind(this)}>取消</Button>*/}
              <Button size='large' type='primary'>保存</Button>
            </div>

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
  formItemLabel: {
    width: '70px',
    mariginRight: '10px',
    display: 'inline-block',
    textAlign: 'right',
  },
  formItemError: {
    marginLeft: '10px',
  },
};
