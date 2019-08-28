import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input , Grid, Form ,Message ,Radio } from '@alifd/next';
import Img from '@icedesign/img';
import { actions, reducers, connect } from '@indexStore';
import { companyupdateAuditSuccess } from '@indexApi';
import Idcard from './Idcard';
import Businesslicense from './Businesslicense';
import '../../index.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
  // labelCol: { xxs: 8, s: 8, l: 8 },
  // wrapperCol: { s: 16, l: 16 },
  // labelCol: { xxs: 10, s: 10, l: 10 },
  // wrapperCol: { xxs: 12, s: 12, l: 12 },
};
export default class Certificationstatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        reason: '',
        type: null,
      },
    };
  }

  certificationclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  certificationopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
      value: content,
    });
    this.confirmCallBack = confirm;
  }
  businimgbtn(v) {
    this.Businesslicense.Businesslicenseopen(v);
  }
  idcardimgbtn(v) {
    this.Idcard.Idcardimgopen(v);
  }
  SubInvoiceinfo(v,e) {
    debugger;
    const _id = this.state.content._id;
    const content = v.reason;
    debugger;
    companyupdateAuditSuccess({
      _id,
      content,
      type: v.type,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.certificationclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { content, confirm,value } = this.state;
    // const cpBackCardImg = content.cpBackCardImg;
    // content.cpIndustryImage
    // content.cpFrontCardImg
    debugger;
    if (!this.state.open) return null;
    const two = 2; const three = 3;
    const cpIndustryImage = `http://192.168.1.121:3000${content.cpIndustryImage}`,
      cpFrontCardImg = `http://192.168.1.121:3000${content.cpFrontCardImg}`,
      cpBackCardImg = `http://192.168.1.121:3000${content.cpBackCardImg}`;
    return (
      <div className='certificationstatus-bulletbox'>
        <Idcard ref={ node => this.Idcard = node } />
        <Businesslicense ref={ node => this.Businesslicense = node } />
        <div className='edit-title'>
          <h2 style={{ display: 'inline-block' }}>认证状态</h2>
          <span style={{ fontSize: '38px', color: '#666666', float: 'right', cursor: 'pointer' }} onClick={this.certificationclose.bind(this)}>×</span>
        </div>
        <div className='certificationstatus-content'>
          <Form className='form' value={value}>
            <FormItem
              {...formItemLayout}
              label='企业营业执照：'
            >
              <div style={{ width: '50px', height: '80px' }} onClick={this.businimgbtn.bind(this,cpIndustryImage)}>
                <Img
                  height={80}
                  width={50}
                  type='contain'
                  src={cpIndustryImage}
                  // src={require('@img/logo/logo1.png')}
                />
                {/* <img src={'192.168.1.121:3000/upload/image/9d4b9b8b028a14882425eb09825a7034.png'} alt="" /> */}
                {/* <img src={`192.168.1.121:3000${content.cpBackCardImg}`} alt="123456" /> */}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='法人身份证正面：'
            >
              <div style={{ width: '60px', height: '40px' }} onClick={this.idcardimgbtn.bind(this,cpFrontCardImg)}>
                <Img
                  height={40}
                  width={60}
                  type='contain'
                  src={cpFrontCardImg}
                />
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='法人身份证反面：'
            >
              <div style={{ width: '60px', height: '40px' }} onClick={this.idcardimgbtn.bind(this,cpBackCardImg)}>
                <Img
                  height={40}
                  width={60}
                  type='contain'
                  src={cpBackCardImg}
                />
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='认证处理：'
            >
              <RadioGroup aria-labelledby="radio-a11y" name='type'>
                <Radio value={two}>通过</Radio>
                <Radio value={three}>驳回</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='驳回原因：'
            >
              <Input.TextArea name="reason" />
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                size="large"
                type="primary"
                validate
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                确认
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.certificationclose.bind(this)}>取消</Form.Reset>
            </FormItem>
            {/* <Button className='btn-all' size="large" type="primary" onClick={this.certificationclose.bind(this)>取消</Button> */}
            {/* <Button type='primary'style={styles.submitbtn} siza='large' onClick={this.SubInvoiceinfo.bind(this)}>提交</Button> */}
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
