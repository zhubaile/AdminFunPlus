import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { changeRolePms } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;
const items = [];

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 6 },
  wrapperCol: { s: 12, l: 14 },
};
export default class Newrole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        description: '',
        notes: '',
        premissions: [],
      },
      open: false,
      content: [],
      premission: null,

    };
  }

  newroleclose() {
    this.setState({
      open: false,
      content: [],
    });
  }
  newroleopen(content,premission) {
    debugger;
    // const values = Object.assign({},this.state.value,{ premissions: content.premissions }); // name 的值需要替换
    this.setState({
      open: true,
      content,
      premission,
    });
    this.confirmCallBack = confirm;
  }
  /*  formChange = (value) => {
    this.setState({
      value,
    });
  }; */
  // 提交
  SubInvoiceinfo() {
    const id = this.state.content._id;
    const premissions = this.state.content.premissions;
    const descriptionval = this.description.getInputNode().value;
    console.log(this.notes);
    const notesval = this.notes.getInputNode().value;
    debugger;
    changeRolePms({
      _id: id,
      premissions,
      description: descriptionval,
      notes: notesval,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.newroleclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  // 更改选中的权限
  checkoutbtn(v,e) {
    let zzzz = this.state.content.premissions;
    debugger;
    const id = e.target.id;
    if (zzzz.indexOf(id) > -1) {
      zzzz = zzzz.filter(n => n !== id);
      const values = Object.assign({},this.state.content,{ premissions: zzzz }); // name 的值需要替换
      this.setState({
        content: values,
      });
    } else {
      zzzz.push(id);
      const values = Object.assign({},this.state.content,{ premissions: zzzz }); // name 的值需要替换
      this.setState({
        content: values,
      });
    }
  }
  render() {
    const { content, premission } = this.state;
    const premissionss = content.premissions; // 选中的所有权限
    if (!this.state.open) return null;
    return (
      <div className='newrole-bulletbox'>
        <div className='newrole-title'>
          <h2 style={{ display: 'inline-block', fontSize: '18px' }}>编辑角色</h2>
          <span style={styles.cha} onClick={this.newroleclose.bind(this)}>×</span>
        </div>
        <div className='newrole-content'>
          <div>
            <label>角色名称</label>
            <Input
              name="description"
              placeholder=""
              disabled
              defaultValue={content.description}
              ref={node=>this.description = node}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>角色描述</label>
            <Input
              name="notes"
              placeholder=''
              defaultValue={content.notes}
              ref={node=>this.notes = node}
            />
          </div>

          {/*            <FormItem
              label='账户面板权限'
              {...formItemLayout}
            > */}
          <div>
            {
                  premission.map((item)=>{
                    return (
                      <div className='premissions_li'>
                        <Checkbox name='premissions' defaultChecked={premissionss.includes(item._id)} id={item._id} style={{ marginLeft: '5px' }} onChange={this.checkoutbtn.bind(this)}>{item.description}</Checkbox>
                      </div>
                    );
                  })
                }
          </div>
          <div className='newbulletbox_btn'>
            <Button className='btn-all' type='secondary' size='large' style={styles.submitbtn} onClick={this.newroleclose.bind(this)}>取消</Button>
            <Button type='primary' size='large' style={styles.submitbtn} onClick={this.SubInvoiceinfo.bind(this)}>提交</Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  cha: {
    fontSize: '38px',
    color: '#666666',
    float: 'right',
    cursor: 'pointer',
  },
  submitbtn: {
    width: '76px',
    margin: '0 10px',
  },
};
