/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Radio , Button, Message, Form, Select, Checkbox } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Demopay from '../../../../../Website/pages/Demo/Demopay';
import { changeSysRolePms } from '@indexApi';
import '../../../index.css';

const Option = Select.Option;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;
const items = [];

export default class Editingrole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        description: '',
        notes: '',
        premissions: [],
      },
      open: false,
      content: [],
      premission: null,
      payvalue: '',
    };
  }
  cancelbtnclose() {
    this.setState({
      open: false,
      content: [],
    });
  }
  cancelbtnopen(content,premission) {
    debugger;
    // const values = Object.assign({},this.state.value,{ premissions: content.premissions }); // name 的值需要替换
    this.setState({
      open: true,
      content,
      premission,
    });
    this.confirmCallBack = confirm;
  }
  // 提交按钮
  addeditingrole() {
    const id = this.state.content._id;
    const premissions = this.state.content.premissions;
    const descriptionval = this.description.getInputNode().value;
    const notesval = this.notes.getInputNode().value;
    changeSysRolePms({
      _id: id,
      premissions,
      description: descriptionval,
      notes: notesval,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.cancelbtnclose();
        this.props.fetchData();
      } else {
        Message.success(data.message);
      }
    });
  }

  checkoutbtn(v,e) {
    let zzzz = this.state.content.premissions;
    debugger;
    const id = e.target.id;
    if (zzzz.indexOf(id) > -1) {
      zzzz = zzzz.filter(n => n !== id);
      const values = Object.assign({},this.state.content,{ premissions: zzzz }); // name 的值需要替换
      this.setState({
        content: values,
      });
    } else {
      zzzz.push(id);
      const values = Object.assign({},this.state.content,{ premissions: zzzz }); // name 的值需要替换
      this.setState({
        content: values,
      });
    }
  }
  render() {
    const { content, premission } = this.state;
    const premissionss = content.premissions; // 选中的所有权限
    if (!this.state.open) return null;
    return (
      <div className="editingrole">
        <h2>编辑角色</h2>
        <div>
          <label>角色名称</label>
          <Input name="description" disabled hasClear defaultValue={content.description} ref={node=>this.description = node} />
        </div>
        <div>
          <label>权限说明</label>
          <Input name='notes' hasClear defaultValue={content.notes} ref={node=>this.notes = node} />
        </div>
        {
            premission.map((item)=>{
              debugger;
              return (
                <Checkbox name='premissions' defaultChecked={premissionss.includes(item._id)} id={item._id} style={{ marginLeft: '5px' }} onChange={this.checkoutbtn.bind(this)}>{item.description}</Checkbox>
              );
            })
          }
        {/* defaultChecked={premission.includes(item._id)} // 判断数组里面是否有该字符串，有为true，反之false  */}

        <div>
          <Button type='secondary' style={styles.cancelbtn} onClick={this.cancelbtnclose.bind(this)}>取消</Button>
          <Button type='primary' style={styles.submitbtn} onClick={this.addeditingrole.bind(this)}>提交</Button>
        </div>


      </div>
    );
  }
}

const styles = {
  cancelbtn: {
    display: 'inline-block',
    margin: '10px 20px 20px 40px',
    /*    position: 'absolute',
    left: '100px',
    bottom: '15px', */
    width: '80px',
    height: '30px',
    backgroundColor: 'rgba(255, 159, 159, 1)',
    color: 'rgba(255, 255, 255, 1)',
    border: 'none',
    borderRadius: '5px',
  },
  submitbtn: {
    display: 'inline-block',
    margin: '10px 20px 20px 40px',
    /*    position: 'absolute',
    right: '40px',
    bottom: '15px', */
    width: '80px',
    height: '30px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    border: 'none',
    borderRadius: '5px',
  },
};
