import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Pagination,Radio,Select, Input,Switch,DatePicker,Form } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
// import { deviceGrouplist,deviceparams,devicelist } from '@indexApi';
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
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      datas: [],
      args: [], // 所有选中的id
      listValue: '状态/全部',
      toplist: false,
      grouplistdata: [
        { dGroupName: '' },
      ],
      // datas: [],
    };
  }
  btnClick() {
    this.props.editor(this.input.getInputNode().value);
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
       /* this.mockApi(len).then((data) => { // data 里面为数据
          debugger;
          this.setState({
            datas: data,
            isLoading: false,
          });
        });*/
      }
    );
  };
 /* mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };*/

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };
  renderRule = () => {
    return (
      <div>
        <select className='table-select'>
          <option value="volvo">默认规则</option>
          <option value="saab">自定义规则</option>
          <option value="opel">自定义规则</option>
          <option value="audi">新增规则</option>
        </select>
      </div>
    );
  };
  renderOper = () => {
    return (
      <div style={{ color: '#1A55E2', cursor: 'pointer' }}>
       查看
      </div>
    );
  };
  // 获取到选中的数据
  Choice(args) {
    debugger;
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { datas,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      datas.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        datas.splice(index, 1);
        this.setState({
          datas,
        });
      }
    });
  }
  render() {
    const { isLoading, datas, current,total,pageSize } = this.state;
    const startValue = moment('2019-05-08', 'YYYY-MM-DD', true);
    const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);
    const Allstart = [
      { value: '状态/全部', label: '状态/全部' },
      { value: '可使用', label: '可使用' },
      { value: '离线', label: '离线' },
    ];
    const grouplistdata = this.state.grouplistdata;
    console.log(this.state.datas);
    // 多选按钮
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    return (
      <div className='helpCenter'>
        <div className='currency-top'>
          帮助中心
          <div className='currency-top-bottombor' />
        </div>
        <div className='helpCenter-main'>
          <Form value={this.state.value} onChange={this.formChange} ref="form" {...formItemLayout}>
            <FormItem label='所属栏目'>
              <Select style={styles.formbinderbox} name="ApplicationChannel" dataSource={Allstart} />
            </FormItem>
            <FormItem label='标题'>
              <Input style={styles.formbinderbox} name='caidan' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='关键字'>
              <Input style={styles.formbinderbox} name='lanmu' placeholder='输入自定义名称备注' hasClear />
            </FormItem>
            <FormItem label='内容'>
              <Input.TextArea
                style={styles.formbinderboxs}
                name='description'
                placeholder="多行输入"
                rows={8}
              />
            </FormItem>
            <FormItem label='时间' >
              <RangePicker name='startdate' showTime resetTime defaultValue={[startValue,endValue]} />
            </FormItem>
            <FormItem label='阅读权限' >
              <Switch name='yuedu' />
            </FormItem>
            <FormItem label='属性设置' >
              <RadioGroup aria-labelledby="radio-a11y" name='status'>
                <Radio id="python" value="python">置顶显示</Radio>
                <Radio id="java" value="java">默认排序</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label=" ">
              <Form.Submit validate type="primary" onClick={this.submitHandle} style={{ marginRight: 7 }}>提交</Form.Submit>
            </FormItem>
          </Form>
        </div>
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
