/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Button, Grid, Form, Select, Checkbox } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Demopay from '../../../../../Website/pages/Demo/Demopay';
import '../../../index.css';

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class Editingrole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        rolename: '',
        roledescription: '',
        /*        phone: '',
                pass: '',
                password: '',
                beizhu: '',
                yingyong: '全部应用',
                jiaose: '选择角色', */
      },
      open: false,
      content: null,
      payvalue: '',
    };
  }
  cancelbtnclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  open(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  render() {
    /*    const yingyong = [
          { value: '全部应用 ', label: '全部应用' },
          { value: '待分配', label: '待分配' },
        ];
        const jiaose = [
          { value: '选择角色', label: '选择角色' },
          { value: '人', label: '人' },
        ]; */
    if (!this.state.open) return null;
    return (
      <div className="editingrole">
        <h2>编辑角色</h2>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <label>角色名称</label>
            <FormBinder name="rolename"
                        autoWidth={false}
            >
              <Input disabled hasClear placeholder='角色名称' />
            </FormBinder>
          </div>
          <div>
            <label>权限说明</label>
            <FormBinder name='roledescription' >
              <Input hasClear placeholder='角色说明' />
            </FormBinder>
          </div>

          <p>账户面板权限</p>
          <Checkbox defaultChecked value="">账户概览</Checkbox>
          <Checkbox defaultChecked value="">余额明细</Checkbox>
          <Checkbox defaultChecked value="">订单中心</Checkbox>

          <p>应用面板权限</p>
          <Checkbox defaultChecked value="">应用概览</Checkbox>
          <Checkbox defaultChecked value="">支付渠道</Checkbox>
          <Checkbox defaultChecked value="">收款账号</Checkbox>

          <p>操作权限</p>
          <Checkbox defaultChecked value="">退款（包含支付订单、支付订单批量退款、业务订单查询、充值记录管理处的退款权限）</Checkbox>

          {/*          <FormBinder name='phone'>
            <Input hasClear placeholder='手机号' />
          </FormBinder>
          <FormBinder name='pass'>
            <Input hasClear placeholder='密码' htmlType="password" />
          </FormBinder>
          <FormBinder name='passwprd'>
            <Input hasClear placeholder='密码' htmlType="password" />
          </FormBinder>
          <FormBinder name='beizhu'>
            <Input hasClear placeholder='备注' htmlType="password" />
          </FormBinder>
          <FormBinder name='yingyong'>
            <Select dataSource={yingyong} defaultValue='选择应用' />
          </FormBinder>
          <FormBinder name='jiaose'>
            <Select dataSource={jiaose} defaultValue='选择角色' />
          </FormBinder> */}
        </FormBinderWrapper>
        <div>
          <Button type='secondary' style={styles.cancelbtn} onClick={this.cancelbtnclose.bind(this)}>取消</Button>
          <Button type='primary' style={styles.submitbtn}>提交</Button>
        </div>


      </div>
    );
  }
}

const styles = {
  cancelbtn: {
    display: 'inline-block',
    margin: '10px 20px 20px 40px',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(255, 159, 159, 1)',
    color: 'rgba(255, 255, 255, 1)',
    border: 'none',
    borderRadius: '6px',
  },
  submitbtn: {
    display: 'inline-block',
    margin: '10px 20px 20px 40px',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    border: 'none',
    borderRadius: '6px',
  },
};
