import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const { Item } = MenuButton;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
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
      oper: [''],
      _id: random(10000, 20000,30000,50025,68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class OutLay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      args: [],
      value: {
        jiaose: '角色',
        haoma: '',
        timeType: '创建时间',
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
        <Switch size='small' className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked={true} />
      </div>
    );
  };
  formChange=(value)=>{
    debugger;
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
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };

    return (
      <div className='outlay'>
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="支出">
            <div style={styles.divMargin}>
              <div className='outlay-tabs'>
                <div>总支出金额：xxx</div>
                <div>支付成功率：90%</div>
              </div>
              <div className='outlay-tabs rightbtn'>
                <Button className='btn-all bg' size="large" type="secondary" disabled style={{ opacity: 0.5 }}>表格列过滤</Button>
                <Button className='btn-all bg' size="large" type="secondary">导出结果为表格</Button>
              </div>
            </div>
            <div className='outlay-tabs-border' />
            <div className=''>
              <div className='outlay-top'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <Row wrap gutter="20" style={styles.formRow}>
                    <Col l="24">
                      <div style={styles.formItem}>
                        <span style={styles.formLabel}>选择时间</span>
                        <FormBinder name="timeType"
                          autoWidth={false}
                        >
                          <Select style={styles.formSelect} dataSource={timeType} defaultValue='创建时间' />
                        </FormBinder>
                        <FormBinder name='startdate'>
                          <RangePicker className='showHour' showTime resetTime />
                        </FormBinder>
                        <span style={styles.formLabel}>退款状态</span>
                        <FormBinder name='refundStatus'>
                          <Select style={styles.formSelect} dataSource={refundStatus} />
                        </FormBinder>
                        <span style={styles.formLabel}>付款状态</span>
                        <FormBinder name='orderStatus'>
                          <Select style={styles.formSelect} dataSource={orderStatus} />
                        </FormBinder>
                      </div>
                    </Col>
                    <Col l="24">
                      <div style={styles.formItemTwo}>
                        <span style={styles.formLabel}>付款渠道</span>
                        <FormBinder name='payChannel'>
                          <Select style={styles.formSelect} dataSource={payChannel} />
                        </FormBinder>
                        <FormBinder name="device" >
                          <Select style={{ width: '200px' }} dataSource={device} />
                        </FormBinder>
                        <span style={styles.formLabel}>订单号</span>
                        <FormBinder name='out_trade_no'>
                          <Input className='input-bg' placeholder='输入订单号' />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary">搜索</Button>
                        <Button className='btn-all bg' size="large" type="secondary">重置</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>

              </div>
            </div>
            <div className='outlay-panel' >
              <div className=''>
                <div className='tab-panel'>
                  <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
{/*                    <Table.Column
                      title=""
                      width={50}
                      dataIndex=""
                      cell={this.renderSelectall}
                    />*/}
                    <Table.Column title="商户ID" dataIndex="merchantId" />
                    <Table.Column title="企业名称" dataIndex="name" />
                    <Table.Column title="创建时间完成时间" dataIndex="time" />
                    <Table.Column title="商户订单号平台流水号" dataIndex="order" />
                    <Table.Column title="商品名称备注" dataIndex="remark" />
                    <Table.Column title="创建金额实付金额" dataIndex="balance" />
                    <Table.Column title="支付状态" dataIndex="email" />
                    <Table.Column title="退款金额退款状态" dataIndex="tel" />
                    <Table.Column title="分润金额分润状态" dataIndex="role" />
                    <Table.Column title="渠道设备ID" dataIndex="status" />
                    <Table.Column title="操作" dataIndex="oper" />
                  </Table>
                  <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={current}
                    onChange={this.handlePaginationChange}
                  />
                  <Button className='' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
                </div>
              </div>
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
  delbtn: {
    marginLeft: '20px',
  },
};
