import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Table,Select, Input,MenuButton,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { settingwhiteIpscompany,deviceparams,devicelist } from '@indexApi';
import Ippopup from './ippopup';
import EditingList from './EditingList';
import '../../index.css';

const { Item } = MenuButton;


/* const onChange = function (...args) {
  const { datas } = this.state;
    debugger;
    console.log(...args);
    let index = -1;
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
  },
  const rowSelection = {
    onChange,
    getProps: (record,index) => {
      /!* return {
        disabled: record.id === 100306660942,
      }; *!/
    },
  }; */
export default class interfaceaccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      datas: [], // 列表数据
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (cpName) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSizes = this.state.pageSize;
        settingwhiteIpscompany({
          cpName,
          page: pages,
          limit: pageSizes,
        }).then(({ status,data })=>{
          debugger;
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
  /*  addIp() {
    this.Ippopup.ippopupopen();
  }
  editingbtn() {
    this.EditingList.editingopen();
  } */
  // 跳转按钮
  Ipnamelistbtn=(id)=>{
    this.props.history.push({ pathname: "/backadmin/interfaceManagement/ipNamelist", state: { id } });
  }
  // 搜索框
  searchbtn() {
    const cpName = this.enterprisename.getInputNode().value;
    this.fetchData(cpName);
  }
  // 应用ID框
  applicationid=(value,index,record)=>{
    debugger;
    return (
      <a href="javascript:;" onClick={this.Ipnamelistbtn.bind(this,record.appId)}>{value}</a>
    );
  }
  render() {
    const { isLoading, datas, current,total,pageSize } = this.state;
    console.log(this.state.datas);
    return (
      <div className='interfaceaccess'>
        <Ippopup ref={node=>this.Ippopup = node} />
        <EditingList ref={node=>this.EditingList = node } />
        <div className='currency-top'>
          接口访问白名单
          <div className='currency-top-bottombor' />
        </div>
        <div className='membermanagement-top'>
          <span>企业名称：</span>
          <Input hasClear placeholder='企业名称' ref={node=>this.enterprisename = node} />
          <Button className='btn-all' style={{ marginLeft: '20px' }} size="large" type="primary" onClick={this.searchbtn.bind(this)}>搜索</Button>
        </div>
        <div className='interfaceaccess-main'>
          <div className='interfaceaccess-main-content'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false}>
              <Table.Column title="应用ID" dataIndex="appId" cell={this.applicationid} />
              <Table.Column title="企业名称" dataIndex="cpName" />
              <Table.Column title="是否默认应用" dataIndex="default" />
            </Table>
            <Pagination
              style={{ marginTop: '20px', textAlign: 'right' }}
              current={current}
              onChange={this.handlePaginationChange}
              pageSize={pageSize} // 界面展示多少条数据
              total={total}
            />
          </div>
        </div>
      </div>
    );
  }
}
