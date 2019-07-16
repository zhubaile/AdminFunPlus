/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '',
      name: 'API接口',
      time: '',
      order: '1.0',
      remark: '2.0',
      balance: '',
      email: [''],
      tel: [''],
      role: [''],
      status: '',
      oper: [''],
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const rules = [
  { value: '1.0', label: '1.0' },
  { value: '2.0', label: '2.0' },
];
export default class Platformversion extends Component {
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

  renderOper = () => {
    return (
      <div>
        <Select dataSource={rules} />
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
  render() {
    const { isLoading, data, current } = this.state;
    const corChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    return (
      <div className='platformversion'>
        <Tab shape='pure'>
          <Tab.Item title="平台版本">
            <div className='platformversion-content'>
              <Table loading={isLoading} dataSource={data} hasBorder={false}>
                <Table.Column title="模块名称" dataIndex="name" />
                <Table.Column title="历史版本号" dataIndex="order" />
                <Table.Column title="当前版本号" dataIndex="remark" />
                <Table.Column title="操作" cell={this.renderOper} />
              </Table>
{/*              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
              />*/}
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
