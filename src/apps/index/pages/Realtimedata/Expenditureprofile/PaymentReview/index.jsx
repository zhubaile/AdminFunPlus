import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { payOutExamineList } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const { Item } = MenuButton;
/* const random = (min, max) => {
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
}; */
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class PaymentReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      args: [],
      type: 'pay', // 选择的那个值
      datas: [],
      todayIncome: '',
      todayrefund: '',
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
    const type = this.state.type;
    this.fetchData(type);
  }

  fetchData = (len) => {
    /*    debugger; */
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const page = this.state.current;
        const pageSize = this.state.pageSize;
        payOutExamineList({
          type: len,
          page,
          pageSize,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data.result,
              todayIncome: data.data.todayIncome,
              todayrefund: data.data.todayrefund,
              isLoading: false,
              type: len,
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
        <span>查看</span>
        {/*        <Switch size='small' className='div-switch' defaultChecked={false} /> */}
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
    const { datas,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      datas.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        datas.splice(index, 1);
        this.setState({
          datas,
        });
      }
    });
  }
  qiyepay() {
    this.fetchData('pay');
  }
  piliangpay() {
    this.fetchData('batchPay');
  }
  dingdannopay() {
    this.fetchData('refund');
  }
  qiyenopay() {
    this.fetchData('batchRefund');
  }
  render() {
    const { isLoading, current, pageSize, total, type, datas, todayIncome, todayrefund } = this.state;
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
        <div className='auditofpayment-top'>
          <span className={type == 'pay' ? 'spanbtn color' : 'spanbtn'} onClick={this.qiyepay.bind(this)}>企业付款 </span>
          <span className={type == 'batchPay' ? 'spanbtn color' : 'spanbtn'} onClick={this.piliangpay.bind(this)}>批量付款 </span>
          <span className={type == 'refund' ? 'spanbtn color' : 'spanbtn'} onClick={this.dingdannopay.bind(this)}>订单退款 </span>
          <span className={type == 'batchRefund' ? 'spanbtn color' : 'spanbtn'} style={{ border: 'none' }} onClick={this.qiyenopay.bind(this)}>批量退款 </span>
          <div className='auditofpayment-top-border' />
        </div>
        {/*        <Tab shape='pure' className='paymentreview-tab'>
          <Tab.Item title="出款审核"> */}
        <div className=''>
          <div className='paymentreview-top'>
            <div className='paymentreview-tabs'>
              <div>今日总收入{todayIncome}</div>
              <div>今日退款{todayrefund}</div>
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
              <Table loading={isLoading} dataSource={datas} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                {/*                    <Table.Column
                      title=""
                      width={50}
                      dataIndex=""
                      cell={this.renderSelectall}
                    /> */}
                <Table.Column title="商户ID" dataIndex="cpId" />
                <Table.Column title="企业名称" dataIndex="cpName" />
                <Table.Column title="创建时间" dataIndex="createdAt" />
                <Table.Column title="完成时间" dataIndex="updatedAt" />
                <Table.Column title="商户订单号" dataIndex="out_trade_no" />
                <Table.Column title="平台流水号" dataIndex="orderNo" />
                <Table.Column title="支付金额" dataIndex="amount" />
                <Table.Column title="支付状态" dataIndex="orderStatusName" />
                <Table.Column title="批次号" dataIndex="" />
                <Table.Column title="付款渠道" dataIndex="channelName" />
                <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={this.handlePaginationChange}
              />
              <Button className='btn-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
            </div>
          </div>
        </div>
        {/*          </Tab.Item>
        </Tab> */}
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
