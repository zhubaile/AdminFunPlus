import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Table,Select, Input,MenuButton,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { invoiceList } from '@indexApi';
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
  // btnClick() {
  //   this.props.editor(this.input.getInputNode().value);
  // }

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
  renderRule = () => {
    return (
      <div>
        <select className='table-select'>
          <option value="volvo">默认规则</option>
          <option value="saab">自定义规则</option>
          <option value="opel">自定义规则</option>
          <option value="audi">新增规则</option>
        </select>
      </div>
    );
  };
  renderOper = () => {
    return (
      <div style={{ color: '#1A55E2', cursor: 'pointer' }}>
        <span onClick={this.detailBtn.bind(this)}>详情</span>
        <span onClick={this.invoiceBtn.bind(this)}>寄件</span>
      </div>
    );
  };
  renderStatus = () => {
    return (
      <div>
        <span>待处理</span>
      </div>
    );
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
    this.fetchData(invoiceTitle,arrivalDate);
  }
  // 寄件
  invoiceBtn() {
    this.Shipping.shippingopen();
  }
  // 详情
  detailBtn() {
    this.props.history.push("/backadmin/service/invoicedetails");
  }
  render() {
    const { isLoading, datas, current,total,pageSize,value } = this.state;
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const grouplistdata = this.state.grouplistdata;
    console.log(this.state.datas);
    // 多选按钮
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    const list = [
      { value: '上海', label: '上海' },
      { value: '杭州', label: '杭州' },
      { value: '北京', label: '北京' },
    ];
    return (
      <div className='invoice'>
        <Shipping ref={ node=>this.Shipping = node } />
        <div className='currency-top'>
          发票管理
          <div className='currency-top-bottombor' />
        </div>
        <div className='invoice-main'>
          <div className='invoice-main-top'>
            <div className='left'>
              <span>开票时间：</span>
              <RangePicker name='startdate' showTime resetTime defaultValue={[startValue,endValue]} onChange={this.rangetime.bind(this)} />
              <span style={{ marginLeft: '20px' }}>发票抬头：</span>
              {/* <Input placeholder='请输入发票抬头' ref={node=>this.input = node} /> */}
              <Select style={{ width: '200px' }} name="fapiao" dataSource={list} />
            </div>
            <div className='right'>
              <button onClick={this.searchbtn.bind(this)}>查询</button>
            </div>
          </div>

          <div className='invoice-main-content'>
            <Table
              loading={isLoading}
              dataSource={datas}
              hasBorder={false}
              primaryKey='_id'
              rowSelection={rowSelection}
            >
              <Table.Column title="发票ID" dataIndex="_id" />
              <Table.Column title="企业名称" dataIndex="todayFlow" />
              <Table.Column title="企业税号" dataIndex="yeTodayFlow" />
              <Table.Column title="发票抬头" dataIndex="classify" />
              <Table.Column title="发票类型 " dataIndex="totalFlow" />
{/*              <Table.Column title="订单号" dataIndex="classify" />*/}
              <Table.Column title="开票金额" dataIndex="1" />
              <Table.Column title="开票时间" dataIndex="3  " />
              <Table.Column
                title="状态"
                dataIndex="4"
                cell={this.renderStatus}
              />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
            <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button>

            <Pagination
              style={{ marginTop: '20px', textAlign: 'right' }}
              current={current}
              onChange={this.handlePaginationChange}
              pageSize={pageSize} // 界面展示多少条数据
              total={total} // 一共多少条数据
            />
          </div>
        </div>
      </div>
    );
  }
}
