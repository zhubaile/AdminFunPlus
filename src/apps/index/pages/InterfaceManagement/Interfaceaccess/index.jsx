import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Table,Select, Input,MenuButton,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
// import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
import Ippopup from './ippopup';
import EditingList from './EditingList';
import '../../index.css';

const { Item } = MenuButton;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      level: ['普通会员', '白银会员', '黄金会员', 'VIP 会员'][random(0, 3)],
      _id: random(10000, 20000,30000,50025,68522),
      accumulative: random(50000, 100000),
      regdate: `2018-12-1${random(1, 9)}`,
      birthday: `1992-10-1${random(1, 9)}`,
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'][random(0, 2)],
      z: ['支付宝'],
    };
  });
};

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
      datas: [],
      args: [], // 所有选中的id
      listValue: '状态/全部',
      toplist: false,
      grouplistdata: [
        { dGroupName: '' },
      ],
      // datas: [],
    };
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
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
        // const pages = this.state.current;
        // const pageSizes = this.state.pageSize;
        this.mockApi(len).then((data) => { // data 里面为数据
          debugger;
          this.setState({
            datas: data,
            isLoading: false,
          });
        });
      }
    );
  };
  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };
  // 获取分组列表
  Toupdatelist=()=>{
    deviceGrouplist().then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.setState({
            grouplistdata: data.data,
          });
        }
        // Message.success(data.message);
      }
    );
  };
  // 设备组列表
  /*  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const page = this.state.current;
        const limit = this.state.pageSize;
        devicelist({
          page,
          limit,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data.list,
              total: data.data.total,
              isLoading: false,
            });
          }
        });
      }
    );
  }; */

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
  Ipnamelistbtn() {
    this.props.history.push('/backadmin/interfaceManagement/ipNamelist');
  }
  // 搜索框
  searchbtn() {
    // const pages = this.state.current;
    // const pageSizes = this.state.pageSize;
    const name = this.inputname.getInputNode().value;
    this.fetchData(name);
    /* sysUserList({
      name,
      page: pages,
      pageSize: pageSizes,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data.result,
        });
      }
    }); */
  }
  // 应用ID框
  applicationid=(value)=>{
    return (
      <a href="javascript:;" onClick={this.Ipnamelistbtn.bind(this)}>{value}</a>
    );
  }
  render() {
    const { isLoading, datas, current,total,pageSize } = this.state;
    const Allstart = [
      { value: '状态/全部', label: '状态/全部' },
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
    ];
    const grouplistdata = this.state.grouplistdata;
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
          <Input hasClear placeholder='企业名称' res={node=>this.inputname = node} />
          <Button className='btn-all' style={{ marginLeft: '20px' }} size="large" type="primary" onClick={this.searchbtn.bind(this)}>搜索</Button>
        </div>
        <div className='interfaceaccess-main'>
          <div className='interfaceaccess-main-content'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false}>
              <Table.Column title="应用ID" dataIndex="_id" cell={this.applicationid} />
              <Table.Column title="企业名称" dataIndex="todayFlow" />
              <Table.Column title="是否默认应用" dataIndex="yeTodayFlow" />
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
