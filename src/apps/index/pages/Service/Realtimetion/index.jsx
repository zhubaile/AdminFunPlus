import React, { Component } from 'react';
import { Tab,Button,Input } from '@alifd/next';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
// import Administrators from '../../Personal/components/Administrators/Administrators';
import '../../../layouts/BasicLayout/components/Icon/iconfont.css';
import '../index.css';
import { workOrderuserRecord,workOrderuserRecordOne,workOrderserviceList,workOrdersessionList } from '@indexApi';
import { Message } from "@alifd/next/lib/index";
import moment from 'moment';
import io from 'socket.io-client';

const Cookies = require('js-cookie');

const listss = [];


export default class Customerservice extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {
      stylecolor: true, //
      workOrdersessionLists: [], // 会话列表的内容
      workOrderserviceLists: [], // 列表内容
      Probleminput: '', // 输入框内容
      datas: [], // 之前的聊天记录
      messagelist: [], // 此刻聊天的记录
      array: {
        roles: [],
      }, // 用户的个人信息
      username: '', // 当前对方用户名称
      byReplyId: '', // 对方id
      userId: '', // 用户id
    };
    this.socket = io.connect(`ws://192.168.1.118:3000`,{ path: '/chat' },{ transports: ['websocket', 'polling'] });
    // this.socket = io.connect(`ws://47.100.188.156`);
    // this.socket = io.connect(`ws://funplus.yue-net.com`,{ path: '/chat' },{ transports: ['websocket', 'polling'] });
    this.onScrollHandle = this.onScrollHandle.bind(this);
  }
  // 定时器
  tick(userId) {
    this.socket.emit('heartbeat',userId);
  }
  // 解除定时器
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.fetchData();
    /* 联系人的列表 */
    workOrderserviceList().then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          workOrderserviceLists: data.data,
        });
      } else {
        Message.success(data.message);
      }
    });
    const userId = Cookies.get('userId');
    // this.interval = setInterval(() => this.tick(userId), 3000);
    // 初始聊天记录内容
    workOrderuserRecordOne({
      senderType: 2,
      userId,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          datas: data.data,
          array: data.userInfo,
          username: data.userInfo.username,
          userId,
          byReplyId: data.userInfo.byReplyId,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  // 监听socket
  componentWillMount() {
    const userid = Cookies.get('userId');
    this.socket.on('connect',(...arg)=>{
      console.log("链接成功");
      this.socket.emit('binduser',userid);
    });
    this.socket.on('disconnect',(...arg)=>{
      console.log("链接销毁");
    });
    this.socket.on('message',(msg)=>{
      console.log(msg);
      debugger;
      this.setState((prevState)=>{
        prevState.messagelist.push(msg);
        return prevState;
      },()=>{
        this.onScrollHandle(this.messagesEnd);
      });
    });
  }
  // 会话的列表
  fetchData = () => {
    workOrdersessionList({
      senderType: 2,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          workOrdersessionLists: data.data,
          // stylecolor: false,
        });
      } else {
        Message.success(data.message);
      }
    });
  };
  // 输入框事件
  probleminput(v,e) {
    this.setState({
      Probleminput: v,
    });
  }
  // 回车事件
  onprobleminputKey = (e) => {
    if (e.keyCode == 13) {
      this.subreply();
    }
  }
  // 获取客服的id
  /*  customerserviceid(e) {
    debugger;
    const userid = Cookies.get('applicationId'); // 用户的id
    workOrderuserRecord({
      userId: userid,
      byReplyId: e,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          datas: data.data, // 获取之前的聊天记录
          byReplyId: e,
          userId: userid,
        });
      }
    });
    /!* this.setState({
      serviceid: e,
    }); *!/
  } */
  // 会话按钮
  Conversation() {
    this.setState({
      stylecolor: true,
    });
    this.fetchData();
  }
  // 列表按钮
  listbtn() {
    this.setState({
      stylecolor: false,
    });
  }
  // 提交
  subreply() {
    const byReplyId = this.state.byReplyId; // 对方id
    const userId = this.state.userId; // 当前用户的id
    const messagelist = this.state.messagelist; // 此刻聊天的内容
    const customerContent = this.state.Probleminput; // 输入框的值
    // const times = moment().format('YYYY-MM-DD HH:mm:ss');
    const times = moment().valueOf();
    debugger;
    if (!customerContent) {
      return Message.success('输入问题不能为空');
    }
    const myMsg = {
      byReplyId,
      userId,
      customerContent,
      times,
      senderType: 2,
    };
    console.log(myMsg);
    // this.socket.send(myMsg);
    this.socket.emit('sayTo',myMsg);
    this.setState((prevState)=>{
      prevState.messagelist.push(myMsg);
      prevState.Probleminput = '';
      return prevState;
    },()=>{
      this.onScrollHandle(this.messagesEnd);
    });
  }
  onScrollHandle(event) {
    const clientHeight = event.clientHeight;
    const scrollHeight = event.scrollHeight;
    const scrollTop = (scrollHeight - clientHeight);
    this.messagesEnd.scrollTop = scrollTop;
  }
  // 切换用户
  SwitchingUsers(e) {
    const userId = this.state.userId;
    debugger;
    workOrderuserRecord({
      userId,
      byReplyId: e,
      senderType: 2,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data, // 获取之前的聊天记录
          messagelist: [], // 此刻聊天记录清空
          username: data.userInfo.username,
          array: data.userInfo,
          byReplyId: e,
          userId,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { stylecolor,workOrdersessionLists,workOrderserviceLists, datas, messagelist,username,array } = this.state;
    const zbla = (
      messagelist.map((item) => {
        const userid = this.state.userId; // 自己的id
        const times = moment(item.times).format('YYYY-MM-DD HH:mm:ss');
        console.log(times);
        debugger;
        return (
          <div>
            {
              item.userId == userid ? (
                <div className="chat-message self">
                  <div className="chat-message-avatar">
                    <img alt="" src={require('@img/img/avatar2.jpg')} />
                    <div>
                      {/* <p>{array.username}</p> */}
                      <p>本人</p>
                      <span>{times}</span>
                    </div>
                  </div>
                  <div className="chat-message-content-w">
                    <div className="chat-message-content">
                      {item.customerContent}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-message">
                  <div className="chat-message-avatar">
                    <img alt="" src={require('@img/img/avatar1.jpg')} />
                    <div>
                      <p>{username}</p>
                      <span>{times}</span>
                    </div>
                  </div>
                  <div className="chat-message-content-w">
                    <div className="chat-message-content">
                      {item.customerContent}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        );
      })
    );
    return (
      <div className='backstageworkorder'>

        <div className='backstageworkorder-box'>
          <div className='chat-list'>
            <div className={stylecolor == true ? 'chat-list-box color' : 'chat-list-box'} onClick={this.Conversation.bind(this)}>
              <i className="iconfont icon-huihua" style={{ fontSize: '20px', fontWeight: 'bold' }} />
              <span>正在会话</span>
            </div>
            <div className={stylecolor == false ? 'chat-list-box color' : 'chat-list-box'} onClick={this.listbtn.bind(this)}>
              <i className="iconfont icon-liebiao" style={{ fontSize: '20px',fontWeight: 'bold' }} />
              <span>用户列表</span>
            </div>
          </div>
          <div className='user-list'>
            {
              stylecolor == true ? (
                workOrdersessionLists.map((item)=>{
                  debugger;
                  return (
                    <div className='user-w' onClick={this.SwitchingUsers.bind(this,item.sendId)}>
                      <div className="avatar with-status status-green">
                        <img alt="" src={require('@img/img/avatar1.jpg')} />
                      </div>
                      <div className="user-info">
                        <div className="user-date">
                          {moment(item.sendTime).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <div className="user-name">
                          {item.senderName}
                          <span className={item.no_readed_num == 0 ? 'noreadednum no' : 'noreadednum'}>{item.no_readed_num}</span>
                        </div>
                        <div className="last-message">
                          {item.last_message}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                workOrderserviceLists.map((item)=>{
                  return (
                    <div className='user-w' onClick={this.SwitchingUsers.bind(this,item._id)}>
                      <div className="avatar with-status status-green">
                        <img alt="" src={require('@img/img/avatar1.jpg')} />
                      </div>
                      <div className="user-info">
                        <div className="user-name">
                          {item.username}
                        </div>
                        <div className="last-message">
                          {item.customerContent}
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            }
          </div>
        </div>
        {/* <Nav defaultActiveKey='1' history={this.props.history} customerserviceid={this.customerserviceid.bind(this)} /> */}

        <div className='kefu'>
          <div className="kefu-main">
            <div className="kefu-main-head">
              <i className="os-icon os-icon-mail-07 left" />
              <div>
                {username}
              </div>
              <i className="os-icon os-icon-phone-15 right" />
            </div>
            <div className="kefu-main-chatcontent" ref={(node) => { this.messagesEnd = node; }} >
              <div className="chat-content">
                {
                  datas.map((item) => {
                    return (
                      <div>
                        {
                          item.senderType == 1 ? (
                            <div className="chat-message">
                              <div className="chat-message-avatar">
                                <img alt="" src={require('@img/img/avatar1.jpg')} />
                                <div>
                                  <p>{item.username}</p>
                                  <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                              </div>
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">
                                  {item.message}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="chat-message self">
                              <div className="chat-message-avatar">
                                <img alt="" src={require('@img/img/avatar2.jpg')} />
                                <div>
                                  {/* <p>{item.username}</p> */}
                                  <p>本人</p>
                                  <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </div>
                              </div>
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">
                                  {item.message}
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    );
                  })
                }
                {zbla}
              </div>
            </div>
            <div className="chat-controls">
              <div className="chat-input">
                <Input.TextArea
                  placeholder="Type your message here..."
                  rows={10}
                  value={this.state.Probleminput}
                  onChange={this.probleminput.bind(this)}
                  onKeyDown={this.onprobleminputKey}
                  // ref={node => this.charmessageself = node}
                />
                {/* <input placeholder="Type your message here..." type="text" /> */}
              </div>
              <div className="chat-input-extra">
                <div className="chat-extra-actions">
                  <a href="#"><i className="os-icon os-icon-mail-07" /></a><a href="#"><i className="os-icon os-icon-phone-18" /></a><a href="#"><i className="os-icon os-icon-phone-15" /></a>
                </div>
                <div className="chat-btn">
                  <Button type='primary' size='large' onClick={this.subreply.bind(this)} >答复</Button>
                </div>
              </div>
            </div>

          </div>
          <div className='kefu-right'>
            <div className='administrators'>
              <img src={require('@img/img/avatar1.jpg')} alt="" />
              <h2>{array.username}</h2>
              <p>商户ID：{array.cpId}</p>
              <p>企业名称：{array.cpName}</p>
              <p>联系方式：{array.phone}</p>
              <p>联系邮箱：{array.email}</p>
              <p>角色名称：{array.roles.join('.')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
