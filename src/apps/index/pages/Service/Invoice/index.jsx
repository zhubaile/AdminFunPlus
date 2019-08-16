import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Table,Select, Input,MenuButton,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { invoiceList,InvoiceOperation } from '@indexApi';
import '../index.css';
import moment from "moment/moment";
import Shipping from "./Shipping";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Item } = MenuButton;

export default class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      datas: [], // 发票列表数据
      startdate: [], // 时间框
      args: [], // 所有选中的id
      listValue: '状态/全部',
      toplist: false,
      grouplistdata: [
        { dGroupName: '' },
      ],
      value: {
        fapiao: '',
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (invoiceTitle,arrivalDate) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const page = this.state.current;
        const pageSize = this.state.pageSize;
        invoiceList({
          page,
          pageSize,
          invoiceTitle,
          arrivalDate,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
              total: data.data.totalCount ,
              datas: data.data.result,
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
  // 获取到选中的数据
  /* Choice(args) {
    debugger;
    this.setState({
      args,
    });
  } */
  // 删除方法
  /*  removes() {
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
  } */
  // 改变选择的时间
  rangetime(value) {
    const createdAt = [];
    if (value.length == 2) {
      if (value[0] && value[1]) {
        const startdatestart = moment(value[0]._d).valueOf();
        const startdateend = moment(value[1]._d).valueOf();
        createdAt.push(startdatestart,startdateend);
      } else if (value[0]) {
        const startdatestart = moment(value[0]._d).valueOf();
        const startdateend = '';
        createdAt.push(startdatestart,startdateend);
      } else if (value[1]) {
        const startdatestart = '';
        const startdateend = moment(value[1]._d).valueOf();
        createdAt.push(startdatestart,startdateend);
      } else {
        return null;
      }
    }
    // const timess = moment().format('YYYY-MM-DD 23:59:59');
    debugger;
    this.setState({
      startdate: createdAt,
    });
  }
  // 搜索
  searchbtn() {
    const invoiceTitle = this.input.getInputNode().value;
    const arrivalDate = this.state.startdate;
    debugger;
    this.fetchData(invoiceTitle,arrivalDate);
  }
  // 寄件
  invoiceBtn(id) {
    this.Shipping.shippingopen(id);
  }
  // 详情
  detailBtn(record) {
    this.props.history.push({ pathname: '/backadmin/service/invoicedetails', state: { record } });
  }
  // 时间转换
  datatime=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  torefundbtn(_id,i) {
    debugger;
    InvoiceOperation({
      _id,
      operation: i,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  // 操作
  renderOper = (value, index, record) => {
    return (
      <div style={{ color: '#1A55E2', cursor: 'pointer' }}>
        <a onClick={this.detailBtn.bind(this,record)} style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px', borderRight: '2px solid #999999' }}>详情</a>
        {value.includes(1) ? (
          <a
            style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px' }}
            onClick={this.invoiceBtn.bind(this,record._id)}
          >
            寄件
          </a>
        ) : null}
        {value.includes(4) ? (
          <a
            style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px' }}
            onClick={this.torefundbtn.bind(this,record._id,4)}
          >
            退票完成
          </a>
        ) : null}
        {value.includes(5) ? (
          <a
            style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px' }}
            onClick={this.torefundbtn.bind(this,record._id,5)}
          >
            退票驳回
          </a>
        ) : null}
      </div>
    );
  };
  render() {
    const { isLoading, datas, current,total,pageSize,value } = this.state;
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2019-07-24', 'YYYY-MM-DD', true);
    const grouplistdata = this.state.grouplistdata;
    console.log(this.state.datas);
    // 多选按钮
    /* const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
      },
    }; */
    return (
      <div className='invoice'>
        <Shipping ref={ node=>this.Shipping = node } fetchData={this.fetchData.bind(this)} />
        <Tab shape='pure'>
          <Tab.Item title="发票管理">
            <div className='invoice-main'>
              <div className='invoice-main-top'>
                <div className='left'>
                  <span>开票时间：</span>
                  <RangePicker name='startdate' showTime resetTime defaultValue={[startValue,endValue]} onChange={this.rangetime.bind(this)} />
                  <span style={{ marginLeft: '20px' }}>发票抬头：</span>
                  <Input placeholder='请输入发票抬头' ref={node=>this.input = node} />
                  {/* <Select style={{ width: '200px' }} name="fapiao" dataSource={list} /> */}
                </div>
                <div className='right'>
                  <Button className='btn-all' size='large' type='primary' onClick={this.searchbtn.bind(this)}>查询</Button>
                </div>
              </div>

              <div className='invoice-main-content'>
                <Table
                  loading={isLoading}
                  dataSource={datas}
                  hasBorder={false}
                  // primaryKey='_id'
                  // rowSelection={rowSelection}
                >
                  <Table.Column title="发票ID" dataIndex="invoiceNo" />
                  <Table.Column title="企业名称" dataIndex="cpId.cpName" />
                  <Table.Column title="企业税号" dataIndex="cpId.cpBusinessNumber" />
                  <Table.Column title="发票抬头" dataIndex="invoiceTitle" />
                  <Table.Column title="发票类型 " dataIndex="invoiceTypeName" />
                  {/*              <Table.Column title="订单号" dataIndex="classify" /> */}
                  <Table.Column title="开票金额" dataIndex="fee" />
                  <Table.Column title="开票时间" dataIndex="createdAt" cell={this.datatime} />
                  <Table.Column
                    title="状态"
                    dataIndex="invoiceStatusName"
                  />
                  <Table.Column
                    title="操作"
                    width={180}
                    dataIndex="operation"
                    cell={this.renderOper}
                  />
                </Table>
                {/* <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button> */}
                <Pagination
                  style={{ marginTop: '20px', textAlign: 'right' }}
                  current={current}
                  onChange={this.handlePaginationChange}
                  pageSize={pageSize} // 界面展示多少条数据
                  total={total}
                />
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
