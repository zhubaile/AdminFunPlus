import React, { Component } from 'react';
import { Table,Button,Input,Grid ,DatePicker,Pagination,Dialog,Select } from '@alifd/next';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
// import Administrators from '../../Personal/components/Administrators/Administrators';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../../layouts/BasicLayout/components/Header/index.scss';
import { workOrderworkList,workOrderdeleteWork } from '@indexApi';
import '../../index.css';
import moment from "moment/moment";
// import { Dialog } from "@alifd/next/lib/index";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Allworkorders extends Component {
  static displayName = 'Setting';

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
    this.fetchData();
  }

  fetchData = (len) => {
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
          debugger;
          this.setState({
            datas: data.data,
            isLoading: false,
          });
        });
      }
    );
  };
  // 翻页
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

  // 详情
  handleDetail=(id)=> {
    this.props.history.push({ pathname: "/backadmin/service/workorderdetails", state: { id } });
  }
  // 重置
  resetbtn() {
    this.setState({
      value: {
        companyName: '',
        operationtime: [],
        _id: '',
        status: '',
      },
    });
  }
  // 搜索框
  searchbtn() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.refs.form.validateAll((errors, values) => {
          const arrivalDate = [];
          if (values.operationtime.length == 2) {
            const startdatestart = moment(values.operationtime[0]._d).valueOf();
            const startdateend = moment(values.operationtime[1]._d).valueOf();
            arrivalDate.push(startdatestart);
            arrivalDate.push(startdateend);
          }
          const pages = this.state.current;
          const pageSizes = this.state.pageSize;
          debugger;
          workOrderworkList({
            page: pages,
            pageSize: pageSizes,
            _id: values._id,
            companyName: values.companyName,
            beginTime: arrivalDate,
            status: values.status,
          }).then(({ status,data })=>{
            debugger;
            if (data.errCode == 0) {
              this.setState({
                datas: data.data,
                isLoading: false,
              });
            }
          });
        });
      }
    );
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
  // 时间转换
  time=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  statusoneortwo=(e)=>{
    if (e == 1) {
      return ("受理中");
    } else if (e == 2) {
      return ("待评价");
    } else if (e == 3) {
      return ("已完成");
    } else if (e == 4) {
      return ("已存档");
    }
    return null;
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
    workOrderdeleteWork({
      _id: args,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
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
    });
  }
  render() {
    // const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    // const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const { isLoading, datas, current, total, pageSize } = this.state;
    // 多选按钮
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    const status = [
      { value: '1',label: '处理中' },
      { value: '2',label: '待评价' },
      { value: '3',label: '已完成' },
      { value: '4',label: '已存档' },
    ];
    return (
      <div className='backstageworkorder'>
        {/* <Nav defaultActiveKey='2' history={this.props.history} /> */}
        <div className='wodegongdan'>
          <div className='wodegongdan-top'>
            <span>全部工单</span>
            <div className='wodegongdan-top-border' />
          </div>
          <div className='wodegongdan-conter'>
            <FormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <Row wrap gutter="20">
                <Col l="24">
                  <div className='wodegongdan-conter-main'>
                    <span>企业名称：</span>
                    <FormBinder name='companyName'>
                      <Input placeholder='请输入企业名称 ' hasClear />
                    </FormBinder>
                    <span>操作时间：</span>
                    <FormBinder name='operationtime'>
                      {/* <DatePicker /> */}
                      <RangePicker />
                      {/* <RangePicker showTime resetTime defaultValue={[startValue,endValue]} /> defaultValue={startValue}  */}
                    </FormBinder>
                    <span>工单编号：</span>
                    <FormBinder name='_id'>
                      <Input placeholder='输入编号' hasClear />
                    </FormBinder>
                    <span>工单状态：</span>
                    <FormBinder name='status'>
                      {/* dataSource={orderStatus} */}
                      <Select style={styles.formSelect} dataSource={status} />
                    </FormBinder>
                    <button className='searchbtn' onClick={this.searchbtn.bind(this)}>搜索</button>
                    <button className='searchbtn' onClick={this.resetbtn.bind(this)}>重置</button>
                  </div>
                </Col>
              </Row>
            </FormBinderWrapper>
          </div>
          <div className='wodegongdan-footer'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
              <Table.Column title="工单编号" dataIndex="_id" />
              <Table.Column title="描述" dataIndex="description" />
              <Table.Column title="优先级" dataIndex="level" />
              <Table.Column title="企业名称" dataIndex="companyName" />
              <Table.Column title="提交账号" dataIndex="account" />
              <Table.Column title="状态" dataIndex="status" cell={this.statusoneortwo} />
              <Table.Column title="创建时间" dataIndex="createdAt" cell={this.time} />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
            <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button>
            <Pagination
              style={styles.pagination}
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
const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formSelect: {
    width: '200px',
  },
};
