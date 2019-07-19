import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, Message } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { DatePicker, Form, Radio,Switch } from "@alifd/next/lib/index";
// import { addsettingwhiteIps } from "@indexApi";
import '../../../index.css';

const { Row, Col } = Grid;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
export default class EditingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  editingclose=()=> {
    this.setState({
      open: false,
      content: null,
    });
  }
  editingopen(content,confirm) {
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
  componentDidMount() {
  }
  // deviceGroupaddparmas
  addip() {
    /* const IP = this.input.value;
    console.log(IP);
    addsettingwhiteIps({
      ip: IP,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.ippopupclose();
        Message.success(data.message);
        location.reload(); // 待优化
      } else { Message.success(data.message); }
    }); */
  }

  render() {
    if (!this.state.open) return null;
    return (
      <div className='editingList'>
        <div className='editingList-top'>
          <h2>编辑白名单</h2>
          <strong onClick={this.editingclose.bind(this)}>×</strong>
        </div>
        <div className='editingList-form'>
          <Form value={this.state.value} onChange={this.formChange} ref="form" {...formItemLayout}>
            <FormItem label='商户ID'>
              <Input style={styles.formbinderbox} name='caidan' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='企业名称'>
              <Input style={styles.formbinderbox} name='lanmu' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='访问IP'>
              <Input style={styles.formbinderbox} name='dizhi' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='添加时间'>
              <Input style={styles.formbinderbox} name='shuxing' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='状态' >
              <Switch />
            </FormItem>
            <FormItem label='权限白名单' >
              <Switch />
            </FormItem>
            {/* <FormItem label=" ">
            <Form.Submit validate type="primary" onClick={this.editingclose} style={{ marginRight: 7 }}>添加</Form.Submit>
            <Form.Reset style={{ marginLeft: 130 }} onClick={this.addip.bind(this)} >取消</Form.Reset>
          </FormItem> */}
          </Form>
        </div>
        <div className='editingList-btn'>
          <button onClick={this.addip.bind(this)}>添加</button>
          <button onClick={this.editingclose.bind(this)} className='close'>取消</button>
        </div>
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
  Limitintervalinput: {
    width: '100px',
    padding: '10px 3px',
  },
  main: { display: 'flex', flexDirection: 'column' },
  maintop: { display: 'flex' },
  maintopspanleft: { width: '20%' },
  maintoppright: { width: '80%', borderBottom: '2px solid #BBBBBB' ,marginBottom: '20px' },
  mainmain: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' },
  allborder: { width: '100%', borderBottom: '2px solid #BBBBBB', margin: '10px 0' },
  mainmainbox: { marginLeft: '20px' },
  posbtn: { position: 'absolute', right: '20px' },
  posbtna: { bottom: '15px', right: '10px', background: '#E6F1FC', color: '#1989FA', borderRadius: '5px', marginLeft: '20px' },
  containerTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  message: {
    background: '#E6F7FF',
    border: '1px solid #91D5FF',
    borderradius: '5px',
    margin: '10px 20px 25px',
    width: '50%',
    float: 'left',
  },
  bg: {
    background: '#E6F1FC',
    color: '#1989FA',
    borderRadius: '5px',
    marginLeft: '20px',
    marginTop: '20px',
  },
};
