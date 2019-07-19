import React, { Component } from 'react';
import { Tab,Button,Input } from '@alifd/next';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
// import Administrators from '../../Personal/components/Administrators/Administrators';
import '../../../layouts/BasicLayout/components/Header/index.scss';
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
      array: [], // 用户的个人信息
      username: '', // 当前对方用户名称
      byReplyId: '', // 对方id
      userId: '', // 用户id
    };
    this.socket = io.connect(`ws://192.168.1.105:3000`);
    this.onScrollHandle = this.onScrollHandle.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    /* 联系人的列表 */
    workOrderserviceList().then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          workOrderserviceLists: data.data,
        });
      }
    });
    const userId = Cookies.get('userId');
    debugger;
    // 初始聊天记录内容
    workOrderuserRecordOne({
      userId,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data.data,
          array: data.data.userInfo,
          username: data.data.userInfo.username,
          userId,
          byReplyId: data.data.userInfo._id,
        },()=>{
          this.onScrollHandle(this.messagesEnd);
        });
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
    workOrdersessionList().then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          workOrdersessionLists: data.data,
          // stylecolor: false,
        });
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
      reacordStatus: 2,
    };
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
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data.data, // 获取之前的聊天记录
          messagelist: [], // 此刻聊天记录清空
          username: data.data.userInfo.username,
          array: data.data.userInfo,
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
        const times = moment(item.times).format('YYYY-MM-DD HH:mm:ss');
        console.log(times);
        debugger;
        return (
          <div>
            {
              item.isStatus == true ? (
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
              ) : (
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
              <i className="os-icon os-icon-mail-14" />
              <span>正在会话</span>
            </div>
            <div className={stylecolor == false ? 'chat-list-box color' : 'chat-list-box'} onClick={this.listbtn.bind(this)}>
              <i className="os-icon os-icon-mail-14" />
              <span>用户列表</span>
            </div>
          </div>
          <div className='user-list'>
            {
              stylecolor == true ? (
                workOrdersessionLists.map((item)=>{
                  debugger;
                  return (
                    <div className='user-w' onClick={this.SwitchingUsers.bind(this,item.byReplyId)}>
                      <div className="avatar with-status status-green">
                        <img alt="" src={require('@img/img/avatar1.jpg')} />
                      </div>
                      <div className="user-info">
                        <div className="user-date">
                          {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
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
                          item.serviceStatus == 0 ? (
                            <div className="chat-message">
                              <div className="chat-message-avatar">
                                <img alt="" src={require('@img/img/avatar1.jpg')} />
                                <div>
                                  <p>{item.username}</p>
                                  <span>{item.createdAt}</span>
                                </div>
                              </div>
                              <div className="chat-message-content-w">
                                <div className="chat-message-content">
                                  {item.customerContent}
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
                                  <span>{item.createdAt}</span>
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
              <p>商户ID：{array._id}</p>
              <p>企业名称：{array.companyName}</p>
              <p>联系方式：{array.phone}</p>
              <p>联系邮箱：{array.email}</p>
              <p>角色名称：{array.premissions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
