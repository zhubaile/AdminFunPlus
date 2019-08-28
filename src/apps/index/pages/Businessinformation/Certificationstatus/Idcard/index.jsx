import React, { Component } from 'react';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch } from '@alifd/next';
import Img from '@icedesign/img';
import '../../../index.css';

export default class Idcardimg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  Idcardimgclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  Idcardimgopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  render() {
    if (!this.state.open) return null;
    const { content } = this.state;
    return (
      <div className='idcardimg'>
        <div className='idcardimg-shadow' />
        <div className='idcardimg-mainimg'>
          <span style={{ color: '#fff', float: 'right', fontSize: '30px', cursor: 'pointer' }} onClick={this.Idcardimgclose.bind(this)}>×</span>
          <Img
            height={550}
            width={500}
            type='contain'
            src={content}
          />
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
    backgroundColor: 'rgba(230, 241, 252, 1)',
    color: 'rgba(78, 126, 232, 1)',
    borderColor: 'rgba(193, 241, 248, 1)',
    borderRadius: '4px',
  },
  submitbtn: {
    display: 'inline-block',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    borderRadius: '4px',
  },
};
