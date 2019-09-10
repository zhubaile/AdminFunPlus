import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button ,Form, Grid, Message } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { categorychangeCategory } from "@indexApi";
import '../../../index.css';

const FormItem = Form.Item;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
export default class Addcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      values: {
        label: '',
      },
      content: null,
      confirm: null,
    };
  }
  addmessageclose=()=> {
    this.setState({
      open: false,
      content: null,
      values: {
        label: '',
      },
    });
  }
  addmessageopen(content,confirm) {
    debugger;
    // event.persist();
    if (confirm == 'one') {
      this.setState({
        open: true,
        values: content,
        content,
        confirm,
      });
    } else if (confirm == 'two' && content.pId) {
      this.setState({
        open: true,
        values: content,
        content,
        confirm,
      });
    } else {
      this.setState({
        open: true,
        content,
        confirm,
      });
    }
    // this.confirmCallBack = confirm;
  }
  addcolumns(v,e) {
    let id;
    const { content,confirm } = this.state;
    if (content.id) {
      id = content.id;
    } else {
      id = '';
    }
    // const appdata = confirm == 'one' ? categorychangeOneCategory : categorychangeTwoCategory;
    categorychangeCategory({
      ...v,
      pId: id,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        this.addmessageclose();
        Message.success(data.message);
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    if (!this.state.open) return null;
    const { content,confirm } = this.state;
    return (
      <div className='Addcategory'>
        <div className='Addcategory-top'>
          <span>{confirm == 'two' ? '添加二级栏目' : '添加一级栏目'}</span>
          <strong onClick={this.addmessageclose.bind(this)}>×</strong>
        </div>
        <div className='Addcategory-content'>
          <Form className='form' value={this.state.values}>
            {
              confirm == 'two' ? (
                <FormItem
                  {...formItemLayout}
                  label='一级栏目：'
                >
                  { content.label }
                </FormItem>
              ) : null
            }
            <FormItem
              {...formItemLayout}
              label='类目名称：'
            >
              <Input name='label' />
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Reset style={{ marginLeft: '20px', borderRadius: '4px' }}
                size="large"
                type="primary"
                onClick={this.addmessageclose.bind(this)}
              >取消
              </Form.Reset>
              <Form.Submit
                style={{ marginLeft: '20px', borderRadius: '4px' }}
                size="large"
                type="primary"
                validate
                onClick={(v, e) => this.addcolumns(v,e)}
              >
                提交
              </Form.Submit>
            </FormItem>
          </Form>
        </div>
        {/* <div className='addmessage-content'>
          <span>栏目名称</span>
          <input type="text" ref={input=>this.input = input} placeholder='请输入栏目名称' />
          <span>内容</span>
        </div> */}
        {/* <div className='addmessage-btn'>
          <Button type="primary" size='large' onClick={this.addcolumns.bind(this)}>提交</Button>
        </div> */}
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
