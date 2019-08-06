import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Message,Form ,Switch,Pagination,Table } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import Ippopup from './ippopup';
import { settingwhiteIpsget,settingwhiteIpspost,settingwhiteIpsdele,settingwhiteIpschangeStatus } from '@indexApi';
import '../../../index.css';
import moment from "moment/moment";

const { Row, Col } = Grid;
@withRouter
export default class Applicationparameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [], // 列表数据
      id: this.props.location.state.id,
      whiteListSwitch: false,
    };
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
  }

  componentDidMount() {
    this.fetchData();
  }
  // 获取所有ip的数据
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const appId = this.state.id;
        settingwhiteIpsget({
          appId,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
              data: data.data.list,
              whiteListSwitch: data.data.whiteListSwitch,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };
  // 删除
  deleteip=(ip)=> {
    const appId = this.state.id;
    const datas = this.state.data;
    settingwhiteIpsdele({
      appId,
      ip,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        let index = -1;
        console.log(datas);
        debugger;
        datas.forEach((item, i) => {
          debugger;
          if (item.ip === ip) {
            index = i;
          }
        });
        if (index !== -1) {
          datas.splice(index, 1);
          this.setState({
            data: datas,
          });
        }
        // this.fetchData();
        // location.reload()
      } else {
        Message.success(data.message);
      }
    });
  }
  renderOper = (value,index,record) => {
    return (
      <div>
        <Button type="normal" warning onClick={this.deleteip.bind(this,record.ip)}>
          删除
          {/* <FormattedMessage id="app.btn.delete" /> */}
        </Button>
      </div>
    );
  };
  // 添加ip
  addIP() {
    const appId = this.state.id;
    this.Ippopup.ippopupopen(appId);
  }
  // 白名单开关
  addopenSwitch(e) {
    const appId = this.state.id;
    settingwhiteIpschangeStatus({
      whiteListSwitch: e,
      appId,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.setState({
          whiteListSwitch: e,
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { isLoading, data, current,whiteListSwitch } = this.state;
    console.log(whiteListSwitch);
    debugger;
    return (
      <div className='applicationters'>
        <Tab shape='pure' className='backstage-tab' defaultActiveKey='2'>

          <Tab.Item title="ip白名单" key='2'>
            <div className='tab-contenttwo'>
              <div className='tab-contenttwo-left'>
                <Message type='notice' className='tab-contenttwo-left-message'>
                    默认出款类使用IP白名单，开启右下角开关后所有API只允许白名单内IP进行操作
                </Message>
                <div className='tab-contenttwo-left-btn'>
                  <Button type="primary" size='large' onClick={this.addIP.bind(this)}>
                    <i className='os-icon os-icon-ui-55' />
                     添加IP
                  </Button>
                  <div>
                    <span>全限白名单</span>
                    <Switch size='large' className='div-switch' checked={whiteListSwitch} onChange={this.addopenSwitch.bind(this)} />
                  </div>
                </div>
                <div className='claer' />
                <div>
                  <Table loading={isLoading} dataSource={data} hasBorder={false}>
                    <Table.Column title="访问IP" dataIndex="ip" />
                    <Table.Column title="添加时间" dataIndex="createdAt" />
                    <Table.Column
                      title="操作"
                      width={200}
                      dataIndex="oper"
                      cell={this.renderOper}
                    />
                  </Table>
                </div>
              </div>
              <div className='tab-contenttwo-right'>
                <div>
                  <p>全限白名单</p>
                  <p>默认出款类使用IP白名单，开启后所有API只允许白名单内IP进行操作</p>
                </div>
                <div>
                  <p>IP 白名单</p>
                  <p> 仅白名单列表内的 IP 地址，可以成功请求出款类接口，包含： 企业付款、 批量企业付款、 红包、 用户结算账户、 分润结算、 余额提现、 余额批量提现。</p>
                </div>
              </div>
            </div>
          </Tab.Item>
        </Tab>
        <Ippopup ref={ node => this.Ippopup = node } fetchData={this.fetchData.bind(this)} />
      </div>
    );
  }
}
