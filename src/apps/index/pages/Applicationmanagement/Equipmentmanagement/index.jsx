/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Addgrouping from './Addgrouping';
import Official from './Adddevice/official';
import Custom from './Adddevice/custom';
import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
import '../../index.css';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      _id: random(10000, 20000, 30000, 50025, 68522),
      merchantId: '000662',
      name: ['花果山'],
      time: '20190606',
      order: '02456245',
      remark: ['贵'],
      balance: '￥100.00',
      email: ['支付中'],
      tel: ['￥100.00'],
      role: [' ￥100.00'],
      status: '支付宝wap',
      oper: ['查看'],
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class EquipmentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
/*      datas: [],*/
      args: [],
      toplist: false,
      grouplistdata: [
        { dGroupName: '' },
      ],
      value: {
        timeType: '',
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
        <Switch size='small' className='div-switch' defaultChecked={false} />
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
  zbl=(value)=>{
    this.setState({
      listValue: value,
    });
    // ajax 方法
  }
  renderStatus = () => {
    return (
      <p>可使用</p>
    );
  };
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
  deviceopen(id) {
    // const dd = this.state.ApplicationChannel;
    console.log(id);
    deviceparams({
      dGroupId: id,
    }).then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.grouplist();
          this.Official.officialopen(data.data,id);
          /* this.setState({
            datas: data.data,
          });
          debugger; */
          // this.Custom.customopen();
        }
      }
    );
  }
  render() {
    const { isLoading, data, current } = this.state;
    const Allstatus = [
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
      { value: '日限满额', label: '日限满额' },
    ];
    const statusBtn = (
      <Select onChange={this.zbl} placeholder={this.state.listValue} dataSource={Allstatus} />
    );
    const grouplistdata = this.state.grouplistdata;
    const equipmentlist = (
      <ul className="event-list">
        {
          grouplistdata.map((item,key)=>{
            return (
              <li key={key}>
                <p>{item.dGroupName}</p>
                <button onClick={()=>this.deviceopen(item._id)}>添加设备</button>
              </li>
            );
          })
        }
      </ul>
    );
    return (
      <div className='equipmentmanagement'>
        <Addgrouping ref={(node=>this.Addgrouping = node)} Toupdatelist={this.Toupdatelist} />
        <Official ref={(node=>this.Official = node)} />
        <Custom ref={(node=>this.Custom = node)} />
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="设备管理">
            <div className='equipmentmanagement-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID:</span>
                      <FormBinder name="merchantId"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <span style={styles.formLabel}>设备ID:</span>
                      <FormBinder name="name"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary">搜索设备</Button>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.grouplist.bind(this)}>分组列表</Button>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.groupingopen.bind(this)}>编辑分组</Button>
                      <div className={this.state.toplist ? ('devicemanagement-top-list opicty') : ('devicemanagement-top-list')} >
                        {equipmentlist}
                        {/* <button className='devicemanagement-top-list-btn' onClick={this.closetoplist.bind(this)}>关闭列表</button> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='equipmentmanagement-panel'>
              <Table loading={isLoading} dataSource={data} hasBorder={false}>
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="设备名称" dataIndex="role" />
                <Table.Column title="设备ID" dataIndex="time" />
                <Table.Column title="今日流水/笔" dataIndex="order" />
                <Table.Column title="昨日流水/笔" dataIndex="remark" />
                <Table.Column title="累计流水/笔" dataIndex="balance" />
                <Table.Column title={statusBtn} dataIndex="2" cell={this.renderStatus} />
                <Table.Column title="操作" dataIndex="oper" />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
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
