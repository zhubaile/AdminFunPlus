import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Select,Table,Pagination ,Message } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { orderRefundList } from '@indexApi';
import moment from "moment/moment";
import IceContainer from '@icedesign/container';
import '../../../index.css';
import { Dialog } from "@alifd/next/lib/index";
import Batchrefund from '../Batchrefund';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      level: ['普通会员', '白银会员', '黄金会员', 'VIP 会员'][random(0, 3)],
      balance: random(10000, 100000),
      accumulative: random(50000, 100000),
      regdate: `2018-12-1${random(1, 9)}`,
      birthday: `1992-10-1${random(1, 9)}`,
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'][random(0, 2)],
      z: ['支付宝'],
    };
  });
};

export default class Orderrefund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        timeType: 'createdAt',
        startdate: [],
        orderStatus: '',
        payChannel: '',
        out_trade_no: '',
      },
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [], // 列表数据
      results2: [],
    };
  }
  /*  // 表单的值
  formChange = (value) => {
    debugger;
    this.setState({
      value,
    });
  }; */
  // 重置按钮
  handleReset() {
    this.setState({
      value: {
        timeType: 'createdAt',
        startdate: [],
        orderStatus: '',
        payChannel: '',
        out_trade_no: '',
      },
    });
  }
  // 搜索按钮
  search(e) {
    const { validateFields } = this.refs.form;
    validateFields((errors,values)=>{
      const arrivalDate = [];
      if (values.startdate.length == 2) {
        const startdatestart = moment(values.startdate[0]._d).valueOf();
        const startdateend = moment(values.startdate[1]._d).valueOf();
        arrivalDate.push(startdatestart);
        arrivalDate.push(startdateend);
      }
      this.fetchData(values,arrivalDate);
    });
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
  }
  // 更新的数据
  componentDidMount() {
    this.fetchData();
  }

  /*  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据
      }, 600);
    });
  }; */

  fetchData = (values,arrivalDate) => {
/*    debugger;*/
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        orderRefundList({
          pages,
          pageSize,
          ...values,
          arrivalDate,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            const channel = data.data.result2.channel; // 复制出来需要改变属性名的属性
            const channels = channel.map(item=>({ value: item._id,label: item.payScene })); // 改变成想要的属性名
            const Filterforms = Object.assign({},data.data.result2,{ channel: channels }); // 把数据里面的内容改变成更改过的
            this.setState({
              datas: data.data.result,
              results2: Filterforms,
              isLoading: false,
              total: data.data.totalCount,
            });
          } else {
            Message.success(data.message);
          }
        });
        /* this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        }); */
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

  handleFilterChange = () => { // gengxin 5条新数据
    this.fetchData(5);
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = () => {
    return (
      <div>
        <a
          type="primary"
          onClick={this.handleDetail}
        >
          <span style={{ color: '#2A91FA', cursor: 'pointer' }}>详情</span>
        </a>
      </div>
    );
  };
  createdAt=(e)=>{
    const createdAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{createdAt}</p>
    );
  }
  updatedAt=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  btnOne() {
    this.props.history.push('/backadmin/Realtimedata/enterprisepayment');
  }
  btnTwo() {
    this.props.history.push('/backadmin/Realtimedata/businessPaymentBatch');
  }
  btnThree() {
    this.props.history.push('/backadmin/Realtimedata/orderrefund');
  }
  btnFour() {
    this.props.history.push('/backadmin/Realtimedata/batchrefund');
  }
  render() {
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const { isLoading, datas, current,results2,pageSize,total } = this.state;

    const dateType = results2.dateType;
    const channel = results2.channel;
    const orderStatus = results2.orderStatus;
    return (
      <div className='expendordbat'>
        <Tab shape='pure' className='expendordbat-tab'defaultActiveKey='3'>

          <Tab.Item title="企业付款" key='1' onClick={this.btnOne.bind(this)} >

          </Tab.Item>

          <Tab.Item title="批量付款" key='2' onClick={this.btnTwo.bind(this)} >

          </Tab.Item>


          <Tab.Item title="订单退款" key='3' >
            <div>
              <FormBinderWrapper
                value={this.state.value}
                // onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>选择时间</span>
                      <FormBinder name="timeType"
                        required
                        message="请输入正确的名称"
                        autoWidth={false}
                      >
                        <Select style={styles.formSelect} dataSource={dateType} defaultValue='createdAt' />
                      </FormBinder>
                      <FormBinder name='startdate'>
                        <RangePicker showTime resetTime defaultValue={[startValue,endValue]} />
                      </FormBinder>
                      <span style={styles.formLabel}>付款渠道</span>
                      <FormBinder name='payChannel'>
                        <Select style={styles.formSelect} dataSource={channel} />
                      </FormBinder>
                    </div>
                  </Col>
                  <Col l="24">
                    <div style={styles.formItemTwo}>
                      <span style={styles.formLabel}>退款状态</span>
                      <FormBinder name='orderStatus'>
                        <Select style={styles.formSelect} dataSource={orderStatus} />
                      </FormBinder>
                      <span style={styles.formLabel}>订单号</span>
                      <FormBinder name='out_trade_no'>
                        <Input className='input-bg' placeholder='输入订单号' hasClear />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.search.bind(this)}>搜索</Button>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.handleReset.bind(this)}>重置</Button>
                      <Button className='btn-all bg right' size="large" type="secondary">导出表格</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <span className='all_span'>本次搜索付款总额：5555</span>
            {/*<div className='expendordbat-tabs-border' />*/}
            <hr />
            <IceContainer>
              <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                <Table.Column title="创建时间" dataIndex="createdAt" cell={this.createdAt} />
                <Table.Column title="完成时间" dataIndex="updatedAt" cell={this.updatedAt} />
                <Table.Column title="商户订单号" dataIndex="out_trade_no" />
                <Table.Column title="平台流水号" dataIndex="orderNo" />
                <Table.Column title="退款状态" dataIndex="orderStatusName" />
                <Table.Column title="退款金额" dataIndex="amount" />
                <Table.Column title="实付金额" dataIndex="amount_real" />
                <Table.Column title="付款渠道" dataIndex="channelName" />
                <Table.Column
                  title="操作"
                  width={200}
                  dataIndex="oper"
                  cell={this.renderOper}
                />
              </Table>
              <Pagination
                style={styles.pagination}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize} // 界面展示多少条数据
                total={total} // 一共多少条数据
              />
            </IceContainer>
            <Button className='btn-all orderposab' size='large' type='secondary'>主动退款</Button>
          </Tab.Item>

          <Tab.Item title="批量退款" key='4' onClick={this.btnFour.bind(this)} >

          </Tab.Item>
        </Tab>
      </div>
    );
  }
}
const styles = {
  containerTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
