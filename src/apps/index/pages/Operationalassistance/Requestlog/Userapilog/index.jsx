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
      appId: 'wx56546',
      name: ['- -'],
      status: '登录',
      remark: ['管理平台'],
      time: '20190602',
      ip: '168.112.36',
      _id: random(10000, 20000, 30000, 50025, 68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Userapilog extends Component {
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
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange=(value)=>{
    debugger;
  };
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
    this.props.history.push("/backadmin/Operationalassistance/useractionlog");
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
      <div className='userapilog'>
        <Tab shape='pure'defaultActiveKey='2'>
          <Tab.Item title="用户操作日志" key='1' onClick={this.tabBtn.bind(this)}></Tab.Item>
          <Tab.Item title="用户API日志" key='2'>
            <div className='userapilog-top'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>

                      <span style={styles.formLabel}>请求时间：</span>
                      <FormBinder name='refundStatus'>
                        <RangePicker style={styles.formInput} />
                      </FormBinder>
                      <span style={styles.formLabel}>请求状态：</span>
                      <FormBinder name="device" >
                        <Select style={{ width: '200px' }} dataSource={device} />
                      </FormBinder>
                      <span style={styles.formLabel}>请求IP：</span>
                      <FormBinder name='out_trade_no'>
                        <Input className='' placeholder='请输入' />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary">搜索</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='userapilog-panel' >
              <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                {/*                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                /> */}
                <Table.Column title="APPID" dataIndex="appId" />
                <Table.Column title="请求接口" dataIndex="name" />
                <Table.Column title="请求状态" dataIndex="status" />
                <Table.Column title="请求描述" dataIndex="remark" />
                <Table.Column title="请求时间" dataIndex="time" />
                <Table.Column title="请求IP" dataIndex="ip" />
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
              <Button className='' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
            </div>
          </Tab.Item>
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
