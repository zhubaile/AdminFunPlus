import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;
const { Row, Col } = Grid;
export default class Custom extends Component {
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
  customclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  customopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  formChange = (value) => {
    this.setState({
      value,
    });
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
    if (!this.state.open) return null;
    return (
      <div className='official'>
        <h2>添加设备-参数保护模式</h2>
        <Form value={this.state.value} onChange={this.formChange} ref="form" className='offocoal-main'>
          <FormItem >
            <Input style={styles.formbinderbox} name='NewRuleName' placeholder='输入自定义名称备注' hasClear />
          </FormItem>
          <p>设置前置属性-无法修改</p>
          <FormItem>
            <Select style={{ width: '150px' }} defaultValue={{ value: '支付宝渠道', label: '支付宝渠道' }} name="ApplicationChannel" dataSource={ApplicationChannel} />
            <Select style={{ width: '150px' }} defaultValue={{ value: '自有参数设备', label: '自有参数设备' }} name="Guanfangcanshu" dataSource={Guanfangcanshu} />
          </FormItem>
          <p>分组应用渠道为：支付宝，分组类型：，请填写需要提供的关键参数</p>
          <p style={{ color: 'red' }}>此类型设备通过我们提供的websocket协议 进行链接</p>
          <p>预分配设备ID</p>
          <div className='custom-preID'>
            12312312123
          </div>
          <div className='custom-preID'>
            设备登录密码
          </div>

          {/* <FormItem>
            <Select style={{ width: '150px'}} defaultValue={{ value: 'RSA(SHA1)', label: 'RSA(SHA1)' }} name="RSAss" dataSource={RSAss} />
          </FormItem> */}
          <FormItem >
            <div className='officialleft'>
              <p>IP防护网址</p>
              <Input style={styles.formbinderbox} name='shouxufei' placeholder='最终付款的域名,为空则原路返回' hasClear />
            </div>
            <div className='officialright'>
              <p>订单有效时间</p>
              <Input style={styles.officialrightsele} name='shuzi' placeholder='5' />
              <Select style={styles.officialrightsele} defaultValue={{ value: '分', label: '分' }} name="shijian" dataSource={shijian} />
            </div>
          </FormItem>
          <p style={{ clear: 'both' }}>固定自定义参数</p>
          <p>发起请求返回</p>
          <FormItem>
            <Select style={{ width: '150px' }} defaultValue={{ value: '固定字符串', label: '固定字符串' }} name="RSAss" dataSource={RSAss} />
          </FormItem>
          <FormItem >
            <Input style={styles.formbinderbox} name='zifuchaun' placeholder='输入固定字符串' hasClear />
          </FormItem>
        </Form>
        <div className='officialbtn'>
          <button>查看填写参数</button>
          <div className='officialbtn-right'>
            <button onClick={this.customclose.bind(this)}>取消</button>
            <button>添加</button>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    margin: '5px',
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
