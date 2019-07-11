import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { deviceGroupaddparmas,deviceGroupadd } from "@indexApi";
import '../../../../../index.css';

const { Row, Col } = Grid;
export default class Weektimepopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      value: {
        monday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        tuesday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        wednesday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        thursday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        friday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        saturday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
        sunday: {
          openSwitch: false,
          timeEnd: '结束时间',
          timeStart: '开始时间',
        },
      },
    };
  }
  weektimepopupclose=()=> {
    this.setState({
      open: false,
      content: null,
    });
  }
  weektimepopupopen(content,confirm) {
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
    this.weektimepopupclose();
  }
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
      <div className='weektimepopup'>
        <h2>选择时间</h2>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            星期一
            <FormBinder name="monday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="monday.timeStart" />
            <FormBinder name="monday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="monday.timeEnd" />
            <FormBinder name="monday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期二
            <FormBinder name="tuesday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="tuesday.timeStart" />
            <FormBinder name="tuesday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="tuesday.timeEnd" />
            <FormBinder name="tuesday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期三
            <FormBinder name="wednesday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name=".wednesdaytimeStart" />
            <FormBinder name="wednesday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="wednesday.timeEnd" />
            <FormBinder name="wednesday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期四
            <FormBinder name="thursday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="thursday.timeStart" />
            <FormBinder name="thursday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="thursday.timeEnd" />
            <FormBinder name="thursday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期五
            <FormBinder name="friday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="friday.timeStart" />
            <FormBinder name="friday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="friday.timeEnd" />
            <FormBinder name="friday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期六
            <FormBinder name="saturday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="saturday.timeStart" />
            <FormBinder name="saturday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="saturday.timeEnd" />
            <FormBinder name="saturday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>
          <div>
            星期日
            <FormBinder name="sunday.timeStart" required message=" " >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="sunday.timeStart" />
            <FormBinder name="sunday.timeEnd" >
              <Select htmlType='number' style={styles.formbinderbox} dataSource={timekaishi} />
            </FormBinder>
            <FormError name="sunday.timeEnd" />
            <FormBinder name="sunday.openSwitch">
              <Switch style={{ marginTop: '20px' }} checkedChildren="on" unCheckedChildren="off" />
            </FormBinder>
          </div>

        </FormBinderWrapper>
        <div className='daypopup-btn'>
          <button onClick={this.weektimepopupclose}>取消</button>
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
