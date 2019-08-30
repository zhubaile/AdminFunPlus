import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { companyupdateCompany } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { s: 8, l: 8 },
  wrapperCol: { s: 12, l: 12 },
};
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      isLoading: false,
      dustyInfo: [],
      value: {
        cpName: '',
        linkPhone: '',
        cpAddress: '',
        linkEmail: '',
        cpBusinessNumber: '',
        linkName: '',
        cpIndustryCategory: '',
      },
    };
  }
  componentDidMount() {
    // this.fetchData();
  }


  editclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  editopen(content,confirm) {
    debugger;
    this.setState({
      open: true,
      content,
      dustyInfo: confirm,
      value: content,
    });
    this.confirmCallBack = confirm;
  }
  handleSubmit(v) {
    debugger;
    companyupdateCompany({
      ...v,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.editclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { isLoading,content, confirm,value,dustyInfo } = this.state;
    const payChannel = dustyInfo.channel;
    if (!this.state.open) return null;
    console.log(value);
    return (
      <div className='edit-bulletbox'>
        <div className='edit-title'>
          <h2 style={{ display: 'inline-block' }}>编辑</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.editclose.bind(this)}>×</span>
        </div>

        <div className='edit-content'>
          <Form className='form' value={value}>
            <FormItem
              label='企业名称：'
              {...formItemLayout}
            >
              <Input
                name='cpName'
                // htmlType='password'
                placeholder='请填写有效的名称'
                // defaultValue='15617975412'
              />
            </FormItem>
            <FormItem
              label='统一社会信用代码：'
              {...formItemLayout}
            >
              <Input
                name='cpBusinessNumber'
                placeholder='请填写有效的代码'
/*                style={{ width: '100%' }}
                dataSource={confirm}
                defaultValue={content.invoiceType} */
              />
            </FormItem>
            <FormItem
              label='法人姓名：'
              {...formItemLayout}
              /* asterisk */
            >
              <Input
                name="linkName"
                placeholder="请填写有效的姓名"
                /* defaultValue={content.invoiceTitle} */
              />
            </FormItem>

            <FormItem
              label='企业地址：'
              {...formItemLayout}
            >
              <Input
                name="cpAddress"
                placeholder='请填写有效的地址'
/*                defaultValue={content.bank} */
              />
            </FormItem>

            <FormItem
              label='所属行业：'
              {...formItemLayout}
            >
              <Select
                name="cpIndustryCategory"
                style={{ width: '200px' }}
                dataSource={payChannel}
              />
              {/*   <Input
                name="cpIndustryCategory"
                placeholder="请填写有效的行业"
              /> */}
            </FormItem>

            <FormItem
              label='联系方式：'
              {...formItemLayout}
            >
              <Input
                name="linkPhone"
                placeholder="请填写有效的联系方式"
/*                defaultValue={content.taxNumber} */
              />
            </FormItem>
            <FormItem
              label='联系邮箱：'
              {...formItemLayout}
            >
              <Input
                name="linkEmail"
                placeholder="请填写有效的邮箱地址"
                /*                defaultValue={content.taxNumber} */
              />
            </FormItem>
            {/*   <FormItem
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
            </FormItem> */}
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                type="primary"
                onClick={this.handleSubmit.bind(this)}
              >
                提交
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.editclose.bind(this)}>取消</Form.Reset>
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
    // backgroundColor: 'rgba(230, 241, 252, 1)',
    // color: 'rgba(78, 126, 232, 1)',
    // borderColor: 'rgba(193, 241, 248, 1)',
    borderRadius: '4px',
  },
  submitbtn: {
    display: 'inline-block',
    width: '80px',
    height: '28px',
    // backgroundColor: 'rgba(86, 119, 252, 1)',
    borderRadius: '4px',
  },
};
