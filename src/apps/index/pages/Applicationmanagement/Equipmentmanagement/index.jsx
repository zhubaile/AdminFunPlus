/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch,Message } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Addgrouping from './Addgrouping';
import Official from './Adddevice/official';
import Custom from './Adddevice/custom';
import { deviceGrouplist,devicelist,deviceget } from '@indexApi';
import '../../index.css';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class EquipmentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      pageSize: 10,
      current: 1,
      isLoading: false,
      datas: [],
      args: [],
      toplist: false,
      listValue: '状态/全部',
      grouplistdata: [
        { dGroupName: '' },
      ],
      value: {
        dName: '',
      },
    };
  }

  componentDidMount() {
    // this.Toupdatelist();
    this.fetchData();
  }

  // 获取分组列表
  /* Toupdatelist=()=>{
    deviceGrouplist().then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.setState({
            grouplistdata: data.data,
          });
        }
        // Message.success(data.message);
      }
    );
  }; */

  fetchData = (values) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const page = this.state.current;
        const limit = this.state.pageSize;
        devicelist({
          page,
          limit,
          ...values,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              datas: data.data.list,
              isLoading: false,
              total: data.data.total,
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
  // 搜索
  searchBtn() {
    const { validateFields } = this.refs.form;
    validateFields((errors,values)=>{
      debugger;
      this.fetchData(values);
    });
  }
  // 编辑
  editbtn(record) {
    deviceget({
      dId: record._id,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.Official.officialopen(data.data,record.dGroupId,record._id);
      } else {
        Message.success(data.message);
      }
    });
  }
  renderOper = (value,index,record) => {
    return (
      <div>
        <a onClick={this.editbtn.bind(this,record)}>
          编辑
        </a>
      </div>
    );
  };
  /* formChange = (value) => {
    this.props.onChange(value);
  }; */
  selectstart=(value)=>{
    this.setState({
      listValue: value,
    });
  }
  renderStatus = () => {
    return (
      <p>可使用</p>
    );
  };
  // 添加分组
  /*  groupingopen() {
    this.Addgrouping.addgroupingopen();
  } */
  // 获取分组列表
  /*  grouplist() {
    this.setState({
      toplist: !this.state.toplist,
    });
  } */
  // 获取设备参数
  /* deviceopen(id) {
    console.log(id);
    deviceparams({
      dGroupId: id,
    }).then(
      ({ status, data }) => {
        if (data.errCode == 0) {
          this.grouplist();
          this.Official.officialopen(data.data,id);
        } else {
          Message.success(data.message);
        }
      }
    );
  } */
  // 时间转换
  createdAt=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  render() {
    const { isLoading, datas, current,pageSize,total } = this.state;
    const Allstatus = [
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
      { value: '日限满额', label: '日限满额' },
    ];
    const statusBtn = (
      <Select onChange={this.selectstart} placeholder={this.state.listValue} dataSource={Allstatus} />
    );
    const grouplistdata = this.state.grouplistdata;
    const equipmentlist = (
      <ul className="event-list">
        {
          grouplistdata.map((item,key)=>{
            return (
              <li key={key}>
                <p>{item.dGroupName}</p>
                <button onClick={()=>this.deviceopen(item._id)}>添加设备</button>
              </li>
            );
          })
        }
      </ul>
    );
    return (
      <div className='equipmentmanagement'>
        {/* <Addgrouping ref={(node=>this.Addgrouping = node)} Toupdatelist={this.Toupdatelist} /> */}
        <Official ref={(node=>this.Official = node)} fetchData={this.fetchData.bind(this)} />
        {/* <Custom ref={(node=>this.Custom = node)} /> */}
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="设备管理">
            <div className='equipmentmanagement-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      {/*  <span style={styles.formLabel}>商户ID:</span>
                      <FormBinder name="merchantId">
                        <Input style={styles.formInput} />
                      </FormBinder> */}
                      <span style={styles.formLabel}>设备名称:</span>
                      <FormBinder name="dName">
                        <Input style={styles.formInput} />
                      </FormBinder>
                      {/*   <span style={styles.formLabel}>设备ID:</span>
                      <FormBinder name="name">
                        <Input style={styles.formInput} />
                      </FormBinder> */}
                      <Button className='btn-all bg' size="large" type="primary" onClick={this.searchBtn.bind(this)}>搜索设备</Button>
                      {/*   <Button className='btn-all bg' size="large" type="secondary" onClick={this.grouplist.bind(this)}>分组列表</Button>
                      <Button className='btn-all bg' size="large" type="secondary" onClick={this.groupingopen.bind(this)}>编辑分组</Button>
                      <div className={this.state.toplist ? ('devicemanagement-top-list opicty') : ('devicemanagement-top-list')} >
                        {equipmentlist}
                         // <button className='devicemanagement-top-list-btn' onClick={this.closetoplist.bind(this)}>关闭列表</button>
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='equipmentmanagement-panel'>
              <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                <Table.Column title="创建时间" dataIndex="createdAt" cell={this.createdAt} />
                <Table.Column title="应用ID" dataIndex="appId" />
                <Table.Column title="设备分组" dataIndex="dGroupName" />
                <Table.Column title="设备名称" dataIndex="dName" />
                <Table.Column title="设备ID" dataIndex="_id" />
                <Table.Column title="今日流水/笔" dataIndex="todayFlow" />
                <Table.Column title="昨日流水/笔" dataIndex="yeTodayFlow" />
                <Table.Column title="累计流水/笔" dataIndex="totalFlow" />
                {/* cell={this.renderRule}  */}
                <Table.Column title={statusBtn} dataIndex="2" />
                <Table.Column title="类型" dataIndex="classify" width={120} />
                <Table.Column
                  title="操作"
                  dataIndex="oper"
                  cell={this.renderOper}
                />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize}
                total={total}
              />
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
