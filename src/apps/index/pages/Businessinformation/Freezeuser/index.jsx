import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { companyfreeze } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 5 },
  wrapperCol: { s: 12, l: 10 },
};
export default class Freezeuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        id: '',
      },
    };
  }

  freezeUserclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  freezeUseropen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
    });
    this.confirmCallBack = confirm;
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  SubInvoiceinfo() {
    const _id = this.state.content._id;
    const statues = this.state.content.frozenState;
    let frozenState;
    if (statues == true) {
      frozenState = false;
    } else if (statues == false) {
      frozenState = true;
    } else {
      return null;
    }
    companyfreeze({
      _id,
      frozenState,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.freezeUserclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { content, confirm, value } = this.state;
    if (!this.state.open) return null;
    return (
      <div className='freezeuser-bulletbox'>
        <div className='freezeuser-title'>
          {
            content.frozenState == false ? (
              <h2 style={{ display: 'inline-block' }}>解冻用户</h2>
            ) : (
              <h2 style={{ display: 'inline-block' }}>冻结用户</h2>
            )
          }
          {/*          <h2 style={{ display: 'inline-block' }}>冻结用户</h2> */}
          <span style={{ fontSize: '38px', color: '#ffffff', float: 'right', cursor: 'pointer',lineHeight: '38px' }} onClick={this.freezeUserclose.bind(this)}>×</span>
        </div>
        <div className='freezeuser-mid'>
          {
            content.frozenState == false ? (
              <p>确定要解冻用户吗？</p>
            ) : (
              <p>确定要冻结用户吗？</p>
            )
          }
        </div>

        <div className='freezeuser-content'>
          <Form className='form' value={value}>
            <FormItem wrapperCol={{ offset: 8 }} >
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                确定
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.freezeUserclose.bind(this)}>取消</Form.Reset>
            </FormItem>

          </Form>

        </div>


      </div>
    );
  }
}

const styles = {
  cancelbtn: {
    display: 'inline-block',
    marginLeft: '10px',
    width: '80px',
    height: '28px',
    // backgroundColor: 'rgba(230, 241, 252, 1)',
    // color: 'rgba(78, 126, 232, 1)',
    // borderColor: 'rgba(193, 241, 248, 1)',
    borderRadius: '4px',
  },
  submitbtn: {
    display: 'inline-block',
    width: '80px',
    height: '28px',
    // backgroundColor: 'rgba(86, 119, 252, 1)',
    borderRadius: '4px',
  },
};
