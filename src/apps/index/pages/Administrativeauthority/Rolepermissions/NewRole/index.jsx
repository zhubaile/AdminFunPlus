/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Button, Message, Form, Select, Checkbox } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { addRolePms } from '@indexApi';
import '../../../index.css';

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;
const items = [];
export default class Newrole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        description: '',
        notes: '',
        premissions: [],
        /*        phone: '',
        pass: '',
        password: '',
        beizhu: '',
        yingyong: '全部应用',
        jiaose: '选择角色', */
      },
      open: false,
      content: null,
      payvalue: '',
    };
  }
  newroleclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  newroleopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  // 新增角色权限
  addnewrole() {
    this.refs.form.validateAll((errors, values) => {
      addRolePms({
        ...values,
      }).then(({ status,data })=>{
        if (data.errCode == 0) {
          Message.success(data.message);
          this.newroleclose();
          this.props.fetchData();
        }
        Message.success(data.message);
      });
    });
  }
  // 复选框选择的_id
  checkoutbtn(v,e) {
    if (v == true) {
      // const name = e.target.name;
      const _id = e.target.id;
      items.push(_id);
      console.log(items);
      const values = Object.assign({},this.state.value,{ premissions: items }); // name 的值需要替换
      this.setState({
        value: values,
      });
    }
  }
  render() {
    if (!this.state.open) return null;
    const { content } = this.state;
    console.log(this.state.content);
    console.log(content);
    return (
      <div className="newrole">
        <h2>新增角色</h2>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <label>角色名称</label>
            <FormBinder name="description"
              autoWidth={false}
            >
              <Input hasClear placeholder='角色名称' />
            </FormBinder>
          </div>
          <div>
            <label>权限说明</label>
            <FormBinder name='notes' >
              <Input hasClear placeholder='角色说明' />
            </FormBinder>
          </div>
          {
            content.map((item)=>{
              return (
                <FormBinder name='premissions'>
                  <Checkbox name={item.pmsName} id={item._id} style={{ marginLeft: '5px' }} onChange={this.checkoutbtn.bind(this)}>{item.description}</Checkbox>
                </FormBinder>
              );
            })
          }
          <div className='newrole-btn'>
            <Button type='secondary' style={styles.cancelbtn} onClick={this.newroleclose.bind(this)}>取消</Button>
            <Button type='primary' style={styles.submitbtn} onClick={this.addnewrole.bind(this)}>提交</Button>
          </div>
        </FormBinderWrapper>


      </div>
    );
  }
}

const styles = {
  cancelbtn: {
    display: 'inline-block',
    margin: '10px 20px 20px 40px',
    /*    position: 'absolute',
    left: '100px',
    bottom: '15px', */
    width: '80px',
    height: '30px',
    backgroundColor: 'rgba(255, 159, 159, 1)',
    color: 'rgba(255, 255, 255, 1)',
    border: 'none',
    borderRadius: '5px',
  },
  submitbtn: {
    display: 'inline-block',
    margin: '10px 40px 20px 20px',
    /*    position: 'absolute',
    right: '40px',
    bottom: '15px', */
    width: '80px',
    height: '30px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    border: 'none',
    borderRadius: '5px',
  },
};
