import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab, Message,Form ,Switch,Pagination,Table } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import Ippopup from './ippopup';
import { ObtainsettingwhiteIps,deletesettingwhiteIps,addwhiteListSwitch } from '@indexApi';
import '../../../index.css';

const { Row, Col } = Grid;
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'],
      level: ['普通会员', '白银会员', '黄金会员', 'VIP 会员'],
      balance: (10000, 100000),
      accumulative: (50000, 100000),
      regdate: `2018-12-1`,
      birthday: `1992-10-1`,
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'],
    };
  });
};
@withRouter
export default class Applicationparameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
    };
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
  }

  componentDidMount() {
    this.fetchData();
  }

  /*  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
      }, 600);
    });
  }; */
  // 获取所有ip的数据
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        ObtainsettingwhiteIps().then(({ status,data })=>{
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
              data: data.data,
            });
          } else {
            Message.success(data.message);
          }
        });
        /* this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        }); */
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
  deleteip(record,index) {
    deletesettingwhiteIps({
      ip: record.ip,
    }).then(
      location.reload()
    );
  }
  renderOper = (value,index,record) => {
    debugger;
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
          {/* <FormattedMessage id="app.btn.detail" /> */}
        </Button>
        <Button type="normal" warning onClick={()=>this.deleteip(record,index)}>
          删除
          {/* <FormattedMessage id="app.btn.delete" /> */}
        </Button>
      </div>
    );
  };
  /*  // 复制按钮功能
  copybtn() {
    const applicationID = this.applicationID.getInputNode(); // Input 获取demo节点用getInputNode()方法
    applicationID.select();
    if (!applicationID.value) {
      Message.success('复制内容为空');
      return;
    }
    document.execCommand('copy');
    Message.success('复制成功');
  }
  handleSubmit=()=> {
    const z = this.Mtextinput.getInputNode().value;
    alert(z);
    debugger;
  } */
  // 添加ip
  addIP() {
    this.Ippopup.ippopupopen();
  }
  // 白名单开关
  addopenSwitch(e) {
    debugger;
    addwhiteListSwitch({
      whiteListSwitch: e,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
      }
    });
  }
  btn() {
    this.props.history.push('/admin/applicationsettings/applicationparameters');
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
    const { isLoading, data, current } = this.state;
    // const copybtn = (<Button onClick={this.copybtn.bind(this)}>复制</Button>);
    // const phonebtn = (<Button>手机/邮箱验证查看</Button>);
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
                    <Switch size='large' className='div-switch' defaultChecked={false} name='whiteListSwitch' onChange={this.addopenSwitch.bind(this)} />
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
                  <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={current}
                    onChange={this.handlePaginationChange}
                  />
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
        <Ippopup ref={ node => this.Ippopup = node } />
      </div>
    );
  }
}
