/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch, Overlay,Icon } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '',
      name: 'admin',
      number: '1',
      size: '5.2KB',
      time: '2019.06.06 17:13:26',
      order: '1.0',
      remark: '2.0',
      balance: '',
      email: [''],
      tel: [''],
      role: [''],
      status: '',
      oper: [''],
      _id: random(10000, 20000, 30000, 50025, 68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const rules = [
  { value: '1', label: '1' },
];
export default class Platforminitialization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: 1,
      isLoading: false,
      data: [],
      args: [],
      value: {
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
      },
    };
  }
onClear = () => {
  this.setState({
    visible: true,
  });
}
onClose = () => {
  this.setState({
    visible: false,
  });
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
      <div className='tb_span'>
        {/* <Select dataSource={rules} /> */}
        <span>备份</span>
        <div className="ver_line" />
        <span>还原</span>
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
  Choice(args) {
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
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
  }
  render() {
    const { isLoading, data, current } = this.state;
    const corChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };
    return (
      <div className='platformversion'>
        <div className='personal-top'>
          <span>平台初始化及系统搬家</span>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <Button className="btn-all" size='large' type='secondary'>数据转移</Button>
            <Button className="btn-all" size='large' type='secondary' style={{ marginLeft: '20px' }} onClick={this.onClear} ref={ ref => this.btn = ref }>清除数据</Button>
          </div>
          <div className='personal-top-border' />
          <Overlay visible={this.state.visible}
            safeNode={() => this.btn}
            align="cc cc"
            hasMask
            disableScroll
            onRequestClose={this.onClose}
          >
            <span className="overlay-demo">
              <h3><Icon type='success-filling' style={{ color: '#037cf8', marginRight: '10px' }} />清除成功</h3>
              <p>页面自动<span style={{ color: '#037cf8', padding: '10px' }}>跳转</span>等待时间：3</p>
            </span>
          </Overlay>
        </div>


        <div className='platformversion-content'>
          <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
            <Table.Column title="表名" dataIndex="name" />
            <Table.Column title="数量" dataIndex="number" />
            <Table.Column title="大小" dataIndex="size" />
            <Table.Column title="创建时间" dataIndex="time" />
            {/*                <Table.Column title="当前版本号" dataIndex="remark" /> */}
            <Table.Column title="操作" cell={this.renderOper} />
          </Table>
          <div className='check-box'>
            <Checkbox>一键备份</Checkbox>
            <Checkbox>一键还原</Checkbox>
          </div>

        </div>
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
