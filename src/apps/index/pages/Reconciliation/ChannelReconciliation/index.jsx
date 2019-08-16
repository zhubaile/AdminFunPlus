import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const { Item } = MenuButton;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      order: '02456245',
      pay: '支付宝',
      type: '支付',
      remark: '20190606',
      balance: '￥100.00',
      zhuangtai: '完成',
      time: '20190606',
      tel: '20190606',
      role: '日对账',
      status: '对账成功',
      oper: [''],
      _id: random(10000, 20000,30000,50025,68522),

    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class ChannelReconciliation extends Component {
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
  search() {
    const values = this.state.value;
    debugger;
    /*    this.refs.linegraph.fetchData(values); */
  }
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
        <span>查看</span>
        {/* <Switch size='small' className='div-switch' defaultChecked={false} /> */}
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
    const payChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];

    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
      },
    };

    return (
      <div className='channelreconciliation'>
        <Tab shape='pure' className='channelreconciliation-tab'>
          <Tab.Item title="渠道对账">
            <div className=''>
              <div className='channelreconciliation-top'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  {/* <Row wrap gutter="20">
                    <Col l="24"> */}
                  <div style={styles.formItem}>
                    <div style={styles.formItemdiv}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="timeType"
                        autoWidth={false}
                      >
                        <Input style={styles.formSelect} placeholder='' />
                      </FormBinder>
                    </div>
                    <div style={styles.formItemdiv}>
                      <span style={styles.formLabel}>交易时间：</span>
                      <FormBinder name='startdate'>
                        <RangePicker className='showHour' showTime resetTime style={styles.formTime} />
                      </FormBinder>
                    </div>
                    <div style={styles.formItemdiv}>
                      <span style={styles.formLabel}>商户订单号：</span>
                      <FormBinder name='orderStatus'>
                        <Input style={styles.formSelect} />
                      </FormBinder>
                    </div>
                    <div style={styles.formItemdiv}>
                      <span style={styles.formLabel}>支付渠道：</span>
                      <FormBinder name='payChannel'>
                        <Select style={styles.formSelect} dataSource={payChannel} />
                      </FormBinder>
                    </div>
                    <div style={styles.formItemdiv}>
                      <span style={styles.formLabel}>支付渠道流水号：</span>
                      <FormBinder name='out_trade_no'>
                        <Input style={styles.formSelect} className='input-bg' placeholder='' />
                      </FormBinder>
                    </div>
                    <Button className='btn-all bg' size="large" type="primary" onClick={this.search.bind(this)}>搜索</Button>
                  </div>
                  {/* </Col>
                    <Col l="24"> */}
                  {/* <div style={styles.formItemTwo}>

                      </div> */}
                  {/* </Col>
                  </Row> */}
                </FormBinderWrapper>

              </div>
            </div>
            <div className='channelreconciliation-panel' >
              <div className=''>
                <div className='tab-panel'>
                  <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                    <Table.Column title="商户ID" dataIndex="merchantId" />
                    <Table.Column title="商户订单号" dataIndex="order" />
                    <Table.Column title="支付渠道" dataIndex="pay" />
                    <Table.Column title="交易类型" dataIndex="type" />
                    <Table.Column title="支付渠道流水号" dataIndex="remark" />
                    <Table.Column title="交易金额" dataIndex="balance" />
                    <Table.Column title="状态" dataIndex="zhuangtai" />
                    <Table.Column title="交易时间" dataIndex="time" />
                    <Table.Column title="清算日期" dataIndex="tel" />
                    <Table.Column title="对账周期" dataIndex="role" />
                    <Table.Column title="对账结果" dataIndex="status" />
                    <Table.Column title="对账处理" dataIndex="oper" cell={this.renderOper} />
                  </Table>
                  <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={current}
                    onChange={this.handlePaginationChange}
                  />
                  <Button className='btn-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
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
    flexWrap: 'wrap',
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
  formItemdiv: {
    margin: '10px 0',
  },
};
