import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Table,Select, Menu,MenuButton,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
// import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
import '../../index.css';

const { Item } = MenuButton;
/* const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'],
      level: ['普通会员'],
      rule: ['余杭盒马店'],
    };
  });
}; */

export default class foreignAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      datas: [],
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
    //  this.Toupdatelist();
    // this.fetchData();
  }
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
  fetchData = (len) => {
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
      <div>
        <Switch className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  zbl=(value)=>{
    this.setState({
      listValue: value,
    });
    // ajax 方法
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
      <div className='foreignAPI'>
        <div className='currency-top'>
          设备列表
          <div className='currency-top-bottombor' />
        </div>
        <div className='foreignAPI-main'>

          <div className='devicemanagement-main-content'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false}>
              <Table.Column title="设备ID" dataIndex="_id" />
              <Table.Column title="今日流水/笔" dataIndex="todayFlow" />
              <Table.Column title="昨日流水/笔" dataIndex="yeTodayFlow" />
              <Table.Column title="累计流水/笔" dataIndex="totalFlow" />
              <Table.Column title="类型" dataIndex="classify" />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
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
