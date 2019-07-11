/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import ModifyrulePopup from './ModifyrulePopup';
import '../../../index.css';
import SetNewPassword from "../../../../../Login/pages/SetNewPassword/index";

const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['花果山'],
      time: '20190606',
      order: '支付宝手机跳转专用',
      remark: ['支付宝'],
      balance: '￥100.00',
      email: ['支付中'],
      tel: ['￥100.00'],
      role: [' ￥100.00'],
      status: '支付宝wap',
      oper: ['查看'],
    };
  });
};
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
      isLoading: false,
      data: [],
      value: {
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
      },
    };
  }

  componentDidMount() {
    debugger;
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
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
          debugger;
          this.setState({
            data,
            isLoading: false,
          });
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

  renderRules = () => {
    return (
      <div>
        <Select dataSource={rules} />
      </div>
    );
  }
  renderOper = () => {
    return (
      <div>
        <a onClick={this.consultationpopup.bind(this)}>修改</a>
        {/*<Switch size='small' className='div-switch' defaultChecked={false} />*/}
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
    this.props.onChange(value);
  };
  consultationpopup() {
    this.ModifyrulePopup.Routingopen();
  }
  render() {
    const { isLoading, data, current } = this.state;
    const corChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    return (
      <div className='routingrules'>
        <ModifyrulePopup ref={ node => this.ModifyrulePopup = node } />
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
                      <span style={styles.formLabel}>商户ID:</span>
                      <FormBinder name="merchantId"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} placeholder='单行输入' />
                      </FormBinder>
                      <span style={styles.formLabel}>对应渠道:</span>
                      <FormBinder name="name"
                        autoWidth={false}
                      >
                        <Select style={styles.formSelect} dataSource={corChannel} />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary">搜索</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='routingrules-panel'>
              <Table loading={isLoading} dataSource={data} hasBorder={false}>
                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                />
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="规则名称" dataIndex="order" />
                <Table.Column title="使用渠道" dataIndex="remark" />
                <Table.Column title="路由规则" cell={this.renderRules} />
                <Table.Column title="状态" dataIndex="status" />
                <Table.Column title="操作" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
              />
              <Button className='' size='large' type='primary' style={styles.delbtn}>删除</Button>
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
