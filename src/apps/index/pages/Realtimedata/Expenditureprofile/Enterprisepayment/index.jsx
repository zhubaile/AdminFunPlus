import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Select,Table,Pagination ,Message,Icon } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import moment from "moment/moment";
import IceContainer from '@icedesign/container';
import { totransferList } from '@indexApi';
import '../../../index.css';
import { Dialog } from "@alifd/next/lib/index";
import BusinessPaymentBatch from '../BusinessPaymentBatch';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Enterprisepayment extends Component {
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
      datas: [],
      results2: [],
    };
  }
  // 表单的值
  formChange = (value) => {
    debugger;
    this.setState({
      value,
    });
  };
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
  btnClick() {
    // console.log(this.input.value,this);
    // ;
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
  // 搜索按钮
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
  fetchData = (values,arrivalDate) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        totransferList({
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
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </a>
      </div>
    );
  };
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
  render() {
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const selectiontime = [
      { value: '创建时间', label: '创建时间' },
      { value: '完成时间', label: '完成时间' },
    ];
    const paymentchannel = [
      { value: '全部', label: '全部' },
      { value: '支付宝wap', label: '支付宝wap' },
      { value: '微信扫一扫', label: '微信扫一扫' },
      { value: '支付宝当面付', label: '支付宝当面付' },
      { value: '微信APP', label: '微信APP' },
      { value: '支付宝手机跳转', label: '支付宝手机跳转' },
    ];
    const paymentstatus = [
      { value: '全部', label: '全部' },
      { value: '待处理', label: '待处理' },
      { value: '成功', label: '成功' },
      { value: '失败', label: '失败' },
      { value: '拒绝', label: '拒绝' },
      { value: '规则拒绝', label: '规则拒绝' },
    ];
    const { isLoading, datas, current,pageSize,total,results2 } = this.state;
    const dateType = results2.dateType;
    const channel = results2.channel;
    const orderStatus = results2.orderStatus;
    return (
      <div className='expendordbat'>
        <Tab shape='pure' className='expendordbat-tab' defaultActiveKey='1'>
          <Tab.Item title="企业付款" key='1'>
            <div className="expendordbat-top">
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                {/* <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24"> */}
                <div style={styles.formItem}>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>选择时间：</span>
                    <FormBinder name="timeType"
                      required
                      message="请输入正确的名称"
                      autoWidth={false}
                    >
                      <Select style={styles.formSpecial} dataSource={dateType} defaultValue='createdAt' />
                    </FormBinder>
                    <FormBinder name='startdate'>
                      <RangePicker style={styles.formTime} showTime resetTime defaultValue={[startValue,endValue]} />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>付款渠道：</span>
                    <FormBinder name='payChannel'>
                      <Select style={styles.formSelect} dataSource={channel} />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>付款状态：</span>
                    <FormBinder name='orderStatus'>
                      <Select style={styles.formSelect} dataSource={orderStatus} />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>订单号：</span>
                    <FormBinder name='out_trade_no'>
                      <Input style={styles.formSelect} placeholder='输入订单号' hasClear />
                    </FormBinder>
                  </div>
                  <div style={{ margin: '10px 0'}}>
                    <Button className='btn-all' size="large" type="primary" onClick={this.search.bind(this)}>搜索</Button>
                    <Button className='btn-all' size="large" type="primary" onClick={this.handleReset.bind(this)}>重置</Button>
                    <Button className='btns-all right' size="large" type="secondary">导出表格</Button>
                  </div>
                  <span className='all_span'><Icon type="success-filling" size='xs' style={{ marginRight: '5px' }} />本次搜索付款总额：5555</span>
                </div>
                {/* </Col>
                  <Col l="24"> */}
                {/* <div style={styles.formItemTwo}>

                    </div> */}
                {/*  </Col>
                </Row> */}
              </FormBinderWrapper>
            </div>
            {/* <span className='all_span'>本次搜索付款总额：5555</span> */}

            {/* <div className='expendordbat-tabs-border' /> */}

            <IceContainer>
              <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                <Table.Column title="创建时间" dataIndex="createdAt" cell={this.createdAt} />
                <Table.Column title="完成时间" dataIndex="updatedAt" cell={this.updatedAt} />
                <Table.Column title="商户订单号" dataIndex="out_trade_no" />
                <Table.Column title="平台流水号" dataIndex="orderNo" />
                <Table.Column title="付款状态" dataIndex="orderStatus" />
                <Table.Column title="付款金额" dataIndex="amount" />
                <Table.Column title="批次号" dataIndex="" />
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
            <Button className='btns-all orderposab' size='large' type='secondary'>发起单笔付款</Button>
          </Tab.Item>

          <Tab.Item title="批量付款" key='2' onClick={this.btnTwo.bind(this)} >

          </Tab.Item>

          <Tab.Item title="订单退款" key='3' onClick={this.btnThree.bind(this)} >

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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formItemdiv: {
    margin: '10px 0',
  },
};
