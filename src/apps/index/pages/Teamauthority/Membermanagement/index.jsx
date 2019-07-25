/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { searchUserList } from '@indexApi';
import '../../index.css';
import Addmember from "./Addmember/index";
import Resetpassword from "./Resetpassword/index";
import { Message } from "@alifd/next/lib/index";

// const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
//
// const getData = (length = 10) => {
//   return Array.from({ length }).map(() => {
//     return {
//       _id: random(10000, 20000, 30000, 50025, 68522),
//       merchantId: '000662',
//       name: ['有此山'],
//       time: '连岳',
//       order: '01',
//       remark: '系统管理',
//       balance: '2019.6.11 11:36',
//       email: ['78@qq.com'],
//       tel: ['136000'],
//       role: [''],
//       status: '',
//       oper: [''],
//     };
//   });
// };
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Membermanagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      total: 0,
      current: 1,
      isLoading: false,
      data: [],
      role: [],
      args: [],
      value: {
        cpId: '',
        cpName: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }


  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize;
        const page = this.state.current;
        searchUserList({
          pageSize,
          page,
          ...len,
        }).then(({ status, data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              isLoading: false,
              role: data.data.role,
              total: data.data.totalCount,
            });
          } else {
            Message.success(data.message);
          }
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
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  renderStatus = () => {
    return (
      <span>正常</span>
    );
  };
  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    },);
  }
  // 删除方法
  removes() {
    const { role,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      role.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        role.splice(index, 1);
        this.setState({
          role,
        });
      }
    });
  }
  addmemberBtnOpen() {
    this.Addmenber.addmemberopen();
  }

  resetBtnOpen() {
    this.Resetpassword.resetPasswordopen();
  }
  search() {
    const values = this.state.value;
    this.fetchData(values);
  }
  renderOper = () => {
    return (
      <div className='tb_span'>
        <span>编辑</span>
        <span onClick={this.resetBtnOpen.bind(this)}>重置密码</span>
        <span onClick={this.addmemberBtnOpen.bind(this)}>添加成员</span>
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
  render() {
    const { isLoading, data, current,pageSize,total,role } = this.state;
    const roleName = [
      { value: '系统管理员', label: '系统管理员' },
    ];
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };

    return (
      <div className='membermanagement'>
        <Resetpassword ref={ node => this.Resetpassword = node } />
        <Addmember ref={ node => this.Addmenber = node } />
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="成员管理">
            <div className='membermanagement-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="cpId">
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <span style={styles.formLabel}>企业名称:</span>
                      <FormBinder name="cpName"
                        autoWidth={false}
                      >
                        <Input style={styles.formInput} />
                      </FormBinder>
                      <span style={styles.formLabel}>角色名称:</span>
                      <FormBinder name="description"
                        autoWidth={false}
                      >
                        <Select style={styles.formSelect} dataSource={roleName} />
                        {/*<Input style={styles.formInput} />*/}
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary" onClick={this.search.bind(this)}>搜索</Button>
                      {/* <Button className='btn-all bg' size="large" type="secondary" onClick={this.addmemberBtnOpen.bind(this)}>添加成员</Button> */}
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='membermanagement-panel'>
              <Table loading={isLoading} dataSource={role} hasBorder={false} primaryKey='_id' rowSelection={rowSelection }>
                <Table.Column title="商户ID" dataIndex="cpId" />
                <Table.Column title="企业名称" dataIndex="cpName" />
                <Table.Column title="姓名" dataIndex="time" />
                <Table.Column title="用户名" dataIndex="order" />
                <Table.Column title="联系方式" dataIndex="tel" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="所属角色" dataIndex="description" />
                <Table.Column title="上次登录时间" dataIndex="balance" />
                <Table.Column title="状态" dataIndex="role" cell={this.renderStatus} />
                <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize}
                total={total}
              />
              <Button className='' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
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
