/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
import '../../index.css';
import Newrole from "./Newrole";

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

export default class Rolemanagement extends Component {
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
  zbl=(value)=>{
    this.setState({
      listValue: value,
    });
    // ajax 方法
  }
  renderStatus = () => {
    return (
      <Switch size='small' className='div-switch' defaultChecked={false} />
    );
  };
  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    },);
  }
  // 删除方法
  removes() {
    const { data,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      data.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        data.splice(index, 1);
        this.setState({
          data,
        });
      }
    });
  }
  newroleBtnOpen() {
    this.Newrole.newroleopen();
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
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };
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
      <div className='rolemanagement'>
        <Newrole ref={ node => this.Newrole = node } />
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="角色管理">
            <div className='rolemanagement-content'>
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
                      <span style={styles.formLabel}>企业名称:</span>
                      <FormBinder name="name"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary">搜索</Button>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.newroleBtnOpen.bind(this)}>新增角色</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='rolemanagement-panel'>
              <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection }>
                {/*                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                /> */}
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="姓名" dataIndex="time" />
                <Table.Column title="角色名称" dataIndex="order" />
                <Table.Column title="描述" dataIndex="remark" />
                <Table.Column title="权限类型" dataIndex="balance" />
{/*                <Table.Column title={statusBtn} dataIndex="2" cell={this.renderStatus} />*/}
                <Table.Column title="状态" dataIndex="role" cell={this.renderStatus} />
                <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
              />
              <Button className='' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
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
