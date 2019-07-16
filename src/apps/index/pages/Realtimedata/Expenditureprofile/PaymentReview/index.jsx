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
      remark: ['￥100.00'],
      email: ['支付中'],
      tel: ['api付款'],
      status: '京东代付',
      oper: ['查看'],
      _id: random(10000, 20000,30000,50025,68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class PaymentReview extends Component {
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
      <div className='tb_span'>
        <span>查看</span>
{/*        <Switch size='small' className='div-switch' defaultChecked={false} />*/}
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
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    return (
      <div className='paymentreview'>
        <Tab shape='pure' className='paymentreview-tab'>
          <Tab.Item title="出款审核">
            <div className=''>
              <div className='paymentreview-top'>
                <div className='paymentreview-tabs'>
                  <div>今日总收入￥1232323</div>
                  <div>今日退款￥234232</div>
                </div>
                <div className='paymentreview-text'>
                  <p>本日财务通过：￥5555</p>
                  <p>免审核：5555</p>
                </div>

              </div>
            </div>
            <div className='paymentreview-panel' >
              <div className='tab-bg'>
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
                    <Table.Column title="支付金额" dataIndex="remark" />
                    <Table.Column title="支付状态" dataIndex="email" />
                    <Table.Column title="批次号" dataIndex="tel" />
                    <Table.Column title="付款渠道" dataIndex="status" />
                    <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
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
