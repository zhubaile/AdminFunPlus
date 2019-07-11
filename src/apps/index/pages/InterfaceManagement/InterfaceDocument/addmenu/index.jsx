import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
export default class addmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: {
        NewRuleName: '',
        ApplicationChannel: '支付宝渠道',
        equipmentgroup: '支付宝专用设备组3',
        Guanfangcanshu: '自有参数设备',
        RSAss: '固定字符串',
        shouxufei: '',
        shuzi: '',
        shijian: '分',
        zifuchaun: '',
      },
    };
  }
  addmenuclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  addmenuopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  /*  formChange = (value) => {
    this.setState({
      value,
    });
  }; */
  submitHandle = (e) => {
    console.log(e);
    debugger;
  };
  render() {
    const ApplicationChannel = [
      { value: '支付宝渠道', label: '支付宝渠道' },
      { value: '支付宝手机APP', label: '支付宝手机APP' },
      { value: '微信扫码', label: '微信扫码' },
    ];
    const equipmentgroup = [
      { value: '支付宝专用设备组3', label: '支付宝专用设备组3' },
      { value: '微信设备组', label: '微信设备组' },
      { value: '银联设备组', label: '银联设备组' },
    ];
    const Guanfangcanshu = [
      { value: '自有参数设备', label: '自有参数设备' },
      { value: '微信设备组', label: '微信设备组' },
      { value: '银联设备组', label: '银联设备组' },
    ];
    const RSAss = [
      { value: '固定字符串', label: '固定字符串' },
      { value: '字符串', label: '字符串' },
    ];
    const shijian = [
      { value: '分', label: '分' },
      { value: '秒', label: '秒' },
    ];
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    if (!this.state.open) return null;
    return (
      <div className='addmenu'>
        <h2>添加菜单</h2>
        <Form value={this.state.value} onChange={this.formChange} ref="form" {...formItemLayout}>
          <FormItem label='上级菜单'>
            <Select style={{ width: '150px' }} defaultValue={{ value: '支付宝渠道', label: '支付宝渠道' }} name="ApplicationChannel" dataSource={ApplicationChannel} />
          </FormItem>
          <FormItem label='菜单名称'>
            <Input style={styles.formbinderbox} name='caidan' placeholder='输入自定义名称备注' hasClear />
          </FormItem>
          <FormItem label='所属栏目'>
            <Input style={styles.formbinderbox} name='lanmu' placeholder='输入自定义名称备注' hasClear />
          </FormItem>
          <FormItem label='链接地址'>
            <Input style={styles.formbinderbox} name='dizhi' placeholder='输入自定义名称备注' hasClear />
          </FormItem>
          <FormItem label='属性'>
            <Input style={styles.formbinderbox} name='shuxing' placeholder='输入自定义名称备注' hasClear />
          </FormItem>
          <FormItem label='描述'>
            <Input.TextArea
              name='description'
              placeholder="多行输入"
              rows={8}
            />
          </FormItem>
          <FormItem label='创建时间' >
            <RangePicker name='startdate' showTime resetTime defaultValue={[startValue,endValue]} />
          </FormItem>
          <FormItem label='浏览权限' >
            <RadioGroup aria-labelledby="radio-a11y" name='status'>
              <Radio id="python" value="python">管理员</Radio>
              <Radio id="java" value="java">用户</Radio>
              <Radio id="c" value="c">禁用</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label=" ">
            <Form.Submit validate type="primary" onClick={this.submitHandle} style={{ marginRight: 7 }}>提交</Form.Submit>
            <Form.Reset style={{ marginLeft: 130 }} onClick={this.addmenuclose.bind(this)} >取消</Form.Reset>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  officialleftsele: {
    width: '50px',
  },
  officialrightsele: {
    width: '50px',
  },
};
