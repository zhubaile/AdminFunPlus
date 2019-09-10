import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Radio,Select, Input,Table,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { categorylist,categorydelete } from '@indexApi';
import AddCategory from './addCategory';
import '../../index.css';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class ExpandedApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource,
    };
  }
  load() {
    let { dataSource } = this.state;
    dataSource = dataSource.concat(dataSource);
    this.setState({ dataSource });
  }
  // 修改一级目录
  /*  edonecategory(record) {
    const one = 'one';
    this.AddCategory.addmessageopen(record,one);
  } */
  addtwocategory(record) {
    this.props.addtwocategory(record,'two');
    this.props.fetchData();
  }
  removebtn(id) {
    this.props.removebtn(id);
  }
  // 操作
  caozuo = (value, index, record) => {
    return (
      <div className='tb_span'>
        <span onClick={this.addtwocategory.bind(this,record)}>编辑</span>
        <span onClick={this.removebtn.bind(this,record.id)}>删除</span>
      </div>
    );
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <Table dataSource={this.state.dataSource} hasHeader={false} hasBorder={false}>
          <Table.Column title="分类名称" dataIndex="label" width={80} />
          <Table.Column title="操作" cell={this.caozuo} width={20} align='center' />
        </Table>
      </div>
    );
  }
}

export default class IndustryCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // columnslist: [], // 栏目列表
      datas: [], // 列表数据
      current: 1, // 页码
      pageSize: 10, // 每一页多少数据
      total: 0, // 数据总数
      args: [], // 选中的数据
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
        const pageSize = this.state.pageSize; // 一页多少数据
        const page = this.state.current; // 页码
        categorylist({
          pageSize,
          page,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            // const list = data.data;
            // const columnslist = list.map(item=>({ label: item.columnName,value: item.columnName }));
            this.setState({
              datas: data.data,
              isLoading: false,
              // total: data.data.totalCount,
            });
          } else {
            Message.success(data.message);
          }
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
  /*  contentmessage=(value,index,record)=>{
    debugger;
    const createdAt = moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
    return (
      <div>
        <span style={{ fontWeight: 'bold', paddingRight: '10px', fontSize: '16px', color: '#333' }}>{record.title}</span>
        <span style={{ fontSize: '14px',color: '#999' }}>发表于{createdAt}</span>
        <p style={{ color: '#666' }}>{record.content}</p>
      </div>
    );
  } */
  /*  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { datas,args } = this.state;
    categorydelete({
      _id: args,
    }).then(({ status,data })=>{
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
      } else {
        Message.success(data.message);
      }
    });
  } */
  tabBtnOne() {
    this.props.history.push("/backadmin/Systemsettings/siteconfiguration");
  }
  tabBtnTwo() {
    this.props.history.push("/backadmin/Systemsettings/mailboxsettings");
  }
  tabBtnThree() {
    this.props.history.push("/backadmin/Systemsettings/smsgatewaysettings");
  }
  tabBtnFour() {
    this.props.history.push("/backadmin/Systemsettings/qrcodegateway");
  }
  tabBtnfive() {
    this.props.history.push("/backadmin/Systemsettings/industryCategory");
  }
  // 添加一级目录
  addonecategory() {
    const record = { label: '' };
    const one = 'one';
    this.AddCategory.addmessageopen(record,one);
  }
  // 修改一级目录
  edonecategory(record) {
    const one = 'one';
    this.AddCategory.addmessageopen(record,one);
  }
  // 添加二级栏目
  addtwocategory(record) {
    const two = 'two';
    this.AddCategory.addmessageopen(record,two);
  }
  // 删除
  removebtn(id) {
    const datas = this.state.datas;
    categorydelete({
      id,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        let index = -1;
        datas.forEach((item, i) => {
          if (item.id === id) {
            index = i;
          }
        });
        if (index !== -1) {
          datas.splice(index, 1);
          this.setState({
            datas,
          });
        }
        this.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  // 操作
  caozuo = (value, index, record) => {
    return (
      <div className='tb_span'>
        <span onClick={this.addtwocategory.bind(this,record)}>添加二级类目</span>
        <span onClick={this.edonecategory.bind(this,record)}>编辑</span>
        <span onClick={this.removebtn.bind(this,record.id)}>删除</span>
      </div>
    );
  }
  expandedRowRender = (record, index) => {
    const children = record.son;
    return <ExpandedApp dataSource={children} index={index} addtwocategory={this.addtwocategory.bind(this)} removebtn={this.removebtn.bind(this)} fetchData={this.fetchData.bind(this)} />;
  };
  render() {
    const { isLoading, datas, columnslist,current,pageSize,total } = this.state;
    // const rowSelection = {
    //   onChange: this.Choice.bind(this),
    //   getProps: (record,index) => {
    //     /* return {
    //       disabled: record.id === 100306660942,
    //     }; */
    //   },
    // };
    return (
      <div className='Industrycategory'>
        <AddCategory ref={node=>this.AddCategory = node} fetchData={this.fetchData.bind(this)} />
        <Tab shape='pure' defaultActiveKey='5'>
          <Tab.Item title="站点配置" key='1' onClick={this.tabBtnOne.bind(this)}>
          </Tab.Item>
          <Tab.Item title="邮箱收发设置" key='2' onClick={this.tabBtnTwo.bind(this)}>
          </Tab.Item>
          <Tab.Item title="短信网关" key='3' onClick={this.tabBtnThree.bind(this)}>
          </Tab.Item>
          <Tab.Item title="二维码网关" key='4' onClick={this.tabBtnFour.bind(this)}>
          </Tab.Item>
          <Tab.Item title="行业类目" key='5' onClick={this.tabBtnfive.bind(this)}>
            <div className='Industrycategory-main'>
              <Button className='btns-all Addcolumns' size='large' type='secondary' style={{ marginBottom: '10px', marginLeft: '0' }} onClick={this.addonecategory.bind(this)}>添加一级栏目</Button>
              <Table
                loading={isLoading}
                dataSource={datas}
                hasBorder={false}
                // primaryKey='_id'
                // rowSelection={rowSelection}
                expandedRowRender={this.expandedRowRender}
                // expandedRowIndent={[1, 1]}
              >
                <Table.Column title="分类名称" dataIndex='label' width={80} />
                <Table.Column title="操作" cell={this.caozuo} width={20} align='center' />
              </Table>
              {/* <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button> */}
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize} // 界面展示多少条数据
                total={total}
              />
              {/* <Button className='btns-all' size='large' type='primary' style={{ marginTop: '-30px' }} onClick={this.removes.bind(this)}>删除</Button> */}
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  formbinderboxs: {
    width: '336px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  officialleftsele: {
    width: '50px',
  },
  officialrightsele: {
    width: '50px',
  },
};
