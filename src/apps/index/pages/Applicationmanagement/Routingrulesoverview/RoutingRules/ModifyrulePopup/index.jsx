// zbl: 有点小bug，编辑的时候，不触发handleProvinceChange，自动出款的子数据就会没有数据。而且创建和编辑切换父元素的数据时候，子元素也就是this.state.value里面的子元素的值不会清空，太深了，取不出来。
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,NumberPicker,Select,Radio,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { routerRuleadd,routerRuledit } from '@indexApi';
import Daypopup from './daypopup';
import Weektimepopup from './weektimepopup';
import '../../../../index.css';

const RadioGroup = Radio.Group;
const { Row, Col } = Grid;

export default class RoutingPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApplicationChannels: [], // 首次加载的渠道
      open: false,
      Newdatas: null,
      equipmentgroup: [],
      sons: null, // 设备组列表信息
      channelType: '', // 标识
      child: null, // 设备组信息的子数据


      confirm: null,
      dGroupData: null, // 设备组的数据信息
      devicesGroup: null, // 全部设备组详细信息
      values: null, // 路由规则的初始数据
      son: [],
      value: { // 发送给后端的数据
        // devicesGroup: null,
        // channelType: null, // 标识
        // ruleName: '',
        // channelId: '',
        // // 开放时间选择
        // openTimeMode: {
        //   useMode: '',
        //   condition: {},
        // },
        // // 可用设备多选
        // dGroupId: [],
        // // 设备组的所有信息
        // devicesGroup: [
        //   {
        //     autoOutCash: {
        //       outChannelId: '',
        //       dGroupId: '',
        //       noOutRangeMin: '',
        //       noOutRangeMax: '',
        //     },
        //   },
        //   {},
        //   {},
        // ],
        // EquipGroupInformation: [],
      },
    };
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.Fixedcontent = this.Fixedcontent.bind(this);
    this.Routingclose = this.Routingclose.bind(this);
  }
  // 获取相应的渠道的内容
  componentDidMount() {
  }
  // 关闭
  Routingclose() {
    this.setState({
      open: false,
      value: [],
    },()=>{
      this.props.fetchData();
    });
  }
  // 打开
  Routingopen(content,confirm) {
    const datas = content.channelData;
    const dataVal = datas.map(item=>({ value: item.channelId,label: item.channelName,dGroupData: item.dGroupData })); // 改变成想要的属性名
    const dataVals = datas.map(item=>({ value: item.channelId,label: item.payScene,dGroupData: item.dGroupData }));
    // const contentttt = Object.assign({},content,{ channelData: dataVal });

    const contents = Object.assign({},content,{ channelData: dataVals });
    debugger;
    // if (!content.ruleName || content.ruleName == undefined || content.ruleName == null) {
    //   // 创建的时候
    //   this.setState({
    //     open: true,
    //     values: contentttt,
    //     value: contentttt,
    //     confirm,
    //   });
    // } else {
    const channelId = contents.channelId;
    const channelData = contents.channelData;
    const e = contents.dGroupId;
    // const itemss = channelData[0].dGroupData[0];
    // debugger;
    // const zbaaa = [];
    // zbaaa.push(itemss);
    const v = 'itclick';
    debugger;
    // 编辑的时候
    this.setState({
      open: true,
      values: contents,
      value: contents,
      confirm,
    },()=>{
      this.getNodeById(channelId,channelData,e);
      // this.equipmentgroups(e,v,zbaaa);
    });
    // }
    // this.confirmCallBack = confirm;
  }
  // two 通过channelId查找出对应的数据进行替换
  recursion =(nodeArr, callback)=> {
    debugger;
    if (nodeArr && nodeArr.length) {
      debugger;
      for (let index = 0; index < nodeArr.length; index++) {
        const element = nodeArr[index];
        const result = callback(element);
        debugger;
        if (result) {
          callback && this.recursion(element, callback);
        } else {
          // 跳出，终止for循环
          break;
        }
      }
    }
  }
  // one 通过channelId查找出对应的数据进行替换
  // channelId: 编辑情况下选中的通道，channelData：通道的所有数据，e:设备组已选择的id
  getNodeById= (channelId,channelData,e)=> {
    let matchNode;
    debugger;
    this.recursion(channelData, (node) => {
      debugger;
      if (node.value == channelId) {
        matchNode = node;
        return false;
      }
      return true;
    });
    const dGroupData = matchNode.dGroupData;
    const dGroupDatas = dGroupData.map(item=>({ value: item.dGroupId,label: item.dGroupName,dUseMode: item.dUseMode,jumpDGroupData: item.jumpDGroupData,rule: item.rule,cashMatchMode: item.cashMatchMode }));
    const selectDGroupData = dGroupDatas.filter((item)=>{
      return (e.indexOf(item.value) > -1);
    });
    const v = 'itclick';
    this.setState({
      dGroupData: dGroupDatas,
    },()=>{
      this.equipmentgroups(e,v,selectDGroupData);
    });
  }

  // 出款审核的层级选择
  handleProvinceChange(v,datas,e) {
    // 有点小bug，编辑的时候，不触发此事件，自动出款的子数据就会没有数据。而且创建和编辑切换父元素的数据时候，子元素也就是this.state.value里面的子元素的值不会清空，太深了，取不出来。
    // const value = this.state.value; // 最外围的数据
    debugger;
    // const channelData = value.channelData;
    this.setState({
      son: '',
    },()=>{
      const dustyInfoson = e.sons;
      this.setState({
        son: dustyInfoson,
      });
    });
  }
  // 选择应用通道来获取设备组信息
  channeldeviceGroups(e,v,item) {
    debugger;
    const dGroupDatas = item.dGroupData;
    let val = this.state.value;
    debugger;
    // 如果已经选择过通道的话，再次选择会清空之前的所有数据
    if (val.channelId) {
      const aaa = Object.assign({},this.state.value,{ devicesGroup: [],channelId: e,dGroupId: [] });
      val = aaa;
    }
    debugger;
    const dGroupData = dGroupDatas.map(items=>({ value: items.dGroupId,label: items.dGroupName,cashMatchMode: items.cashMatchMode,dUseMode: items.dUseMode,jumpDGroupData: items.jumpDGroupData,rule: items.rule })); // 改变成想要的属性名
    console.log(dGroupData);
    this.setState({
      dGroupData,
      value: val,
    });
  }
  /*  formChange = (value) => {
    this.setState({
      value,
    });
  }; */
  // 选择设备组获取多个设备组内的信息
  equipmentgroups=(e,v,item)=> {
    debugger;
    console.log(this.state.dGroupData);
    const devicesGroup = []; // 全部设备组的详细信息
    const id = [];
    let i;
    for (i = 0; i < e.length; i++) {
      if (i < e.length) {
        id.push(i);
      }
    }
    id.map((is)=>{
      debugger;
      return devicesGroup.push(item[is]);
    });
    // 用于展示设备组详细信息的数组
    // const rule=[];
    // const devicesGroupss = devicesGroup.map((item)=>({rule : item.rule,}));
    const devices = Object.assign({},this.state.value,{ devicesGroup,dGroupId: e });

    this.setState({
      value: devices,
    });
  }
  // 内容
  Fixedcontent() {
    const devicesGroup = this.state.value.devicesGroup; // 已选择的设备组的详细信息
    if (!devicesGroup || devicesGroup.length == 0) {
      return null;
    }
    const id = [];
    let i;
    for (i = 0; i < devicesGroup.length; i++) {
      if (i < devicesGroup.length) {
        id.push(i);
      }
    }
    const ApplicationChannels = [
      { value: '选择应用通道', label: '选择应用通道' },
      { value: '支付宝手机APP', label: '支付宝手机APP' },
      { value: '微信扫码', label: '微信扫码' },
    ];
    const danshebieconter = [
      { value: '分', label: '分' },
    ];
    const dayQuatoCompany = [
      { value: '万', label: '万' },
      { value: '元', label: '元' },
    ];
    return (
      id.map((id)=>{
        debugger;
        const cashMatchMode = devicesGroup[id].cashMatchMode; // 开启，不开启
        const dUseMode = devicesGroup[id].dUseMode; // 随机，id小优先
        const jumpDGroupDatas = devicesGroup[id].jumpDGroupData;
        const jumpDGroupData = jumpDGroupDatas.map(item=>({ value: item.sOverJumpDGroupId,label: item.dGroupName })); // 改变成想要的属性名
        const title = devicesGroup[id].label || devicesGroup[id].dGroupName;
        const rule = devicesGroup[id].rule; // 主要详细数据
        const outChannelDatas = rule.outChannelData; // 级联父数据
        debugger;
        // const title = devicesGroup[id].title;
        // const SingleOverrunJump = devicesGroup[id].JumpDGroup;
        // const cashMatchMode = devicesGroup[id].cashMatchMode;
        // const dUseMode = devicesGroup[id].dUseMode;
        // const outChannelDatas = this.state.outChannelDatas; // 自动出款的父数据
        // const outChannelDatas = devicesGroup[id].chukuan;
        // const sons = outChannelDatas[0].outGroupData;
        const sons = this.state.son; // 自动出款的子数据
        let outChannelData = [],
          son = [];
        if (outChannelDatas.constructor == Array) {
          outChannelData = outChannelDatas.map(item=>({ value: item.outChannelId,label: item.outChannelName, sons: item.outGroupData })); // 改变成想要的属性名
        }
        console.log(sons);

        if (sons.constructor === Array) {
          son = sons.map(item=>({ value: item.dGroupId,label: item.dGroupName })); // 改变成想要的属性名
        }
        return (
          <div>
            <div style={styles.main}>
              <div style={styles.maintop}>
                <span style={styles.maintopspanleft}>
                  {title}：路由规则
                </span>
                <p style={styles.maintoppright} />
              </div>
              <div style={styles.mainmain}>
                <div style={styles.mainmainbox}>
                  <p>单笔限额区间</p>
                  <FormBinder name={`devicesGroup[${id}].rule.singleQuatoRange.min`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <span>--</span>
                  <FormBinder name={`devicesGroup[${id}].rule.singleQuatoRange.max`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='1000' hasClear />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>设备组日限额</p>
                  <FormBinder name={`devicesGroup[${id}].rule.dayQuato`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <span>--</span>
                  <FormBinder name={`devicesGroup[${id}].rule.dayQuatoUnit`}>
                    <Select style={styles.Limitintervalinput} defaultValue={{ value: '万', label: '万' }} dataSource={dayQuatoCompany} />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单笔超限跳转</p>
                  <FormBinder name={`devicesGroup[${id}].rule.sOverJumpDGroupId`}>
                    <Select style={styles.formbinderbox} dataSource={jumpDGroupData} />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>设备使用模式</p>
                  <FormBinder name={`devicesGroup[${id}].rule.deviceUseMode`}>
                    <Select style={styles.formbinderbox} dataSource={dUseMode} />
                    {/* defaultValue={{ value: '随机', label: '随机' }} */}
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单设备笔数限制</p>
                  <span>每</span>
                  <FormBinder name={`devicesGroup[${id}].rule.singleDeviceCountLimt.minutes`} >
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].rule.singleDeviceCountLimt.Unit`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '分', label: '分' }} dataSource={danshebieconter} />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].rule.singleDeviceCountLimt.limit`} >
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='10' hasClear />
                  </FormBinder>
                  <span>笔</span>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单设备日收款限额</p>
                  <span>每</span>
                  <FormBinder name={`devicesGroup[${id}].rule.singleDeviceDayQuato`} >
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].rule.singleDeviceDayQuatoUnit`}>

                    <Select style={styles.formbinderbox} defaultValue={{ value: '万', label: '万' }} dataSource={dayQuatoCompany} />
                  </FormBinder>
                  <span>会覆盖上次限额</span>
                </div>
              </div>
              {outChannelDatas.length == 0 ? null : (
                <div style={styles.mainmain}>
                  <div style={styles.mainmainbox}>
                    <p>自动出款</p>
                    <FormBinder name={`devicesGroup[${id}].rule.autoOutCash.outChannelId`}>
                      <Select style={styles.formbinderbox} dataSource={outChannelData} onChange={this.handleProvinceChange} defaultValue={`this.state.value.devicesGroup[${id}].rule.autoOutCash.outChannelId`} />
                    </FormBinder>
                    <FormBinder name={`devicesGroup[${id}].rule.autoOutCash.dGroupId`}>
                      <Select style={styles.formbinderbox} dataSource={son} />
                    </FormBinder>
                  </div>
                  <div style={styles.mainmainbox}>
                    <p>免审核出款区间</p>
                    <FormBinder name={`devicesGroup[${id}].rule.autoOutCash.noOutRangeMin`}>
                      <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                    </FormBinder>
                    <span>--</span>
                    <FormBinder name={`devicesGroup[${id}].rule.autoOutCash.noOutRangeMax`}>
                      <Input htmlType='number' style={styles.Limitintervalinput} placeholder='1000' hasClear />
                    </FormBinder>
                  </div>
                </div>
              )}
              <div>
                <p>金额匹配设备额外开启</p>
                <p>金额匹配模式
                  <span>整数回调</span>
                </p>
                <FormBinder name={`devicesGroup[${id}].rule.cashMatchMode`}>
                  <Select style={styles.formbinderbox} dataSource={cashMatchMode} />
                </FormBinder>
                <FormBinder name={`devicesGroup[${id}].rule.intCallBack`}>
                  <Switch checkedChildren="on" unCheckedChildren="off" />
                </FormBinder>
              </div>
              <div style={styles.allborder} />
            </div>
          </div>
        );
      })
    );
  }

  // 创建按钮
  Establish() {
    const valueval = this.state.value; // 所有数据（比较杂乱）
    const devicesGroups = valueval.devicesGroup; // 设备组信息的数据
    if (!devicesGroups) {
      return Message.success('信息不能为空');
    }
    debugger;
    const id = [];
    const devicesGroup = []; // 要传的设备组详细信息
    let i;
    for (i = 0; i < devicesGroups.length; i++) {
      if (i < devicesGroups.length) {
        id.push(i);
      }
    }
    id.map((id)=>{
      const devicesGroupids = devicesGroups[id].rule;
      const dGroupIds = devicesGroups[id].value;
      debugger;
      const autoOutCashs = devicesGroupids.autoOutCash; // 设备组信息的详细对象
      if (autoOutCashs) {
        debugger;
        const autoOutCash = Object.keys(autoOutCashs); // es6中可以使用obj=Object.keys(obj),然后obj.length
        let zbl;
        if (autoOutCash.length == 0 || !autoOutCash) {
          zbl = Object.assign({},devicesGroupids,{ dGroupId: dGroupIds });
          delete zbl.autoOutCash;
        } else {
          zbl = Object.assign({},devicesGroupids,{ dGroupId: dGroupIds });
        }
        return devicesGroup.push(zbl);
      }
      const zbl = Object.assign({},devicesGroupids,{ dGroupId: dGroupIds });
      return devicesGroup.push(zbl);
    });
    console.log(devicesGroup);
    debugger;
    const ruleid = this.state.confirm; // 判断是创建还是编辑
    // const routerRules = !ruleid ? routerRuleadd : routerRuledit;
    const addId = this.state.value.appId;
    debugger;
    routerRuledit({
      addId,
      ruleId: ruleid,
      channelId: valueval.channelId, // 通道ID
      ruleName: valueval.ruleName, // 规则名称
      openTimeMode: valueval.openTimeMode, // 规则渠道的时间
      devicesGroup, // 设备组的详细信息
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.Routingclose();
      } else {
        Message.success(data.message);
      }
    });
  }
  // 日期选择
  TimeMode(v,e) {
    const data = Object.assign({},this.state.value.openTimeMode,{ useMode: v });
    const datas = Object.assign({},this.state.value,{ openTimeMode: data });
    this.setState({
      value: datas,
    },()=>{
      if (v == 'openTimeAll') {
        const cont = Object.assign({},this.state.value.openTimeMode,{ condition: [] });
        const content = Object.assign({},this.state.value,{ openTimeMode: cont });
        this.setState({
          value: content,
        });
      } else if (v == 'openTimeRange') {
        this.Daypopup.daypopupopen();
      } else if (v == 'openWeekCustom') {
        this.Weektimepopup.weektimepopupopen();
      }
    });
  }
  // 日时间段开放的时间改变
  time(item) {
    const datas = Object.assign({},this.state.value.openTimeMode,{ condition: item }); //
    const data = Object.assign({},this.state.value,{ openTimeMode: datas }); // 复制this.state.openTimeMode，然后this.setState改变
    console.log(datas);
    console.log(item);
    this.setState({
      value: data,
    });
  }
  render() {
    // const ApplicationChannels = this.state.ApplicationChannels; // 渠道规则列表
    // const equipmentgroups = this.state.equipmentgroup; // 可多选的设备组列表
    // const Newdatas = this.state.Newdatas;
    const { values,dGroupData,sons } = this.state;
    console.log(this.state.value);
    console.log(dGroupData);
    if (!this.state.open) return null;
    // const sss = values.channelData;
    return (
      <IceContainer className='routingPopup'>
        <Daypopup ref={ node => this.Daypopup = node } time={this.time.bind(this)} />
        <Weektimepopup ref={ node => this.Weektimepopup = node } time={this.time.bind(this)} />
        <div className='routingPopup-name'>
          <h1 style={{ float: 'left' }}>创建新规则弹窗</h1>
          <div style={{ float: 'right', marginTop: '20px' }}>
            <span style={{ marginRight: '10px' }}>此为高级功能</span>
            <Button className='btn-all' size='large' type='secondary' style={{ marginLeft: '20px' }}>规则可视化配置</Button>
          </div>
          <div className='clearfix' />
        </div>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <FormBinder name='ruleName'>
            <Input style={styles.formbinderbox} placeholder='输入新规则名字' hasClear />
          </FormBinder>
          <FormBinder name="channelId">
            {/* <select className='table-select' onChange={this.channeldeviceGroups.bind(this)}>
              {
                sss.map((item,index)=>{
                  debugger;
                  return <option value={item.value} selected={item.select}>{item.label}</option>;
                })
              }
            </select> */}
            <Select style={styles.formbinderbox} dataSource={values.channelData} placeholder='请选择通道' onChange={this.channeldeviceGroups.bind(this)} />
          </FormBinder>
          <div>
            <h6>渠道规则</h6>
            <FormBinder name="openTimeMode.useMode" required message="请输入正确的名称" >
              <RadioGroup onChange={this.TimeMode.bind(this)}>
                <Radio id="openTimeAll" value='openTimeAll'>全天开放</Radio>
                <Radio id="openTimeRange" value='openTimeRange'>日时间段开放</Radio>
                <Radio id="openWeekCustom" value='openWeekCustom'>周自定义时间开放</Radio>
              </RadioGroup>
            </FormBinder>
          </div>
          <div>
            <p>选择可用设备组-可多选</p>
            <FormBinder name="dGroupId">
              <Select mode="multiple" style={styles.formbinderbox} dataSource={dGroupData} onChange={this.equipmentgroups.bind(this)} placeholder='请选择设备组信息' />
            </FormBinder>
          </div>
          {this.Fixedcontent()}
          <div style={{ marginBottom: '30px' }} />
          <div style={styles.posbtn}>
            <Button className='btn-all' size='large' type='secondary' style={styles.posbtna} onClick={this.Routingclose.bind(this)}>取消</Button>
            <Button className='btn-all' size='large' type='secondary' style={styles.posbtna} onClick={this.Establish.bind(this)}>创建</Button>
          </div>
        </FormBinderWrapper>
      </IceContainer>
    );
  }
}
const styles = {
  formbinderbox: {
    width: '200px',
    margin: '15px',
    borderRadius: '5px',
    zIndex: '9999',
  },
  Limitintervalinput: {
    width: '80px',
    height: '30px',
    // padding: '10px 3px',
  },
  main: { display: 'flex', flexDirection: 'column', marginTop: '20px' },
  maintop: { display: 'flex' },
  maintopspanleft: { width: '20%' },
  maintoppright: { width: '80%', borderBottom: '2px solid #BBBBBB' ,marginBottom: '20px' },
  mainmain: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' },
  allborder: { width: '100%', borderBottom: '2px solid #BBBBBB', margin: '10px 0' },
  mainmainbox: { marginLeft: '20px' },
  posbtn: { position: 'absolute', right: '20px' },
  posbtna: { bottom: '15px', right: '10px', borderRadius: '5px', marginLeft: '20px' },
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
