import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { device } from '@indexApi';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;
const { Row, Col } = Grid;

// 将要发送的数据的值清空
function filterForm(obj) {
  const temp = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      temp[key] = {};
      for (const keyTwo in obj[key]) {
        if (obj[key][keyTwo] instanceof Object) {
          const tempTwo = obj[key][keyTwo];
          if (tempTwo.tag === 'select') {
            temp[key][keyTwo] = tempTwo.value[0];
          } else {
            temp[key][keyTwo] = '';
          }
        } else {
          temp[key] = '';
        }
      }
    }
  }
  return temp;
}

export default class Official extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, // 界面开关
      content: [], // 原始数据
      value: [], // 更新要发送的数据
      dGroupID: '', // 设备ID
    };
    this.handelChange = this.handelChange.bind(this);
  }
  componentDidMount() {}

  // 关闭弹框
  officialclose() {
    this.setState({
      open: false,
      value: null,
    });
  }
  // 打开弹框
  officialopen(content,confirm) {
    debugger;
    const value = filterForm(content.form);
    this.setState({
      open: true,
      content,
      value,
      dGroupId: confirm,
    });
    this.confirmCallBack = confirm;
  }
  // 表单监听
  /* formChange = (value,item) => {
      debugger;
      // 说明：
      //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
      //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
      this.setState({ value });
    }; */
  // 添加设备的点击事件
  handleSubmit() {
    const values = this.state.value; // 输入框的值
    const dGroupId = this.state.dGroupId; // 设备ID
    debugger;
    device({
      ...values,
      dGroupId,
    }).then(
      ({ status,data })=>{
        debugger;
        if (data.errCode == 0) {
          this.officialclose();
          Message.success(data.message);
        }
        Message.success(data.message);
      }
    );
  }

  // 动态加载类型的判断
  switchItem(key, item) {
    const tag = item.tag;
    if (key === 'channelName' || key === 'paramsType') { // 样式特别处理
      return (
        <div>
          <FormItem required requiredMessage={item.errDesc}>
            {/* <Input htmlType={item.type} style={styles.formbinderbox} value={item.label} readOnly={item.readOnly} name={key} onChange={this.handelChange} /> */}
            <input type={item.type} style={styles.formbinderbox} value={item.label} min={item.min} name={key} readOnly={item.readonly} onChange={this.handelChange} />
          </FormItem >
          {/*  <FormError style={styles.formItemError} name={key} /> */}
        </div>
      );
    }
    switch (tag) {
      case 'input':
        return (
          <FormItem required requiredMessage={item.errDesc}>
            {/* <Input htmlType={item.type} style={styles.formbinderbox} placeholder={item.placeholder} readOnly={item.readOnly} min={item.min} name={key} onChange={this.handelChange} /> */}
            <input type={item.type} style={styles.formbinderbox} placeholder={item.placeholder} min={item.min} name={key} onChange={this.handelChange} />
          </FormItem>
        );
        break;
      case 'textarea':
        return (
          <FormItem required requiredMessage={item.errDesc}>
            {/* <Input.TextArea style={styles.formbinderbox} placeholder={item.placeholder} name={key} onChange={this.handelChange} /> */}
            <textarea name={key} cols={30} rows={10} placeholder={item.placeholder} onChange={this.handelChange} />
          </FormItem>
        );
        break;
      case 'select':
        return (
          <FormItem required requiredMessage={item.errDesc}>
            {/* <span>{item.label}</span> */}
            <select style={styles.officialrightsele} name={key} onChange={this.handelChange}>
              {
                item.value.map((option, index) => {
                  return (<option key={index} value={option.value} selected={option.value}>{option.label}</option>);
                })
              }
            </select>
            {/* <Select style={styles.officialrightsele} dataSource={item.value} name={key} onChange={this.handelChanges.bind(this)} /> */}
          </FormItem>
        );
        break;
      default:
        break;
    }
  }
  // 动态加载数据
  renderForm() {
    const items = [];
    const formDatas = this.state.content;
    const formData = formDatas.form;
    console.log(formData);
    for (const key in formData) {
      if (key === 'channelParams') {
        for (const keyTwo in formData[key]) {
          items.push(<div key={key + keyTwo}><label>{ formData[key][keyTwo].label } </label> { this.switchItem(`${key}.${keyTwo}`, formData[key][keyTwo]) }</div>);
        }
      }
      items.push(<div key={key}><label>{ formData[key].label } </label> { this.switchItem(key, formData[key]) }</div>);
    }
    return items;
  }
  // 数据框onChange输入事件
  handelChange(e) {
    var value = e.target.value;
    let keys = e.target.name;
    try {
      if (value.toString() === 'true') {
        value = true;
      } else if (value.toString() === 'false') {
        value = false;
      }
    } catch (error) {

    }
    keys = keys.split('.');
    const form = this.state.value;
    if (keys.length === 2) {
      debugger;
      // form[keys[0]] = {}
      form[keys[0]][keys[1]] = value;
      this.setState({
        value: form,
      });
    } else if (keys.length === 1) {
      form[keys[0]] = value;
      this.setState({
        value: form,
      });
    }
  }
  /*
* try{
      if(value.toString() === 'true'){
        value = true
      } else if (value.toString() === 'true'){
        value = false
      }
    }catch (error){

    }
* */
  render() {
    console.log(this.state.content);
    if (!this.state.open) return null;
    return (
      <div className='official'>
        {/* onChange={this.formChange} */}
        <Form value={this.state.value} onChange={this.formChange} ref="form" className='offocoal-main'>
          <h2>添加设备-官方参数</h2>
          {this.renderForm()}
          <div className='officialbtn'>
            <button style={styles.bottombtn}>查看填写参数</button>
            <div className='officialbtn-right'>
              {/* <Button onClick={this.handleSubmit.bind(this)}>tianjia</Button> */}
              <FormItem label=" ">
                <Form.Submit validate onClick={this.handleSubmit.bind(this)}>添加</Form.Submit>
                <Form.Reset onClick={this.officialclose.bind(this)}>取消</Form.Reset>
              </FormItem>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    height: '30px',
    margin: '5px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  officialleftsele: {
    width: '50px',
  },
  officialrightsele: {
    width: '100px',
    marginLeft: '5px',
  },
  bottombtn: {
    marginTop: '10px',
  },
};
