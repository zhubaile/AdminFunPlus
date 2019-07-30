/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch,Radio } from '@alifd/next';
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
      result: [],
      roless: [],
      args: [],
      value: {
        cpId: '',
        cpName: '',
        roles: '',
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
            const kkk = data.data.role;
            const roles = kkk.map(item=>({ value: item.roleName, label: item.description }));
            this.setState({
              isLoading: false,
              result: data.data.result,
              roless: roles,
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
    renderStatus = (datas) => {
      return (
        <div>
          <Radio id="enabled" value="enabled" checked={datas.enabled} >{datas.enabledName}</Radio>
        </div>
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
      const { result,args } = this.state;
      debugger;
      let index = -1;
      args.map((id)=>{
        result.forEach((item, i) => {
          if (item._id === id) {
            index = i;
          }
        });
        if (index !== -1) {
          result.splice(index, 1);
          this.setState({
            result,
          });
        }
      });
    }
    // 添加成员
    addmemberBtnOpen() {
      const adds = this.state.roless;
      debugger;
      this.Addmenber.addmemberopen(adds);
    }
  // 编辑
    editmemberBtnOpen(record) {
      const adds = this.state.roless;
      const id = record._id;
      debugger;
      this.Addmenber.addmemberopen(adds,id,record);
    }
  resetBtnOpen=(id)=> {
    debugger;
    this.Resetpassword.resetPasswordopen(id);
  }
  // 搜索框
  searchbtn() {
    this.setState(
      {
        isLoading: true,
      },()=>{
        this.refs.form.validateAll((errors, values) => {
          debugger;
          const pages = this.state.current;
          const pageSizes = this.state.pageSize;
          searchUserList({
            cpId: values.cpId,
            cpName: values.cpName,
            roleName: values.roleName,
            keyword: values.keyword,
            page: pages,
            pageSize: pageSizes,
          }).then(({ status,data })=>{
            debugger;
            if (data.errCode == 0) {
              this.setState({
                isLoading: false,
                result: data.data.result,
                total: data.data.totalCount,
              });
            }
          });
        });
      });
  }
  // search() {
  //   const values = this.state.value;
  //   this.fetchData(values);
  // }
  renderOper = (value,index,record) => {
    return (
      <div className='tb_span'>
        <span onClick={this.editmemberBtnOpen.bind(this,record)}>编辑</span>
        <span onClick={this.resetBtnOpen.bind(this, record._id)}>重置密码</span>
        <span onClick={this.addmemberBtnOpen.bind(this, record._id)}>添加成员</span>
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
    const { isLoading, data, current,pageSize,total,roless, result } = this.state;
    const roleName = roless;
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };

    return (
      <div className='membermanagement'>
        <Resetpassword ref={ node => this.Resetpassword = node } fetchData={this.fetchData.bind(this)} />
        <Addmember ref={ node => this.Addmenber = node } fetchData={this.fetchData.bind(this)} />
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
                      <FormBinder name="roleName"
                        autoWidth={false}
                      >
                        <Select mode="multiple" style={styles.formSelect} dataSource={roleName} />
                      </FormBinder>
                      <FormBinder name="keyword" autoWidth={false}>
                        <Input hasClear placeholder='支持姓名邮箱手机号' style={styles.formInput} />
                      </FormBinder>
                      <Button className='btn-all bg' size="large" type="primary" onClick={this.searchbtn.bind(this)}>搜索</Button>
                      {/* <Button className='btn-all bg' size="large" type="secondary" onClick={this.addmemberBtnOpen.bind(this)}>添加成员</Button> */}
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='membermanagement-panel'>
              <Table loading={isLoading} dataSource={result} hasBorder={false} primaryKey='_id' rowSelection={rowSelection }>
                <Table.Column title="商户ID" dataIndex="cpId" />
                <Table.Column title="企业名称" dataIndex="cpName" />
                <Table.Column title="姓名" dataIndex="name" />
                <Table.Column title="用户名" dataIndex="username" />
                <Table.Column title="联系方式" dataIndex="phone" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="所属角色" dataIndex="roleName" />
                <Table.Column title="上次登录时间" dataIndex="lastTime" />
                <Table.Column
                  title="状态"
                  dataIndex="enabled"
                  cell={this.renderStatus}
                />
                <Table.Column title="操作" dataIndex="" cell={this.renderOper} />
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
