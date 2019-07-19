/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { Input, Radio, Tab , Button, Grid, Form, DatePicker,Table,Pagination,Message } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
/*import Customerservice from "../components/Customerservice";*/
import Newrole from "./NewRole";
import Editingrole from "./EditingRole";
import { roleList, userDelete, deleteRolePms } from '@indexApi';

import '../../index.css';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      name: ['肖悦'],
      level: ['12345678@qq.com'],
      rule: ['136123456'],
      oper: ['撒打发斯蒂芬'],
      role: ['系统管理员'],
      zhuangtai: [false,'已激活'],
      description: ['在应用中拥有所有操作权限'],
    };
  });
};
@withRouter
class Rolepermissions extends Component {
  static displayName = 'Rolepermissions';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        quanbuyingyong: '0',
        jiaose: '0',
        haoma: '',
      },
      total: 0, // 总数据
      pageSize: 10, // 一页条数
      current: 1, // 页码
      isLoading: false,
      datas: [],
      premissions: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  /* mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
      }, 600);
    });
  }; */

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        /* this.mockApi(len).then((data) => { // data 里面为数据
          this.setState({
            data,
            isLoading: false,
          });
        }); */
        const pages = this.state.current;
        const pageSize = this.state.pageSize;
        roleList({
          page: pages,
          pageSize,
        }).then(({ status,data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              premissions: data.data.premissions,
              datas: data.data.role,
              isLoading: false,
              total: data.data.totalCount,
            });
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
  /*  formChange=(value)=>{
    debugger;
  } */
  /* // 状态的值
  renderOper = (datas) => {
    const z = datas[0];
    return (
      <div>
        <Radio id="shiduide" value="shiduide" checked={z} >{datas[1]}</Radio>
        {/!* <Radio id="shiduide" value="shiduide" checked={false}>--</Radio> *!/}
      </div>
    );
  }; */
  // 新增角色
  newrolebtnopen() {
    const premissions = this.state.premissions;
    this.Newrole.newroleopen(premissions);
  }
  // 修改
  editingrolebtnopen=(record)=> {
    const premissions = this.state.premissions;
    debugger;
    this.Editingrole.cancelbtnopen(record,premissions);
  }
  // 删除
  onRemove = (id) => {
    const { datas } = this.state;
    debugger;
    deleteRolePms({
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
      Message.success(data.message);
    });
  };
  renderOper = (value,index,record) => {
    return (
      <div>
        <a
          style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px', borderRight: '2px solid #999999' }}
/*          onClick={this.handleDetail} */
          onClick={this.editingrolebtnopen.bind(this,record)}
        >
          修改
          {/* <FormattedMessage id="app.btn.detail" /> */}
        </a>
        <a
          style={{ color: 'rgba(26, 85, 226, 1)', padding: '0px 5px' }}
          onClick={this.onRemove.bind(this, record._id)}
        >
          <FormattedMessage id="app.btn.delete" />
        </a>
      </div>
    );
  };
  // 状态
   renderStatus = (datas) => {
     debugger;
     /*    */
     return (
       <div>
         <Radio id="status" value="status" checked={datas.enabled} >{datas.enabledName}</Radio>
       </div>
     );
   };
   render() {
     const { isLoading, datas, current, total } = this.state;
     const {
       intl: { formatMessage },
     } = this.props;

     const quanbuyingyong = [
       { value: '0', label: '全部应用' },
       { value: '1', label: '部分' },
     ];
     const jiaose = [
       { value: '0', label: '角色' },
       { value: '1', label: '人' },
     ];
     return (
       <div className='membermanagement'>
         <Newrole ref={node=>this.Newrole = node} fetchData={this.fetchData.bind(this)} />
         <Editingrole ref={node=>this.Editingrole = node} />
         <Tab shape='pure'>
           <Tab.Item title="角色权限">
             <div className='membermanagements-top'>
               <div className='membermanagement-bottom-top'>
                 <button className='mybtn Newrole' onClick={this.newrolebtnopen.bind(this)}>新增角色</button>
               </div>
               <Table loading={isLoading} dataSource={datas} hasBorder={false}>
                 <Table.Column title="角色" dataIndex="description" />
                 <Table.Column
                   title="说明"
                   dataIndex="notes"
                 />
                 <Table.Column
                   title="状态"
                   dataIndex="enabled"
                   cell={this.renderStatus}
                 />
                 {/*                <Table.Column title="操作" dataIndex="caozuo" /> */}
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
                 pageSize={10} // 界面展示多少条数据
                 total={total} // 一共多少条数据
               />
             </div>
           </Tab.Item>
         </Tab>
{/*         <Customerservice />*/}
       </div>
     );
   }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  forminput: {
    width: '200px',
    marginLeft: '20px',
  },
};

export default injectIntl(Rolepermissions);
