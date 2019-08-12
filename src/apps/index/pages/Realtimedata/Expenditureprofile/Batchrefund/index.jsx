import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Select,Table,Pagination ,Message } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { actions, reducers, connect } from '@indexStore';
import { batchRefundList } from '@indexApi';
import IceContainer from '@icedesign/container';
import moment from "moment/moment";
import '../../../index.css';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Batchrefund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        dateType: 'createdAt',
        startdate: [],
      },
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [], // 列表数据
      results2: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (values,arrivalDate) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        batchRefundList({
          pages,
          pageSize,
          ...values,
          arrivalDate,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data.result,
              results2: data.data.result2,
              isLoading: false,
              total: data.data.totalCount,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
  }
  // 重置
  handleReset() {
    this.setState({
      value: {
        dateType: 'createdAt',
        startdate: [],
      },
    });
  }
  renderOper = () => {
    return (
      <div>
        <a
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </a>
      </div>
    );
  };

  // 搜索
  search(e) {
    const { validateFields } = this.refs.form;
    validateFields((errors,values)=>{
      const arrivalDate = [];
      if (values.startdate.length == 2) {
        if (values.startdate[0] && values.startdate[1]) {
          const startdatestart = moment(values.startdate[0]._d).valueOf();
          const startdateend = moment(values.startdate[1]._d).valueOf();
          arrivalDate.push(startdatestart,startdateend);
        } else if (values.startdate[0]) {
          const startdatestart = moment(values.startdate[0]._d).valueOf();
          const startdateend = '';
          arrivalDate.push(startdatestart,startdateend);
        } else if (values.startdate[1]) {
          const startdatestart = '';
          const startdateend = moment(values.startdate[1]._d).valueOf();
          arrivalDate.push(startdatestart,startdateend);
        } else {
          return null;
        }
      }
      this.fetchData(values,arrivalDate);
    });
  }
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
  result=(e)=>{
    return (
      <p>成功{e.success}，失败{e.fail}，处理中{e.pend}</p>
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
    const { isLoading, datas, current,results2,pageSize ,total } = this.state;
    const dateType = results2.dateType;
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    return (
      <div className='expendordbat'>
        <Tab shape='pure' className='expendordbat-tab' defaultActiveKey='4'>
          <Tab.Item title="企业付款" key='1' onClick={this.btnOne.bind(this)}>
          </Tab.Item>
          <Tab.Item title="批量付款" key='2' onClick={this.btnTwo.bind(this)}>
          </Tab.Item>
          <Tab.Item title="订单退款" key='3' onClick={this.btnThree.bind(this)}>
          </Tab.Item>

          <Tab.Item title="批量退款" key='4'>
            <div className='expendbatchre'>
              <Message type='notice' className='message-all expendbatchre-message'>
                应用直连：使用您直接申请的渠道支付参数或我们代为您申请的渠道参数进行交易，所有资金有微信，支付宝，银联，持牌方清算
              </Message>
              <div className='expendbatchre-top' style={{ marginBottom: '20px' }}>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <span style={styles.formLabel}>选择时间：</span>
                  <FormBinder name="dateType"
                    required
                    message="请输入正确的名称"
                    autoWidth={false}
                  >
                    <Select style={styles.formSpecial} dataSource={dateType} />
                  </FormBinder>
                  <FormBinder name='startdate'>
                    <RangePicker style={styles.formTime} showTime resetTime defaultValue={[startValue,endValue]} />
                  </FormBinder>
                </FormBinderWrapper>
                <Button className='btn-all' size="large" type="secondary" onClick={this.search.bind(this)}>搜索</Button>
                <Button className='btn-all' size="large" type="secondary" onClick={this.handleReset.bind(this)}>重置</Button>
                <Button className='btns-all orderposab' size='large' type='secondary' >批量退款</Button>
              </div>
              {/* <div className='expendordbat-tabs-border' /> */}
              <hr />

              <IceContainer>
                <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                  <Table.Column title="创建时间" dataIndex="createdAt" cell={this.createdAt} />
                  <Table.Column title="完成时间" dataIndex="updatedAt" cell={this.updatedAt} />
                  <Table.Column title="批量退款编号" dataIndex="batchNo" />
                  <Table.Column title="退款总笔数" dataIndex="refundNumber" />
                  <Table.Column title="退款总金额" dataIndex="refundAmount" />
                  <Table.Column title="结果" dataIndex="result" cell={this.result} />
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
            </div>
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
    margin: '10px 0',
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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
