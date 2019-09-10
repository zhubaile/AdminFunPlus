import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Radio,Select, Input,Table,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { bulletinlist,bulletindelete } from '@indexApi';
import Seedetails from './Seedetails';
import '../index.css';
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
export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagestatus: false, // false是未解决的消息，true是已解决的消息
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
        const messagestatus = this.state.messagestatus; // 已发送未发送状态
        bulletinlist({
          pageSize,
          page,
          statetype: messagestatus,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data.result,
              isLoading: false,
              total: data.data.totalCount,
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
  // 添加消息公告
  seedetailsBtn(record) {
    this.Seedetails.Seedetailsopen(record);
  }
  // 切换消息状态
  openmessage(i) {
    console.log(i);
    this.setState({
      messagestatus: i,
    },()=>{
      this.fetchData();
    });
  }
  contentmessage=(value,index,record)=>{
    const createdAt = moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
    return (
      <div>
        <span style={{ fontWeight: 'bold', paddingRight: '10px', fontSize: '16px', color: '#333' }}>{record.title}</span>
        <span style={{ fontSize: '14px',color: '#999' }}>发表于{createdAt}</span>
        <p style={{ color: '#666' }}>{record.content}</p>
      </div>
    );
  }
  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { datas,args } = this.state;
    bulletindelete({
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
      } else {
        Message.success(data.message);
      }
    });
  }
  // 已完成按钮
  routerRulebtn() {
    console.log('已完成');
  }
  // 操作
  caozuo = (value, index, record) => {
    return (
      <div className='tb_span'>
        <span onClick={this.seedetailsBtn.bind(this,record)}>查看</span>
      </div>
    );
  }
  render() {
    const { isLoading, datas, columnslist,current,pageSize,total,messagestatus } = this.state;
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    return (
      <div className='Feedback'>
        <Seedetails ref={node=>this.Seedetails = node} fetchData={this.fetchData.bind(this)} />
        {/* <Button className='btns-all Addmessage' size='large' type='primary' onClick={this.seedetailsBtn.bind(this)}>新增</Button> */}
        <Tab shape='pure'>
          <Tab.Item title="留言咨询">
            <div className='feedback-main'>
              <button className={messagestatus == false ? 'feedback-mainbtn active' : 'feedback-mainbtn'} onClick={this.openmessage.bind(this,false)}>未解决</button>
              <button className={messagestatus == false ? 'feedback-mainbtn' : 'feedback-mainbtn active'} onClick={this.openmessage.bind(this,true)}>已解决</button>
              <Table
                loading={isLoading}
                dataSource={datas}
                hasBorder={false}
                primaryKey='_id'
                rowSelection={rowSelection}
              >
                <Table.Column title="全选" dataIndex='content' cell={this.contentmessage} />
                <Table.Column title="姓名" dataIndex='name' />
                <Table.Column title="手机号" dataIndex='phone' />
                <Table.Column title="邮箱" dataIndex='email' />
                <Table.Column title="提交时间" dataIndex='content' />
                <Table.Column title="需求选择" dataIndex='1' />
                <Table.Column title="操作" dataIndex='2' cell={this.caozuo} />
              </Table>
              {/* <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button> */}
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize} // 界面展示多少条数据
                total={total}
              />
              {
                messagestatus == true ? (
                  <Button className='btns-all' size='large' type='primary' style={{ marginTop: '-50px' }} onClick={this.removes.bind(this)}>删除</Button>
                ) : (
                  <Button className='btns-all' size='large' type='primary' style={{ marginTop: '-50px' }} onClick={this.routerRulebtn.bind(this)}>标记为已解决</Button>
                )
              }
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
