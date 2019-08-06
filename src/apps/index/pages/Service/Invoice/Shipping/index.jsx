/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Message, Grid, Form, Select,Button } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { InvoiceOperation } from '@indexApi';
import '../../index.css';

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        weCourierCompany: '',
        weCourierNumber: '',
      },
      open: false,
      content: null,
      confirm: null,
    };
  }
  shippingclose() {
    this.setState({
      open: false,
      value: {
        weCourierCompany: '',
        weCourierNumber: '',
      },
    });
  }
  shippingopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
    });
  }
  formChange=(value)=>{
    this.setState({
      value,
    });
  }
  // 寄件操作
  confirmBtn() {
    const _id = this.state.content;
    const value = this.state.value;
    InvoiceOperation({
      _id,
      operation: 1,
      ...value,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.shippingclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    // const jiaose = this.state.content;
    const { content , confirm, value } = this.state;
    if (!this.state.open) return null;
    debugger;
    return (
      <div className="shipping">
        <div className="shipping-title">
          <h2>寄件</h2>
          <span onClick={this.shippingclose.bind(this)}>×</span>
        </div>
        <div className='shipping-content'>
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>快递公司</span>
              <FormBinder name="weCourierCompany">
                <Input hasClear placeholder='单行输入' />
              </FormBinder>
            </div>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>运单号</span>
              <FormBinder name='weCourierNumber'>
                <Input hasClear placeholder='单行输入' />
              </FormBinder>
            </div>
          </FormBinderWrapper>
        </div>
        <div className="shipping-btn">
          <Button className='btn-all' size='large' type='secondary' onClick={this.confirmBtn.bind(this)}>确定</Button>
        </div>

      </div>
    );
  }
}
const styles = {
  formItem: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  formItemLabel: {
    width: '70px',
    marginRight: '10px',
    display: 'inline-block',
    textAlign: 'right',
  },
};
