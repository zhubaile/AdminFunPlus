/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { sysLoglist } from '@indexApi';
import moment from "moment/moment";
import '../../index.css';

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

export default class Operationlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      total: 0,
      current: 1,
      isLoading: false,
      result: [],
      data: [],
      toplist: false,
      value: {
        username: '',
        startdate: [],
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (name,arrivalDate) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize;
        const page = this.state.current;
        sysLoglist({
          pageSize,
          page,
          username: name,
          arrivalDate,
        }).then(({ status, data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
              result: data.data.result,
              total: data.data.totalCount,
            });
          }
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

  formChange = (value) => {
    // this.props.onChange(value);
    this.setState({
      value,
    });
  };
  // 搜索按钮
  search(e) {
    const { validateFields } = this.refs.form;
    validateFields((errors,values)=>{
      debugger;
      const arrivalDate = [];
      if (values.startdate.length == 2) {
        if (values.startdate[0] && values.startdate[1]) {
          const startdatestart = moment(values.startdate[0]._d).valueOf();
          const startdateend = moment(values.startdate[1]._d).valueOf();
          arrivalDate.push(startdatestart,startdateend);
        } else if (values.startdate[0]) {
          const startdatestart = moment(values.startdate[0]._d).valueOf();
          const startdateend = '';
          arrivalDate.push(startdatestart,startdateend);
        } else if (values.startdate[1]) {
          const startdatestart = '';
          const startdateend = moment(values.startdate[1]._d).valueOf();
          arrivalDate.push(startdatestart,startdateend);
        } else {
          return null;
        }
      }
      debugger;
      this.fetchData(values.username,arrivalDate);
    });
  }
  // 添加分组
  groupingopen() {
    this.Addgrouping.addgroupingopen();
  }
  // 获取分组列表
  grouplist() {
    this.setState({
      toplist: !this.state.toplist,
    });
  }
  // 获取设备参数
  /*  deviceopen(id) {
    // const dd = this.state.ApplicationChannel;
    console.log(id);
    deviceparams({
      dGroupId: id,
    }).then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.grouplist();
          this.Official.officialopen(data.data,id);
          /!* this.setState({
            datas: data.data,
          });
          debugger; *!/
          // this.Custom.customopen();
        }
      }
    );
  } */
  render() {
    const { isLoading, data, current, pageSize, total,result } = this.state;
    const Allstatus = [
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
      { value: '日限满额', label: '日限满额' },
    ];
    return (
      <div className='operationlog'>
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="操作日志">
            <div className='operationlog-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>用户名:</span>
                      <FormBinder name="username"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <span style={styles.formLabel}>操作时间:</span>
                      <FormBinder name="startdate"
                        autoWidth={false}
                      >
                        <RangePicker style={styles.formInput} showTime resetTime />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary" onClick={this.search.bind(this)}>搜索</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='operationlog-panel'>
              <Table loading={isLoading} dataSource={result} hasBorder={false}>
                <Table.Column title="用户名" dataIndex="username" />
                <Table.Column title="IP" dataIndex="host" />
                <Table.Column title="操作" dataIndex="urlName" />
                <Table.Column title="操作时间" dataIndex="createdAt" />
                {/* <Table.Column title="说明" dataIndex="" /> */}
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={this.handlePaginationChange}
              />
            </div>
          </Tab.Item>
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
  delbtn: {
    marginLeft: '20px',
  },
};
