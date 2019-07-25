import React, { Component } from 'react';
import { Table,Button,Input,Grid ,DatePicker,Pagination,Message,Select } from '@alifd/next';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
// import Administrators from '../../Personal/components/Administrators/Administrators';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../index.css';
import moment from "moment/moment";
// import { Dialog } from "@alifd/next/lib/index";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Invoicedetails extends Component {
/*  static displayName = 'Setting';*/

  constructor(props) {
    super(props);
    this.state = {
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [],
      value: {
        companyName: '',
        operationtime: [],
        _id: '',
        status: '',
      },
    };
  }
  componentDidMount() {
    // this.fetchData();
  }

/*  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        const operationtime = this.state.value.operationtime;
        debugger;
        workOrderworkList({
          page: pages,
          pageSize,
          beginTime: operationtime,
        }).then(({ status,data })=>{
          if (data.errCode == 0) {
            this.setState({
              datas: data.data,
              isLoading: false,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };*/


  // 详情
  handleDetail=(id)=> {
    this.props.history.push({ pathname: "/backadmin/service/workorderdetails", state: { id } });
  }

  renderOper = (value,index,record) => {
    return (
      <div>
        <a href="javascript:;" style={{ marginRight: '3px' }} onClick={this.handleDetail.bind(this,record._id)}>详情</a>
        {/* <span>|</span>
        <a href="javascript:;" style={{ marginLeft: '3px' }} onClick={this.handleDelete.bind(this,record._id)} >删除</a> */}
      </div>
    );
  };

  render() {

    return (
      <div className='invoicedetails'>
        {/* <Nav defaultActiveKey='2' history={this.props.history} /> */}
        <div className='invoicedetails'>
          <div className='invoicedetails-top'>
            <span>发票详情</span>
            <div className='invoicedetails-top-border' />
          </div>
          <div className='invoicedetails-conter'>
            <ul>
              <li>当前状态：XX</li>
              <li>订单号：123</li>
              <li>运单号：</li>
            </ul>
          </div>
          <div className='invoicedetails-footer'>
            <div>
              <ul>
                <li>发票ID <span>CZ1558581363296</span></li>
                <li>企业名称 <span>有此山</span></li>
                <li>企业税号 <span>123</span></li>
                <li>邮寄地址 <span>上海市闵行区XXXX， 姓名，手机号</span></li>
              </ul>
            </div>
            <div>
              <ul>
                <li>开票金额 <span>￥100.00</span></li>
                <li>发票抬头 <span>上海</span></li>
                <li>发票类型 <span>123</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

