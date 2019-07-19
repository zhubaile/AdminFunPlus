import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { businessInformation } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../index.css';

import Edit from "./Edit/index";
import Freezeuser from "./Freezeuser/index";
import Certificationstatus from "./Certificationstatus/index";

const { Item } = MenuButton;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['甲乙'],
      time: '1234789',
      order: '茅以升',
      remark: ['上海市...'],
      balance: '互联网',
      tel: ['1361111'],
      email: ['52@'],
      role: [' 7'],
      status: '成功',
      oper: ['查看'],
      _id: random(10000, 20000,30000,50025,68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Businessinformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
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

/*  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };*/

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize;
        const pages = this.state.current;
        businessInformation({
          pageSize,
          pages,
        }).then(({ status, data })=>{
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
            });
          } else {
            Message.success(data.message);
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
  renderOper = () => {
    return (
      <div className='tb_span'>
        <span onClick={this.editBtnOpen.bind(this)}>编辑</span>

        <span style={{ color: 'darkorange' }} onClick={this.freezeUserOpen.bind(this)}>冻结</span>
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
      <div style={{ color: 'red', cursor: 'pointer' }}>
      <span onClick={this.certificationStatusOpen.bind(this)}>成功</span>
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

  editBtnOpen() {
    this.Edit.editopen();
  }
  freezeUserOpen() {
    this.Freezeuser.freezeUseropen();
  }
  certificationStatusOpen() {
    this.Certificationstatus.certificationopen();
  }
  // 获取到选中的数据
  Choice(args) {
    debugger;
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
  render() {
    const { isLoading, data, current, pageSize, total } = this.state;
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
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };

    return (
      <div className='businessinformation'>

        <Edit ref={ node => this.Edit = node } />
        <Freezeuser ref={ node => this.Freezeuser = node } />
        <Certificationstatus ref={ node => this.Certificationstatus = node } />
        <Tab shape='pure'>
          <Tab.Item title="商户信息">
            <div className='businessinformation-top'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="timeType"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} placeholder='' />
                      </FormBinder>
                      <span style={styles.formLabel}>企业名称：</span>
                      <FormBinder name='refundStatus'>
                        <Input style={styles.formInput} placeholder='' />
                      </FormBinder>
                      <span style={styles.formLabel}>法人姓名：</span>
                      <FormBinder name='orderStatus'>
                        <Input style={styles.formInput} placeholder='' />
                      </FormBinder>
                    </div>
                  </Col>
                  <Col l="24">
                    <div style={styles.formItemTwo}>
                      <span style={styles.formLabel}>所属行业：</span>
                      <FormBinder name='payChannel'>
                        <Select style={styles.formSelect} dataSource={payChannel} />
                      </FormBinder>
                      <span style={styles.formLabel}>手机号：</span>
                      <FormBinder name='out_trade_no'>
                        <Input className='input-bg' placeholder='' />
                      </FormBinder>
                      <span style={styles.formLabel}>状态：</span>
                      <FormBinder name="device" >
                        <Select style={{ width: '200px' }} dataSource={device} />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary">搜索</Button>
                      <Button className='btn-all bg' size="large" type="primary" style={{ opacity: '0.5' }}>重置</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='businessinformation-panel' >
              <Table loading={isLoading} dataSource={data} pageSize={pageSize} total={total} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
{/*                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                />*/}
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="统一社会信用代码" dataIndex="time" />
                <Table.Column title="法人姓名" dataIndex="order" />
                <Table.Column title="企业地址" dataIndex="remark" />
                <Table.Column title="所属行业" dataIndex="balance" />
                <Table.Column title="联系方式" dataIndex="tel" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="上次登录时间" dataIndex="role" />
                <Table.Column title="登录状态" cell={this.renderStatus} />
                <Table.Column title="权限状态" cell={this.renderPermission} />
                <Table.Column title="认证状态" dataIndex="status" cell={this.renderCertification} />
                <Table.Column title="操作" cell={this.renderOper} />
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
