import React, { Component } from 'react';
import { findDomNode } from 'react-dom';
import { Table,Input,Radio ,Dialog ,DatePicker,Rating,Message,Button, Select , Form } from '@alifd/next';
// import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
import moment from "moment/moment";
// import { Dialog,Message } from "@alifd/next/lib/index";
import { workOrdercustomerWork,workOrderremainEvaluated,workOrderworkDetails } from '@indexApi';
import '../../../../layouts/BasicLayout/components/Header/index.scss';
import '../../index.css';
import Deletedata from './Deletedata';
// import Check from './Check';

const Cookies = require('js-cookie');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 17 },
};


export default class Workorderdetails extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {
      // ChatRecord: [],
      Probleminput: '',
      // isBottom: true,
      id: this.props.location.state.id,
      isLoading: false,
      work: [
        { status: 0, isStatement: 0 },
      ], // 工单详情
      workDetail: [], // 聊天记录
      workEvaluate: [], // 评价内容
      // work: this.props.location.state.work, // 工单详情
      // workDetail: this.props.location.state.workDetail, // 聊天记录
      // workEvaluate: this.props.location.state.workEvaluate, // 评价内容
    };
    this.onScrollHandle = this.onScrollHandle.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  componentWillReceiveProps(nextProps) {
    debugger;
  }
  fetchData = (len) => {
    const id = this.state.id;
    debugger;
    workOrderworkDetails({
      _id: id,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          work: data.data.work,
          workDetail: data.data.workDetail,
          workEvaluate: data.data.workEvaluate,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
      }
    });
  };

  formChange = (value) => {

  };
  // 滑轮自动下滑到底部
  onScrollHandle(event) {
    const clientHeight = event.clientHeight;
    const scrollHeight = event.scrollHeight;
    const scrollTop = (scrollHeight - clientHeight);
    this.messagesEnd.scrollTop = scrollTop;
    console.log(scrollTop);
  }

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };
  // 输入框事件
  probleminput(v,e) {
    this.setState({
      Probleminput: v,
    });
  }
    onprobleminputKey = (e) => {
      if (e.keyCode == 13) {
        this.subreply();
      }
    }
  // 提交按钮事件
    subreply() {
      const contents = this.state.Probleminput;
      const _id = this.state.work[0]._id;
      const byReplyId = Cookies.get('userId'); // 用户的id
      debugger;
      if (!contents) {
        return Message.success('输入问题不能为空');
      }
      workOrdercustomerWork({
        byReplyId,
        customerContent: contents,
        _id,
      }).then(({ status,data })=>{
        debugger;
        if (data.errCode == 0) {
          this.setState({
            workDetail: data.data,
            Probleminput: '',
          },()=>{
            this.onScrollHandle(this.messagesEnd);
          });
        } else {
          Message.success(data.message);
        }
      });
    }
  // 删除工单
    workorderdetailsOpen(id) {
      this.Deletedata.deletedataopen(id);
    }
  /*  // 结单
    workorderdetailsOpenbtn() {
      const id = this.state.work[0]._id;
      this.Check.checkopen(id);
    }
    // 返回工单列表
    reworklist() {
      this.props.history.push("/backadmin/service/allworkorders");
    } */
  renderOper = (values,index,record) => {
    return (
      <div>
        <a href="javascript:;" style={{ marginLeft: '3px' }} onClick={this.workorderdetailsOpen.bind(this,record._id)}>删除工单</a>
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

  // 工单评价
  remainEvaluated = (values, errors) => {
    if (!errors) {
      const _id = this.state.workEvaluate._id;
      debugger;
      workOrderremainEvaluated({
        _id,
        feedback: values.messages,
        star: values.star,
        isSolve: values.radio,
      }).then(({ status,data })=>{
        if (data.errCode == 0) {
          Message.success(data.message);
          this.props.history.push("/admin/backstageworkorder/Allworkorders");
        }
      });
    }
  }
  render() {
    const { isLoading, work, workDetail,workEvaluate } = this.state;
    const status = work[0].status; // 状态，处理中，待评价，已存档，已完成
    const usernames = work[0].username; // 用户识别
    const isStatement = work[0].isStatement; // 是否结单
    return (
      <div className='backstageworkorder'>
        <Deletedata ref={ node => this.Deletedata = node } history={this.props.history} />
        {/* <Check ref={ node => this.Check = node } history={this.props.history} />
        <Nav defaultActiveKey='2' history={this.props.history} /> */}
        <div className='wodegongdan'>
          <div className='wodegongdan-top'>
            <span>工单详情</span>
            <div className='wodegongdan-top-border' />
          </div>
          <div className='wodegongdan-table'>
            <Table loading={isLoading} dataSource={work} hasBorder={false}>
              <Table.Column title="工单编号" dataIndex="_id" />
              <Table.Column title="描述" dataIndex="description" />
              <Table.Column title="优先级" dataIndex="level" />
              <Table.Column title="企业名称" dataIndex="companyName" />
              <Table.Column title="创建人" dataIndex="username" />
              <Table.Column title="联系方式" dataIndex="phone" />
              <Table.Column title="提交时间" dataIndex="createdAt" cell={this.time} />
              <Table.Column title="状态" dataIndex="status" cell={this.statusoneortwo} />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
          </div>
          <p style={{ borderLeft: '2px solid blue', marginLeft: '5px' }}>沟通记录</p>
          <div className={isStatement == 1 ? 'dealwith-workorder record' : 'dealwith-workorder'}>
            <div className='communicationrecord' ref={(node) => { this.messagesEnd = node; }} >
              {/* <div className='communicate'> */}
              {
                workDetail.map((item)=>{
                    return (
                      <div className='communicate'>
                        { item.username == usernames ? (<img src={require('@img/img/avatar1.jpg')} alt="" />) : (<img src={require('@img/logo/logo1.png')} alt="" />) }
                        <ul>
                          <li>{item.username}</li>
                          <li>{item.description}</li>
                          <li>{item.createdAt}</li>
                        </ul>
                      </div>
                    );
                  })
                }
            </div>
            <hr />
            {isStatement == 1 ? ('') : (
              <div>
                <div>
                  <Input.TextArea placeholder='请输入您的问题' value={this.state.Probleminput} onChange={this.probleminput.bind(this)} onKeyDown={this.onprobleminputKey} />
                </div>
                <div className='submit-btn'>
                  <Button type='primary' size='large' onClick={this.subreply.bind(this)}>提交回复</Button>
                </div>
              </div>
            )}
          </div>
          <div className={isStatement == 1 ? 'wodegongdan-pingjia' : 'wodegongdan-pingjia nodisplay'}>
            {status == 3 ? (
              <Form
                {...formItemLayout}
                // ref="form"
              >
                {/* <span>整体评价：</span> */}
                <FormItem label='整体评价：'>
                  <Rating name='star' defaultValue={workEvaluate.star} disabled count='5' size='large' />
                </FormItem >
                {/* <span>问题是否解决：</span> */}
                <FormItem label='问题是否解决：'>
                  {workEvaluate.isSolve == 1 ? '已解决' : '未解决'}
                </FormItem >
                <FormItem label='评价内容：'>
                  {workEvaluate.feedback}
                </FormItem >
              </Form>
            ) : null
              /* (
              <Form
                {...formItemLayout}
                 // ref="form"
              >
                {/!* <span>整体评价：</span> *!/}
                <FormItem label='整体评价：'>
                  <Rating name='star' count='5' size='large' />
                </FormItem >
                {/!* <span>问题是否解决：</span> *!/}
                <FormItem label='问题是否解决：'>
                  <RadioGroup name='radio'>
                    <Radio id="1" value="1">已解决</Radio>
                    <Radio id="2" value="2">未解决</Radio>
                  </RadioGroup>
                </FormItem >
                <div className='fankui'>
                  <span>我要反馈：</span>
                  <FormItem required requiredMessage="不能为空">
                    <Input.TextArea
                      name='messages'
                      placeholder="Type your message here..."
                      rows={10}
                    />
                  </FormItem >
                  <FormItem label=" ">
                    <Form.Submit style={{ textAlign: 'right' }} type="primary" validate onClick={this.remainEvaluated}>提交</Form.Submit>
                  </FormItem>
                  {/!* <Button type='primary' onClick={this.remainEvaluated.bind(this)}>提交</Button> *!/}
                </div>
              </Form>
            ) */}

          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  btn: {
    position: 'absolute',
    right: '60px',
    height: '28px',
    width: '80px',
    borderRadius: '6px',
  },
  btns: {
    position: 'absolute',
    right: '60px',
    height: '28px',
    width: '140px;',
    borderRadius: '6px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
