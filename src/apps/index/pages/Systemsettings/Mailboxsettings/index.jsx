/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Message, Table, Checkbox, Switch, Form } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { mailConfigget,mailConfigpost } from '@indexApi';
import '../../index.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 8, s: 2, l: 2 },
  wrapperCol: { s: 8, l: 6 },
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Mailboxsettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      value: {
        mailMode: 'SMTP', host: '', port: '', sender: '', sendName: '',loginUser: '',loginPass: '',
      },
    };
  }

  componentDidMount() {
    mailConfigget().then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          value: data.data,
        });
      } else {
        Message.success(data.message);
      }
    });
  }

  SubInvoiceinfo = (v,e) => {
    debugger;
    mailConfigpost({
      mailMode: 'SMTP',
      ...v,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
      } else {
        Message.success(data.message);
      }
    });
  };
  tabBtnOne() {
    this.props.history.push("/backadmin/Systemsettings/siteconfiguration");
  }
  tabBtnTwo() {
    this.props.history.push("/backadmin/Systemsettings/mailboxsettings");
  }
  tabBtnThree() {
    this.props.history.push("/backadmin/Systemsettings/smsgatewaysettings");
  }
  tabBtnFour() {
    this.props.history.push("/backadmin/Systemsettings/qrcodegateway");
  }
  tabBtnfive(){
    this.props.history.push("/backadmin/Systemsettings/industryCategory");
  }
  render() {
    const { isLoading, data, current } = this.state;
    return (
      <div className='mailboxsettings'>
        <Tab shape='pure' defaultActiveKey='2'>
          <Tab.Item title="站点配置" key='1' onClick={this.tabBtnOne.bind(this)} >

          </Tab.Item>
          <Tab.Item title="邮箱收发设置" key='2'>
            <div className='mailboxsettings-content'>
              <Form className='form' value={this.state.value}>
                <FormItem
                  label='邮箱模式:'
                  {...formItemLayout}
                >
                  <Checkbox checked >SMYP函数发送</Checkbox>
                </FormItem>
                <FormItem
                  label='服务器:'
                  {...formItemLayout}
                >
                  <Input
                    name="host"
                    placeholder='单行输入'
                    /*                defaultValue={content.bank} */
                  />
                </FormItem>
                <FormItem
                  label='端口:'
                  {...formItemLayout}
                >
                  <Input
                    name="port"
                    placeholder='单行输入'
                    /*                defaultValue={content.bank} */
                  />
                </FormItem>
                <FormItem
                  label='发件人:'
                  {...formItemLayout}
                >
                  <Input
                    name="sender"
                    placeholder='admin@abc.com'
                    /*                defaultValue={content.bank} */
                  />
                </FormItem>
                <FormItem
                  label='名称:'
                  {...formItemLayout}
                >
                  <Input
                    name='sendName'
                    placeholder='系统管理员'
                    /*                style={{ width: '100%' }}
                                    dataSource={confirm}
                                    defaultValue={content.invoiceType} */
                  />
                </FormItem>
                <FormItem
                  label='用户名:'
                  {...formItemLayout}
                >
                  <Input
                    name='loginUser'
                    placeholder='请输入用户名'
                    /*              defaultValue={content.company} */
                  />
                </FormItem>

                <FormItem
                  label='密码:'
                  {...formItemLayout}
                  /* asterisk */
                >
                  <Input
                    name="loginPass"
                    placeholder="请输入密码"
                    htmlType='password'
                    /* defaultValue={content.invoiceTitle} */
                  />
                </FormItem>

                <FormItem wrapperCol={{ offset: 2 }} >
                  <Form.Submit
                    style={styles.submitbtn}
                    validate
                    type="primary"
                    onClick={(v, e) => this.SubInvoiceinfo(v,e)}
                  >
                    提交
                  </Form.Submit>
                </FormItem>
              </Form>
            </div>
          </Tab.Item>

          <Tab.Item title="短信网关" key='3' onClick={this.tabBtnThree.bind(this)}>
          </Tab.Item>

          <Tab.Item title="二维码网关" key='4' onClick={this.tabBtnFour.bind(this)}>
          </Tab.Item>
          <Tab.Item title="行业类目" key='5' onClick={this.tabBtnfive.bind(this)}>
          </Tab.Item>
          {/*          <Tab.Item title="极验设置">
          </Tab.Item> */}
        </Tab>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  formItemTwo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  formLabel: {
    minWidth: '80px',
    marginLeft: '10px',
    textAlign: 'center',
  },
  formSelect: {
    width: '200px',
    margin: '0 10px',
  },
  formInput: {
    margin: '0 10px',
  },
  submitbtn: {
    borderRadius: 4,
    width: 80,
    height: 30,
  },
  delbtn: {
    marginLeft: '20px',
  },
};
