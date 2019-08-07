import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Radio,Select, Input,Switch,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { helpCentercolumnList,helpCenterinsertHelpCenter } from '@indexApi';
import Addcolumns from './addcolumns';
import '../index.css';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
export default class HelpCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      columnslist: [], // 栏目列表
      datas: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        helpCentercolumnList().then(({ status,data })=>{
          if (data.errCode == 0) {
            const list = data.data;
            const columnslist = list.map(item=>({ label: item.columnName,value: item.columnName }));
            this.setState({
              columnslist,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };
  // 添加栏目
  addcolumnsbtn() {
    this.Addcolumns.addcolumnsopen();
  }
  // 提交帮助信息
  subHelp(values) {
    if (!values.createdAt) {
      return null;
    }
    debugger;
    const createdAt = values.createdAt.valueOf();
    helpCenterinsertHelpCenter({
      ...values,
      createdAt,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        Message.success(data.message);
        this.setState({
          value: {
            columnName: '',
            title: '',
            keyword: '',
            centent: '',
            readPower: false,
            createdAt: '',
          },
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  render() {
    const { isLoading, datas, columnslist } = this.state;
    debugger;
    // const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    // const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    return (
      <div className='helpCenter'>
        <Addcolumns ref={node=>this.Addcolumns = node} fetchData={this.fetchData.bind(this)} />
        <Tab shape='pure'>
          <Tab.Item title="帮助中心">
            <Button className='btn-all Addcolumns' size='large' type='secondary' onClick={this.addcolumnsbtn.bind(this)}>添加栏目</Button>
            <div className='helpCenter-main'>
              <Form value={this.state.value} onChange={this.formChange} ref="form" {...formItemLayout}>
                <FormItem label='所属栏目'
                  style={{ margin: '10px 0' }}
                  required
                  requiredMessage="不能为空"
                >
                  <Select style={styles.formbinderbox} name="columnName" dataSource={columnslist} />
                </FormItem>
                <FormItem label='标题'
                  style={{ margin: '10px 0' }}
                  required
                  requiredMessage="不能为空"
                >
                  <Input style={styles.formbinderbox} name='title' placeholder='输入自定义名称备注' hasClear />
                </FormItem>
                <FormItem label='关键字'
                  style={{ margin: '10px 0' }}
                  required
                  requiredMessage="不能为空"
                >
                  <Input style={styles.formbinderbox} name='keyword' placeholder='输入自定义名称备注' hasClear />
                </FormItem>
                <FormItem label='内容'
                  style={{ margin: '10px 0' }}
                  required
                  requiredMessage="不能为空"
                >
                  <Input.TextArea
                    style={styles.formbinderboxs}
                    name='centent'
                    placeholder="多行输入"
                    rows={8}
                  />
                </FormItem>
                <FormItem label='时间'
                  style={{ margin: '10px 0' }}
                  required
                  requiredMessage="不能为空"
                >
                  <DatePicker name='createdAt' format="YYYY-M-D" showTime={{ format: 'HH:mm' }} />
                </FormItem>
                <FormItem label='阅读权限' style={{ margin: '10px 0' }} >
                  <Switch name='readPower' />
                </FormItem>
                <FormItem label='属性设置' style={{ margin: '10px 0' }} >
                  <RadioGroup aria-labelledby="radio-a11y" name='status'>
                    <Radio id="python" value="python">置顶显示</Radio>
                    <Radio id="java" value="java">默认排序</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label=" " style={{ margin: '10px 0' }}>
                  <Form.Submit validate type="primary" onClick={this.subHelp.bind(this)} style={{ marginRight: 7, borderRadius: 4, width: '76px' }}>提交</Form.Submit>
                </FormItem>
              </Form>
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  formbinderboxs: {
    width: '336px',
    borderRadius: '5px',
    zIndex: '8889',
  },
  officialleftsele: {
    width: '50px',
  },
  officialrightsele: {
    width: '50px',
  },
};
