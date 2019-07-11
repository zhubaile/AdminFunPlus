import React, { Component } from 'react';
import { Table,Button,Input,Grid ,DatePicker,Pagination,Dialog,Select } from '@alifd/next';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
// import Administrators from '../../Personal/components/Administrators/Administrators';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../../layouts/BasicLayout/components/Header/index.scss';
import { workOrderworkList,workOrderdeleteWork,workOrderworkDetails } from '@indexApi';
import '../../index.css';
import moment from "moment/moment";
// import { Dialog } from "@alifd/next/lib/index";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

/* const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      level: ['普通会员', '白银会员', '黄金会员', 'VIP 会员'][random(0, 3)],
      balance: random(10000, 100000),
      accumulative: random(50000, 100000),
      regdate: `2018-12-1${random(1, 9)}`,
      birthday: `1992-10-1${random(1, 9)}`,
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'][random(0, 2)],
      z: ['支付宝'],
    };
  });
}; */
export default class Allworkorders extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [],
      value: {
        operationtime: [],
      },
    };
  }
  /* formChange = (value) => {
    this.props.onChange(value);
  }; */
  componentDidMount() {
    this.fetchData();
  }

  /* mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据
      }, 600);
    });
  }; */

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        const operationtime = this.state.value.operationtime;
        debugger;
        workOrderworkList({
          page: pages,
          pageSize,
          beginTime: operationtime,
        }).then(({ status,data })=>{
          debugger;
          this.setState({
            datas: data.data,
            isLoading: false,
          });
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

  handleFilterChange = () => { // gengxin 5条新数据
    this.fetchData(5);
  };
  // 删除
  handleDelete = (id) => {
    debugger;
    const { datas } = this.state;
    workOrderdeleteWork({
      _id: id,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        let index = -1;
        datas.forEach((item, i) => {
          if (item._id === id) {
            index = i;
          }
        });
        if (index !== -1) {
          datas.splice(index, 1);
          this.setState({
            datas,
          });
        }
      }
    });
    /* Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    }); */
  };

  /* handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  }; */
  // 详情
  handleDetail=(id)=> {
    this.props.history.push({ pathname: "/backadmin/service/workorderdetails", state: { id } });
  /*  workOrderworkDetails({
      _id: id,
    }).then(({ status,data })=>{
      debugger;
      const work = data.data.work;
      const workDetail = data.data.workDetail;
      const workEvaluate = data.data.workEvaluate;
      debugger;
      if (data.errCode == 0) {
        this.props.history.push({ pathname: "/admin/backstageworkorder/Workorderdetails", state: { work,workDetail,workEvaluate } });
      }
    }); */
    // this.props.history.push('/admin/backstageworkorder/Workorderdetails');
  }
  // 搜索框
  searchbtn() {
    this.refs.form.validateAll((errors, values) => {
      const arrivalDate = [];
      if (values.operationtime.length == 2) {
        const startdatestart = moment(values.operationtime[0]._d).valueOf();
        const startdateend = moment(values.operationtime[1]._d).valueOf();
        arrivalDate.push(startdatestart);
        arrivalDate.push(startdateend);
      }
      const pages = this.state.current;
      const pageSizes = this.state.pageSize;
      debugger;
      workOrderworkList({
        page: pages,
        pageSize: pageSizes,
        _id: values.worknumber,
        descriptions: values.relatedcharacters,
        beginTime: arrivalDate,
      }).then(({ status,data })=>{
        debugger;
        if (data.errCode == 0) {
          this.setState({
            datas: data.data,
          });
        }
      });
    });
  }
  renderOper = (value,index,record) => {
    return (
      <div>
        <a href="javascript:;" style={{ marginRight: '3px' }} onClick={this.handleDetail.bind(this,record._id)}>详情</a>
        {/* <span>|</span>
        <a href="javascript:;" style={{ marginLeft: '3px' }} onClick={this.handleDelete.bind(this,record._id)} >删除</a> */}
      </div>
    );
  };
  // 时间转换
  time=(e)=>{
    const updatedAt = moment(e).format('YYYY-MM-DD HH:mm:ss');
    return (
      <p>{updatedAt}</p>
    );
  }
  statusoneortwo=(e)=>{
    if (e == 1) {
      return ("受理中");
    } else if (e == 2) {
      return ("已存档");
    } else if (e == 3) {
      return ("已完成");
    }
  }
  // 获取到选中的数据
  Choice(args) {
    debugger;
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { datas,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      datas.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        datas.splice(index, 1);
        this.setState({
          datas,
        });
      }
    });
  }
  render() {
    // const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    // const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const { isLoading, datas, current, total, pageSize } = this.state;
    // 多选按钮
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    return (
      <div className='backstageworkorder'>
        {/* <Nav defaultActiveKey='2' history={this.props.history} /> */}
        <div className='wodegongdan'>
          <div className='wodegongdan-top'>
            <span>全部工单</span>
            <div className='wodegongdan-top-border' />
          </div>
          <div className='wodegongdan-conter'>
            <FormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <Row wrap gutter="20">
                <Col l="24">
                  <div className='wodegongdan-conter-main'>
                    <span>企业名称：</span>
                    <FormBinder name='qiyename'>
                      <Input placeholder='请输入企业名称 ' hasClear />
                    </FormBinder>
                    <span>操作时间：</span>
                    <FormBinder name='operationtime'>
                      {/* <DatePicker /> */}
                      <RangePicker />
                      {/* <RangePicker showTime resetTime defaultValue={[startValue,endValue]} /> defaultValue={startValue}  */}
                    </FormBinder>
                    <span>工单编号：</span>
                    <FormBinder name='worknumber'>
                      <Input placeholder='输入编号' hasClear />
                    </FormBinder>
                    <span>工单状态：</span>
                    <FormBinder name='relatedcharacters'>
                      {/* dataSource={orderStatus} */}
                      <Select style={styles.formSelect} />
                    </FormBinder>
                    <button className='searchbtn'>搜索</button>
                    <button className='searchbtn'>重置</button>
                    {/* <Button className='btn-all bg' size="large" type="secondary" onClick={this.searchbtn.bind(this)}>搜索</Button>
                    <Button className='btn-all bg' size="large" type="secondary" onClick={this.searchbtn.bind(this)}>重置</Button> */}
                  </div>
                </Col>
              </Row>
            </FormBinderWrapper>
          </div>
          <div className='wodegongdan-footer'>
            <Table loading={isLoading} dataSource={datas} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
              <Table.Column title="工单编号" dataIndex="_id" />
              <Table.Column title="描述" dataIndex="description" />
              <Table.Column title="优先级" dataIndex="level" />
              <Table.Column title="企业名称" dataIndex="title" />
              <Table.Column title="提交账号" dataIndex="account" />
              <Table.Column title="状态" dataIndex="status" cell={this.statusoneortwo} />
              <Table.Column title="创建时间" dataIndex="createdAt" cell={this.time} />
              <Table.Column
                title="操作"
                width={200}
                dataIndex="oper"
                cell={this.renderOper}
              />
            </Table>
            <button className='removebtn' onClick={this.removes.bind(this)}>刪除</button>
            <Pagination
              style={styles.pagination}
              current={current}
              onChange={this.handlePaginationChange}
              pageSize={pageSize} // 界面展示多少条数据
              total={total} // 一共多少条数据
            />
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formSelect: {
    width: '200px',
  },
};
