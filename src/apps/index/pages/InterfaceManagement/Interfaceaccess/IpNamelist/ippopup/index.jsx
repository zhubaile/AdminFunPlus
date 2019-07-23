import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, Message } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { addsettingwhiteIps } from "@indexApi";
import '../../../../index.css';

const { Row, Col } = Grid;
export default class Ippopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  ippopupclose=()=> {
    this.setState({
      open: false,
      content: null,
    });
  }
  ippopupopen(content,confirm) {
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
    const IP = this.input.value;
    console.log(IP);
    addsettingwhiteIps({
      ip: IP,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.ippopupclose();
        Message.success(data.message);
        location.reload(); // 待优化
      } else { Message.success(data.message); }
    });
  }
  /*  adddaypopup() {
    this.refs.form.validateAll((errors,values)=>{
      this.props.time(values);
    });
    this.daypopupclose();
  } */
  /*  inputValidator = (rule, value, callback) => {
    debugger;
    const z=this.state.openTimeRangestart;
    const errors = [];
    console.log(value)
    if (!value) {
      callback('输入不能为空');
    } else if (value>z) {
      callback('lalala');
    } else {
      callback();
    }
  }; */
  render() {
    if (!this.state.open) return null;
    return (
      <div className='ippopup'>
        <div className='ippopup-top'>
          <h2>选择时间</h2>
          <strong onClick={this.ippopupclose.bind(this)}>×</strong>
        </div>
        <div className='ippopup-content'>
          <span>新增IP地址</span>
          <input type="text" ref={input=>this.input = input} />
        </div>
        <div className='ippopup-btn'>
          <button onClick={this.ippopupclose.bind(this)}>取消</button>
          <button onClick={this.addip.bind(this)}>确定</button>
        </div>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '150px',
    margin: '15px',
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


/*

{
  "channelId":"5cf4b34533853c9ed57f0035",
  "ruleName": "微信jsApi规则999",
  "openTimeMode": {
  "useMode": "openTimeAll"
},
  "devicesGroup":[{
  "singleQuatoRange": {
    "max": 10,
    "min": 9
  },
  "dayQuato":10,
  "dGroupId": "5cef4c3d27a56a7a96ea150a",
  "sOverJumpDGroupId":"5cef4c4027a56a7a96ea150b",
  "deviceUseMode":"random",
  "cashMatchMode":false,
  "singleDeviceCountLimt": {
    "minutes":5,
    "limit":2
  },
  "singleDeviceDayQuato":10
},{
  "singleQuatoRange": {
    "max": 10,
    "min": 9
  },
  "dayQuato":10,
  "dGroupId": "5cef4c3d27a56a7a96ea150a",
  "sOverJumpDGroupId":"5cef4c4027a56a7a96ea150b",
  "deviceUseMode":"random",
  "cashMatchMode":false,
  "singleDeviceCountLimt": {
    "minutes":5,
    "limit":2
  },
  "singleDeviceDayQuato":10
}]
} */
