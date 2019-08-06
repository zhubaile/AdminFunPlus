/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Message,Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import ModifyrulePopup from './ModifyrulePopup';
import '../../../index.css';
import { routerRulelist,routerRule,rulessearch } from '@indexApi';
// import SetNewPassword from "../../../../../Login/pages/SetNewPassword/index";
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const rules = [
  { value: '1', label: '1' },
];
export default class RoutingRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      total: 0,
      pageSize: 10,
      isLoading: false,
      data: [], // 数据列表
      channellist: [], // 搜索的渠道列表数据
      value: {
        channelId: '',
      },
    };
  }

  componentDidMount() {
    this.searchchangebtn();
    this.fetchData();
  }
  // 获取渠道
  searchchangebtn() {
    rulessearch().then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        const channel = data.data;
        const channellist = channel.map(item=>({ value: item.channelId,label: item.channelName }));
        debugger;
        this.setState({
          channellist,
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const channelId = this.state.value.channelId;
        const current = this.state.current;
        const limit = this.state.pageSize;
        routerRulelist({
          channelId,
          page: current,
          limit,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              data: data.data,
              isLoading: false,
              total: data.total,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };
  // 编辑修改路由规则
  routerRulebtn(record) {
    const ruleId = record.ruleId;
    const appId = record.appId;
    debugger;
    routerRule({
      ruleId,
      appId,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        const datas = data.data;
        this.ModifyrulePopup.Routingopen(datas,ruleId);
      } else {
        Message.success(data.message);
      }
    });
  }
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

  renderRules = () => {
    return (
      <div>
        <Select dataSource={rules} />
      </div>
    );
  }
  caozuo = (value, index, record) => {
    return (
      <div className='tb_span'>
        <span onClick={this.routerRulebtn.bind(this,record)}>修改</span>
      </div>
    );
  }
  // 状态
  renderOper = (rule) => {
    return (
      <div>
        <Switch className='div-switch' checked={rule} />
      </div>
    );
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
    formChange = (value) => {
      this.setState({
        value,
      });
    };
  // 获取到选中的数据
  /* Choice(args) {
    debugger;
    this.setState({
      args,
    });
  } */
  // 删除方法
  /*  removes() {
    const { data,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      data.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        data.splice(index, 1);
        this.setState({
          data,
        });
      }
    });
  } */
    render() {
      const { isLoading, data, current,pageSize,total,channellist } = this.state;
      /* const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
      },
    }; */
      return (
        <div className='routingrules'>
          <ModifyrulePopup ref={ node => this.ModifyrulePopup = node } fetchData={this.fetchData.bind(this)} />
          <Tab shape='pure'>
            <Tab.Item title="路由规则">
              <div className='routingrules-content'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <Row wrap gutter="20" style={styles.formRow}>
                    <Col l="24">
                      <div style={styles.formItem}>
                        {/* <span style={styles.formLabel}>商户ID:</span>
                      <FormBinder name="merchantId"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} placeholder='单行输入' />
                      </FormBinder> */}
                        <span style={styles.formLabel}>对应渠道:</span>
                        <FormBinder name="channelId">
                          <Select style={styles.formSelect} dataSource={channellist} />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="primary" onClick={this.fetchData.bind(this)}>搜索</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>
              </div>
              <div className='routingrules-panel'>
                <Table loading={isLoading} dataSource={data} hasBorder={false}>
                  {/* primaryKey='_id' rowSelection={rowSelection}        删除 */}
                  {/* <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" /> */}
                  <Table.Column title="规则名称" dataIndex="ruleName" />
                  <Table.Column title="使用渠道" dataIndex="channelName" />
                  {/* <Table.Column title="路由规则" cell={this.renderRules} /> */}
                  <Table.Column title="状态" dataIndex="ruleSwitch" cell={this.renderOper} />
                  <Table.Column title="操作" cell={this.caozuo} />
                </Table>
                <Pagination
                  style={{ marginTop: '20px', textAlign: 'right' }}
                  current={current}
                  pageSize={pageSize}
                  total={total} // 一共多少条数据
                  onChange={this.handlePaginationChange}
                />
                {/* <Button className='' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button> */}
              </div>
            </Tab.Item>
          </Tab>
        </div>
      );
    }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  formItemTwo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  formLabel: {
    minWidth: '80px',
    marginLeft: '10px',
    textAlign: 'center',
  },
  formSelect: {
    width: '200px',
    margin: '0 10px',
  },
  formInput: {
    margin: '0 10px',
  },
  delbtn: {
    marginLeft: '20px',
  },
};
