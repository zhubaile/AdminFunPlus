import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const { Item } = MenuButton;
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['有此山'],
      time: '123456@qq.com',
      order: 'admin01',
      remark: ['- -.'],
      balance: '管理平台',
      tel: ['- -'],
      email: ['52@'],
      role: [' 168.112.36'],
      status: '成功',
      oper: ['登录'],
      _id: random(10000, 20000, 30000, 50000, 60000),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Useractionlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      args: [],
      value: {
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
        device: '',
        out_trade_no: '',
      },
    };
  }


  componentDidMount() {
    debugger;
    this.fetchData();
  }

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
        <a>编辑</a>
        <a>重置密码</a>
        <a>冻结</a>
      </div>
    );
  };
  renderStatus = () => {
    return (
      <div>
        <Switch size='small' className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  renderPermission = () => {
    return (
      <div>
        <Switch size='small' className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  renderCertification = () => {
    return (
      <div>
        <a>成功</a>
      </div>
    );
  }
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange=(value)=>{
    debugger;
  }
  Choice(args) {
    this.setState({
      args,
    });
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
  tabBtn() {
    this.props.history.push("/backadmin/Operationalassistance/Userapilog");
  }
  render() {
    const { isLoading, data, current } = this.state;
    const timeType = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const orderStatus = [
      { value: '1 ', label: '1' },
      { value: '2', label: '2' },
    ];
    const refundStatus = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const payChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const device = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };

    return (
      <div className='useractionlog'>
        <Tab shape='pure'>
          <Tab.Item title="用户操作日志">
            <div className='useractionlog-top'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20">
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="timeType"
                        autoWidth={false}
                      >
                        <Input style={styles.formSelect} placeholder='请输入' />
                      </FormBinder>
                      <span style={styles.formLabel}>企业名称：</span>
                      <FormBinder name='refundStatus'>
                        <Input style={styles.formSelect} placeholder='请输入' />
                      </FormBinder>
                      <span style={styles.formLabel}>应用ID：</span>
                      <FormBinder name='out_trade_no'>
                        <Input style={styles.formSelect} placeholder='请输入' />
                      </FormBinder>
                      <span style={styles.formLabel}>IP地址：</span>
                      <FormBinder name="device" >
                        <Input style={styles.formSelect} placeholder='请输入' />
                      </FormBinder>
                      <Button className='btn-all' size="large" type="primary">搜索</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='useractionlog-panel' >
              <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                {/* <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                /> */}
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="账号" dataIndex="time" />
                <Table.Column title="用户名称" dataIndex="order" />
                <Table.Column title="应用" dataIndex="tel" />
                <Table.Column title="操作" dataIndex="oper" />
                <Table.Column title="操作对象" dataIndex="balance" />
                <Table.Column title="备注" dataIndex="remark" />
                <Table.Column title="IP" dataIndex="role" />
                {/*                <Table.Column title="登录状态" cell={this.renderStatus} />
                <Table.Column title="权限状态" cell={this.renderPermission} />
                <Table.Column title="认证状态" dataIndex="status" cell={this.renderCertification} />
                <Table.Column title="操作" cell={this.renderOper} /> */}
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
              />
              <Button className='btn-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
            </div>
          </Tab.Item>
          <Tab.Item title="用户API日志" onClick={this.tabBtn.bind(this)}></Tab.Item>
        </Tab>
      </div>
    );
  }
}

const styles = {
  divMargin: {
    margin: '20px 0px',
  },
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
    textAlign: 'left',
    marginRight: '5px',
  },
  formSpecial: {
    width: '200px',
    marginRight: '10px',
  },
  formSelect: {
    width: '200px',
    marginRight: '25px',
  },
  formTime: {
    marginRight: '25px',
  },
  delbtn: {
    marginLeft: '20px',
  },
};
