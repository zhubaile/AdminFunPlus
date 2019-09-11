/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch, Form } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
import '../../index.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 8, s: 3, l: 3 },
  wrapperCol: { s: 8, l: 6 },
};
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      _id: random(10000, 20000, 30000, 50025, 68522),
      name: '甲乙',
      admin: 'admin',
      ip: '168.112.36',
      oper: '后台登录',
      time: '2019.6.11 11:36',
      description: '成功',
      remark: '',
      balance: '￥100.00',
      email: '',
      tel: '',
      role: '',
      status: '',
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Qrcodegateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      /*      datas: [], */
      args: [],
      toplist: false,
      grouplistdata: [
        { dGroupName: '' },
      ],
      value: {
        name1: '',
        name2: '',
        name3: '',
        e_mail: '',
        copyright: '',
        number: '',
        prompt: '',
        timeType: '',
        username: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
        listValue: '状态',
      },
    };
  }

  componentDidMount() {
    debugger;
    this.Toupdatelist();
    this.fetchData();
  }

  // 获取分组列表
  Toupdatelist=()=>{
    deviceGrouplist().then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.setState({
            grouplistdata: data.data,
          });
        }
        // Message.success(data.message);
      }
    );
  };
  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => { // data 里面为数据
          debugger;
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };
  renderOper = () => {
    return (
      <div>
        <span>编辑</span>
      </div>
    );
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange = (value) => {
    this.props.onChange(value);
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
  tabBtnfive() {
    this.props.history.push("/backadmin/Systemsettings/industryCategory");
  }
  render() {
    const { isLoading, data, current } = this.state;
    const shuju = [
      { value: '1', label: '1' },
    ];

    return (
      <div className='qrcodegateway'>
        <Tab shape='pure' defaultActiveKey='4'>
          <Tab.Item title="站点配置" key='1' onClick={this.tabBtnOne.bind(this)}>

          </Tab.Item>

          <Tab.Item title="邮箱收发设置" key='2' onClick={this.tabBtnTwo.bind(this)}>
          </Tab.Item>

          <Tab.Item title="短信网关" key='3' onClick={this.tabBtnThree.bind(this)}>
          </Tab.Item>

          <Tab.Item title="二维码网关" key='4'>
            <div className='qrcodegateway-content'>
              <Form className='form'>
                <FormItem
                  label='获取唯一标识'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Input
                    name='name1'
                    placeholder=''
                    /*                style={{ width: '100%' }}
                                    dataSource={confirm}
                                    defaultValue={content.invoiceType} */
                  />
                </FormItem>
                <FormItem
                  label='二维码有效时间：'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Select name='time' dataSource={shuju} />
                </FormItem>
                <FormItem
                  label='展示二维码：'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <img src='' alt='' />
                </FormItem>
                <FormItem
                  label='免授权登录:'
                  {...formItemLayout}
                  style={styles.formItem}
                >
                  <Switch defaultChecked value="" />
                </FormItem>
                <FormItem wrapperCol={{ offset: 3 }} >
                  <Form.Submit
                    style={styles.submitbtn}
                    validate
                    type="primary"
                    /*                  onClick={(v, e) => this.SubInvoiceinfo(v,e)} */
                  >
                    提交
                  </Form.Submit>
                </FormItem>
              </Form>
            </div>
          </Tab.Item>
          <Tab.Item title="行业类目" key='5' onClick={this.tabBtnfive.bind(this)}>
          </Tab.Item>
          {/* <Tab.Item title="极验设置">
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
