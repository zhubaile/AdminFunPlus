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
/*  static displayName = 'Setting'; */

  constructor(props) {
    super(props);
    this.state = {
      datas: this.props.location.state.record, // 父级传过来的数据
    };
  }
  componentDidMount() {
    // this.fetchData();
  }
  render() {
    const { datas } = this.state;
    debugger;
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
              <li>当前状态：{datas.invoiceStatusName}</li>
              <li>运单号：{datas.courierNumber}</li>
            </ul>
          </div>
          <div className='invoicedetails-footer'>
            <div>
              <ul>
                <li>发票ID： <span>{datas.invoiceNo}</span></li>
                {datas.cpName ? (<li>企业名称： <span>{datas.cpName}</span></li>) : null}
                {datas.taxNumber ? (<li>企业税号： <span>{datas.taxNumber}</span></li>) : null}
                <li>姓名： <span>{datas.name}</span></li>
                {datas.retreatTicketName ? (
                  <li>退票原因 <span>{datas.retreatTicketName}</span></li>
                ) : null}
                <li>邮寄地址： <span>{datas.mailAddress}</span></li>
              </ul>
            </div>
            <div>
              <ul>
                <li>开票金额 <span>￥{datas.fee}</span></li>
                <li>发票抬头 <span>{datas.invoiceTitle}</span></li>
                <li>发票类型 <span>{datas.invoiceStatusName}</span></li>
                <li>手机号： <span>{datas.phone}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

