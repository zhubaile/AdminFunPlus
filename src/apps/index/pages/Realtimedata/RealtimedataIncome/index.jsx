import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { incomeList,exportExcel } from '@indexApi';
import moment from "moment/moment";
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

/* const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      _id: random(10000, 20000,30000,50025,68522),
    };
  });
}; */
const { Item } = MenuButton;
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
@withRouter
export default class RealtimedataIncome extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    debugger;
    this.state = {
      one: this.props.location.state,
      current: 1,
      pageSize: 10,
      total: 0,
      result: [],
      result1: [],
      result2: [],
      isLoading: false,
      data: [],
      args: [],
      value: {
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        channel: [],
        device: '',
        out_trade_no: '',
      },
    };
  }

  // 重置按钮
  handleReset() {
    this.setState({
      value: {
        timeType: 'createdAt',
        startdate: [],
        orderStatus: '',
        payChannel: '',
        channel: '',
        device: '',
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
      debugger;
      this.fetchData(values,arrivalDate);
    });
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize; // 一页多少数据
        const page = this.state.current; // 页码
        incomeList({
          page,
          pageSize,
          ...len,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            const rrr = data.data.result2;
            const result2 = rrr.channel;
            const channel = result2.map(item=>({ value: item._id, label: item.payScene, son: item.children }));
            const resultt = Object.assign({},rrr,{ channel });
            debugger;
            this.setState({
              isLoading: false,
              total: data.data.totalCount,
              result: data.data.result, // 数据列表
              result1: data.data.result1,
              result2: resultt,
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


  formChange = (value) => {
    this.setState({
      value,
    });
  };

  // 获取到选中的数据
  Choice(args) {
    debugger;
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { result,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      result.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        result.splice(index, 1);
        this.setState({
          result,
        });
      }
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
  // 输入支付渠道获取设备(级联子元素)
  Accesschannels(e,v,i) {
    const values = this.state.value;
    const value = Object.assign({},values,{ device: '' });
    this.setState({
      value,
    },()=>{
      const device = i.son;
      const devices = device.map(item=>({ value: item._id, label: item.dName }));
      const valueson = Object.assign({},values,{ device: devices });
      this.setState({
        value: valueson,
      });
    });
  }
  // 下载Excel
  exportexcelbtn() {
    exportExcel().then((res)=>{
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      const downloadElement = this.btna;
      const href = window.URL.createObjectURL(blob); // 创建下载的链接
      const datatime = moment().format("YYYY-MM-DD HH:mm:ss"); // 当前时间
      downloadElement.href = href;
      // downloadElement.download = 'xxx.xlsx'; // 下载后文件名
      downloadElement.download = (`${datatime}.xlsx`); // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
      debugger;
    });
  }
  render() {
    const { isLoading, data, current,pageSize,total,result,result1,result2 } = this.state;
    const timeType = result2.dateType; // 选择时间下拉框
    const orderStatus = result2.orderStatus; // 支付状态
    const channel = result2.channel; // 支付渠道
    const device = this.state.value.device;
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };

    return (
      <div className='realtimedataincome'>
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="收入">
            <div style={styles.divMargin}>
              <div className='income-tabs'>
                <div>总收入金额：{result1.totalAmount}</div>
                <div>支付成功率：{result1.successRate}</div>
              </div>
              <div className='income-tabs rightbtn'>
                <Button className='btns-all bg' size="large" type="secondary" disabled style={{ opacity: 0.5 }}>表格列过滤</Button>
                <Button className='btns-all bg' size="large" type="secondary" onClick={this.exportexcelbtn.bind(this)}>导出结果为表格</Button>
                <a href='javascript:;' ref={(node)=>{ this.btna = node; }} style={{ display: 'none' }} />
              </div>
            </div>
            <div className='income-tabs-border' />
            <div className=''>
              <div className='realtimedataincome-top'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <Row wrap gutter="20" style={styles.formRow}>
                    <Col l="24">
                      <div style={styles.formItem}>
                        <span style={styles.formLabel}>选择时间：</span>
                        <FormBinder name="timeType"
                          autoWidth={false}
                        >
                          <Select style={styles.formSpecial} dataSource={timeType} />
                        </FormBinder>
                        <FormBinder name='startdate'>
                          <RangePicker style={styles.formTime} className='showHour' showTime resetTime />
                        </FormBinder>
                        <span style={styles.formLabel}>支付状态：</span>
                        <FormBinder name='orderStatus'>
                          <Select style={styles.formSelect} dataSource={orderStatus} />
                        </FormBinder>
                        <span style={styles.formLabel}>退款状态：</span>
                        <FormBinder name='refundStatus'>
                          <Select style={styles.formSelect} dataSource='' />
                        </FormBinder>
                      </div>
                    </Col>
                    <Col l="24">
                      <div style={styles.formItemTwo}>
                        <span style={styles.formLabel}>支付渠道：</span>
                        <FormBinder name='channel'>
                          <Select style={styles.formSpecial} dataSource={channel} onChange={this.Accesschannels.bind(this)} />
                        </FormBinder>
                        <FormBinder name="device" >
                          <Select style={styles.formSelect} dataSource={device} />
                        </FormBinder>
                        <span style={styles.formLabel}>订单号：</span>
                        <FormBinder name='out_trade_no'>
                          <Input style={styles.formSelect} placeholder='输入订单号' />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary" onClick={this.search.bind(this)}>搜索</Button>
                        <Button className='btn-all bg' size="large" type="secondary" onClick={this.handleReset.bind(this)}>重置</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>

              </div>
            </div>
            <div className='realtimedataincome-panel' >
              <div className=''>
                <div className='tab-panel'>
                  <Table loading={isLoading} dataSource={result} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                    {/*                    <Table.Column
                      title=""
                      width={50}
                      dataIndex=""
                      cell={this.renderSelectall}
                    /> */}
                    <Table.Column title="商户ID" dataIndex="cpId._id" />
                    <Table.Column title="企业名称" dataIndex="cpId.cpName" />
                    <Table.Column title="创建时间" dataIndex="createdAt" onClick={this.createdAt} />
                    <Table.Column title="完成时间" dataIndex="updatedAt" onClick={this.updatedAt} />
                    <Table.Column title="商户订单号" dataIndex="out_trade_no" />
                    <Table.Column title="平台流水号" dataIndex="orderNo" />
                    <Table.Column title="商品名称" dataIndex="orderDes" />
                    <Table.Column title="备注" dataIndex="" />
                    <Table.Column title="创建金额" dataIndex="amount" />
                    <Table.Column title="实付金额" dataIndex="amount_real" />
                    <Table.Column title="支付状态" dataIndex="orderStatusName" />
                    <Table.Column title="退款金额" dataIndex="" />
                    <Table.Column title="退款状态" dataIndex="" />
                    <Table.Column title="分润金额" dataIndex="" />
                    <Table.Column title="分润状态" dataIndex="" />
                    <Table.Column title="渠道" dataIndex="channelName" />
                    <Table.Column title="设备ID" dataIndex="deviceId" />
                    <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
                  </Table>
                  <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={current}
                    onChange={this.handlePaginationChange}
                    pageSize={pageSize} // 界面展示多少条数据
                    total={total} // 一共多少条数据
                  />
                  <Button className='btns-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
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
};
