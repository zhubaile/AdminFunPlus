/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Radio, Switch, Form,Message } from '@alifd/next';
import { siteConfigget,siteConfigpost } from '@indexApi';
import '../../index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { xxs: 8, s: 2, l: 2 },
  wrapperCol: { s: 8, l: 6 },
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Siteconfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        siteName: '',
        netName: '',
        netDomin: '',
        siteMail: '',
        copyright: '',
        baNo: '',
        isCash: false,
        isCreateIndex: true,
        netCloseTip: '',
      },
    };
  }

  // 获取初始值
  componentDidMount() {
    siteConfigget().then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          value: data.data,
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  SubInvoiceinfo(v,e) {
    debugger;
    siteConfigpost({
      ...v,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
      } else {
        Message.success(data.message);
      }
    });
  }
  tabBtnOne() {
    debugger;
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
    return (
      <div className='siteconfiguration'>
        <Tab shape='pure' defaultActiveKey='1' >
          <Tab.Item title="站点配置" key='1' onClick={this.tabBtnOne.bind(this)}>
            <div className='siteconfiguration-content'>
              <Form className='form' value={this.state.value}>
                <FormItem
                  label='站点名称'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name='siteName'
                    placeholder='请输入'
                  />
                </FormItem>
                <FormItem
                  label='网站名称'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name='netName'
                    placeholder='请输入'
                  />
                </FormItem>

                <FormItem
                  label='网站域名'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name="netDomin"
                    placeholder=""
                  />
                </FormItem>

                <FormItem
                  label='站长邮箱'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name="siteMail"
                    placeholder=''
                  />
                </FormItem>

                <FormItem
                  label='版权所有'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name="copyright"
                    placeholder=''
                  />
                </FormItem>
                <FormItem
                  label='备案号'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name="baNo"
                    placeholder=''
                  />
                </FormItem>
                <FormItem
                  label='是否缓存'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Switch name='isCash' />
                  <span>（是否禁用）</span>
                </FormItem>
                <FormItem
                  label='静态首页'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <RadioGroup aria-labelledby="radio-a11y" name='isCreateIndex'>
                    <Radio id="true" value>生成</Radio>
                    <Radio id="java" value={false}>不生成</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem
                  label='闭站提示'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input.TextArea name='netCloseTip' placeholder='服务器正在打瞌睡' />
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

          <Tab.Item title="邮箱收发设置" key='2' onClick={this.tabBtnTwo.bind(this)}>
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
    margin: '10px 0',
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
