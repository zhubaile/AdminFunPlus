import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Dropdown, Menu,MenuButton } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { channel } from '@indexApi';
import '../../../index.css';

const { Item } = MenuButton;
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['支付宝'],
      level: ['手机网页'],
      rule: ['默认规则'],
    };
  });
};
@withRouter
export default class PlatformChannel extends Component {
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

    mockApi = (len) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        }, 600);
      });
    };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        });
      /*  channel().then(({ status,data })=>{
          debugger;
          this.setState({
            data: data.data,
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

  renderRule = (rules) => {
    return (
      <div>
        <select className='table-select'>
          {
            rules.map((item,index)=>{
              debugger;
              return <option value="volvo">{item.ruleName}</option>;
            })
          }
          {/* <option value="volvo">默认规则</option>
          <option value="saab">自定义规则</option>
          <option value="opel">自定义规则</option>
          <option value="audi">新增规则</option> */}
        </select>
      </div>
    );
  };
  renderStatus = (ruleswitch) => {
    debugger;
    return (
      <div>
        <Switch className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  renderOper = () => {
    return (
      <a>删除</a>
    );
  };
  btn() {
    this.props.history.push("/backadmin/applicationmanagement/applicationChannel");
  }
  render() {
    const { isLoading, data, current } = this.state;
    return (
      <div className='channelmanagement'>
        <Tab shape='pure' className='backstage-tab' defaultActiveKey='2'>
          <Tab.Item title="应用渠道" key='1' onClick={this.btn.bind(this)}>

          </Tab.Item>

          <Tab.Item title="平台渠道" key='2'>
            <div className='tab-content' >
              <Table loading={isLoading} dataSource={data} hasBorder={false}>
                {/* <Table.Column title="商户ID" dataIndex="merchantId" /> */}
                <Table.Column title="支付渠道" dataIndex="name" />
                <Table.Column title="使用场景" dataIndex="level" />
                <Table.Column title="路由规则" dataIndex="rule" cell={this.renderRule} />
                <Table.Column title="状态" dataIndex="status" cell={this.renderStatus} />
                <Table.Column
                  title="操作"
                  width={200}
                  dataIndex="oper"
                  cell={this.renderOper}
                />
              </Table>
              {/*                  <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={current}
                    onChange={this.handlePaginationChange}
                  /> */}
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}
