/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Message, Grid, Form, Select,Button } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

export default class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        phone: '',
      },
      open: false,
      content: null,
      confirm: null,
    };
  }
  shippingclose() {
    this.setState({
      open: false,
      // content: null,
      // value: {},
    });
  }
  shippingopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
    });
  }
  confirmBtn() {
    this.setState({});
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
            ref="form"
          >
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>快递公司</span>
              <FormBinder name="username">
                <Input hasClear placeholder='单行输入' />
              </FormBinder>
            </div>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>运单号</span>
              <FormBinder name='phone'>
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
}
