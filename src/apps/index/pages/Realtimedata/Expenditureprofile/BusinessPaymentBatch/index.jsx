import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Select,Table,Pagination ,Message } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { batchTotransferList } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';
import IceContainer from '@icedesign/container';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class BusinessPaymentBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        timeType: 'createdAt',
        startdate: [],
        orderStatus: '',
        payChannel: '',
        batchNo: '',
      },
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [],
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
        batchTotransferList({
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
      }
    );
  };
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
  // 重置按钮
  handleReset() {
    this.setState({
      value: {
        timeType: 'createdAt',
        startdate: [],
        orderStatus: '',
        payChannel: '',
        batchNo: '',
      },
    });
  }
  btnClick() {
    // console.log(this.input.value,this);
    // ;
    this.props.editor(this.input.getInputNode().value);
  }

  // 时间转换
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
  // 数据结果详情
  result=(e)=>{
    return (
      <p>成功{e.success}，失败{e.fail}，处理中{e.pend}</p>
    );
  }
  renderOper=()=>{
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
    const endValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const { isLoading, datas, current,pageSize,total,results2 } = this.state;
    const dataType = results2.dateType;
    const channel = results2.channel;
/*    debugger;*/
    const paymentchannel = [
      { value: '全部', label: '全部' },
      { value: '支付宝wap', label: '支付宝wap' },
      { value: '微信扫一扫', label: '微信扫一扫' },
      { value: '支付宝当面付', label: '支付宝当面付' },
      { value: '微信APP', label: '微信APP' },
      { value: '支付宝手机跳转', label: '支付宝手机跳转' },
    ];
    const orderStatus = results2.orderStatus;

    return (
      <div className='expendordbat'>
        <Tab shape='pure' className='expendordbat-tab' defaultActiveKey='2'>
          <Tab.Item title="企业付款" key='1 ' onClick={this.btnOne.bind(this)} >

          </Tab.Item>

          <Tab.Item title="批量付款" key='2'>
            <div>
              <div>
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
                          required
                          message="请输入正确的名称"
                          autoWidth={false}
                        >
                          <Select style={styles.formSelect} dataSource={dataType} />
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
                         <span style={styles.formLabel}>付款状态</span>
                        <FormBinder name='orderStatus'>
                          <Select style={styles.formSelect} dataSource={orderStatus} />
                        </FormBinder>
                        <span style={styles.formLabel}>批次号</span>
                        <FormBinder name='batchNo'>
                          <Input className='input-bg' placeholder='输入订单号' hasClear />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary" onClick={this.search.bind(this)}>搜索</Button>
                        <Button className='btn-all bg' size="large" type="secondary" onClick={this.handleReset.bind(this)}>重置</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>
              </div>
              <div className='expendordbat-tabs-border' />
              <IceContainer>
                <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                  <Table.Column title="创建时间" dataIndex="createdAt" cell={this.createdAt} />
                  <Table.Column title="完成时间" dataIndex="updatedAt" cell={this.updatedAt} />
                  <Table.Column title="批次号" dataIndex="batchNo" />
                  <Table.Column title="付款总笔数" dataIndex="payNumber" />
                  <Table.Column title="付款总金额" dataIndex="payAmount" />
                  <Table.Column title="付款渠道" dataIndex="channelName" />
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
              <Button className='btn-all orderposab' size='large' type='secondary'>批量企业付款</Button>
            </div>
          </Tab.Item>

          <Tab.Item title="订单退款" key='3 ' onClick={this.btnThree.bind(this)} >

          </Tab.Item>

          <Tab.Item title="批量退款" key='4 ' onClick={this.btnFour.bind(this)} >
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
