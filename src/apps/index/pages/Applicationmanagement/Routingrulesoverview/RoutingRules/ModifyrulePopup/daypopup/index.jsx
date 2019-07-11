import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { deviceGroupaddparmas,deviceGroupadd } from "@indexApi";
import '../../../../../index.css';

const { Row, Col } = Grid;
export default class Daypopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: {
        timeEnd: '结束时间',
        timeStart: '开始时间',
      },
    };
  }
  daypopupclose=()=> {
    this.setState({
      open: false,
      content: null,
    });
  }
  daypopupopen(content,confirm) {
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
  componentDidMount() {
  }
  // deviceGroupaddparmas
  adddaypopup() {
    this.refs.form.validateAll((errors,values)=>{
      this.props.time(values);
    });
    this.daypopupclose();
  }
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
    const timekaishi = [
      { value: 0,label: '0' },
      { value: 1,label: '1' },
      { value: 2,label: '2' },
      { value: 3,label: '3' },
      { value: 4,label: '4' },
      { value: 5,label: '5' },
      { value: 6,label: '6' },
      { value: 7,label: '7' },
      { value: 8,label: '8' },
      { value: 9,label: '9' },
      { value: 10,label: '10' },
      { value: 11,label: '11' },
      { value: 12,label: '12' },
      { value: 13,label: '13' },
      { value: 14,label: '14' },
      { value: 15,label: '15' },
      { value: 16,label: '16' },
      { value: 17,label: '17' },
      { value: 18,label: '18' },
      { value: 19,label: '19' },
      { value: 20,label: '20' },
      { value: 21,label: '21' },
      { value: 22,label: '22' },
      { value: 23,label: '23' },
      { value: 24,label: '24' },
    ];
    if (!this.state.open) return null;
    return (
      <div className='daypopup'>
        <h2>选择时间</h2>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <FormBinder name="timeStart" required message=" " >
            <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
          </FormBinder>
          <FormError name="timeStart" />
          <FormBinder name="timeEnd" >
            {/* required validator={this.inputValidator} */}
            <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
          </FormBinder>
          <FormError name="timeEnd" />
        </FormBinderWrapper>
        <div className='daypopup-btn'>
          <button onClick={this.daypopupclose}>取消</button>
          <button onClick={this.adddaypopup.bind(this)}>添加</button>
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
