
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button , Grid, DatePicker , Tab,Message ,Table,NumberPicker,Select,Radio,Switch } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { channelParams,channeldeviceGroup,deviceGroupruleParams,routerRuleadd } from '@indexApi';
import Daypopup from './daypopup';
import Weektimepopup from './weektimepopup';
import '../../../../index.css';

const RadioGroup = Radio.Group;
const { Row, Col } = Grid;
export default class ModifyrulePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      equipmentgroup: [],
      value: {
        ruleName: '',
        channelId: '',
        // 开放时间选择
        openTimeMode: {
          useMode: '',
          condition: {},
        },
        // 可用设备多选
        dGroupId: [],
        devicesGroup: [

        ],
      },
    };
  }
  //
  componentDidMount() {
    channelParams().then(({ status, data })=>{
      this.setState({
        ApplicationChannels: data.data,
      });
    });
  }
  // 选择应用通道来获取设备组信息
  channeldeviceGroups(e,v) {
    const channelId = Object.assign({},this.state.value,{ channelId: e }); // dGroupId: []
    this.setState({
      value: channelId,
    });
    channeldeviceGroup({
      channelId: e,
    }).then(({ status,data })=>{
      const datas = Object.assign({},this.state.value,{ devicesGroup: [],dGroupId: [] }); //
      this.setState({
        equipmentgroup: data.data,
        value: datas,
      });
      this.equipmentgroups();
    });
  }
  // 关闭
  Routingclose() {
    this.setState({
      open: false,
      value: '',
    });
  }
  // 打开
  Routingopen(content,confirm) {
    this.setState({
      open: true,
      content,
    });
    this.confirmCallBack = confirm;
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  // 选择设备组获取其他信息
  equipmentgroups=(e,v,item)=> {
    if (!e || e.length == 0) {
      const datas = Object.assign({},this.state.value,{ devicesGroup: [] , dGroupId: [] }); //
      this.setState({
        value: datas,
      });
      return null;
    }
    deviceGroupruleParams({
      dGroupIds: e,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        const datas = data.data;
        const zzz = Object.assign({},this.state.value,{ devicesGroup: datas });
        this.setState({
          value: zzz,
        });
      }
    });
  }
  // 内容
  Fixedcontent() {
    const datas = this.state.value.devicesGroup;
    if (!datas || datas.length == 0) {
      return null;
    }
    const id = [];
    let i;
    for (i = 0; i < datas.length; i++) {
      if (i < datas.length) {
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
    const Autopayleft = [
      { value: '未选择对应付款渠道', label: '未选择对应付款渠道' },
    ];
    const Autopayright = [
      { value: '付款渠道可选对应设备组', label: '付款渠道可选对应设备组' },
    ];
    return (
      id.map((id)=>{
        const title = datas[id].title;
        const SingleOverrunJump = datas[id].JumpDGroup;
        const cashMatchMode = datas[id].cashMatchMode;
        const dUseMode = datas[id].dUseMode;
        return (
          <div>
            <div style={styles.main}>
              <div style={styles.maintop}>
                <span style={styles.maintopspanleft}>
                  {title}
                </span>
                <p style={styles.maintoppright} />
              </div>
              <div style={styles.mainmain}>
                <div style={styles.mainmainbox}>
                  <p>单笔限额区间</p>
                  <FormBinder name={`devicesGroup[${id}].singleQuatoRange.min`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <span>--</span>
                  <FormBinder name={`devicesGroup[${id}].singleQuatoRange.max`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='1000' hasClear />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>设备组日限额</p>
                  <FormBinder name={`devicesGroup[${id}].dayQuato`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <span>--</span>
                  <FormBinder name={`devicesGroup[${id}].dayQuatoUnit`}>
                    <Select style={styles.Limitintervalinput} defaultValue={{ value: '万', label: '万' }} dataSource={dayQuatoCompany} />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单笔超限跳转</p>
                  <FormBinder name={`devicesGroup[${id}].sOverJumpDGroupId`}>
                    <Select style={styles.formbinderbox} dataSource={SingleOverrunJump} />
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>设备使用模式</p>
                  <FormBinder name={`devicesGroup[${id}].deviceUseMode`}>
                    <Select style={styles.formbinderbox} dataSource={dUseMode} />
                    {/* defaultValue={{ value: '随机', label: '随机' }} */}
                  </FormBinder>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单设备笔数限制</p>
                  <span>每</span>
                  <FormBinder name={`devicesGroup[${id}].singleDeviceCountLimt.minutes`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].singleDeviceCountLimt.Unit`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '分', label: '分' }} dataSource={danshebieconter} />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].singleDeviceCountLimt.limit`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='10' hasClear />
                  </FormBinder>
                  <span>笔</span>
                </div>
                <div style={styles.mainmainbox}>
                  <p>单设备日收款限额</p>
                  <span>每</span>
                  <FormBinder name={`devicesGroup[${id}].singleDeviceDayQuato`}>
                    <Input htmlType='number' style={styles.Limitintervalinput} placeholder='50' hasClear />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].singleDeviceDayQuatoUnit`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '万', label: '万' }} dataSource={dayQuatoCompany} />
                  </FormBinder>
                  <span>会覆盖上次限额</span>
                </div>
              </div>
              <div style={styles.mainmain}>
                <div style={styles.mainmainbox}>
                  <p>自动出款</p>
                  <FormBinder name={`devicesGroup[${id}].Autopayleft`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '未选择对应付款渠道', label: '未选择对应付款渠道' }} dataSource={ApplicationChannels} />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].Autopayright`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '付款渠道可选对应设备组', label: '付款渠道可选对应设备组' }} dataSource={Autopayright} />
                  </FormBinder>
                </div>
                <div>
                  <p>免审核出款区间</p>
                  <FormBinder name={`devicesGroup[${id}].Auditfreeleft`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '选择应用通道', label: '选择应用通道' }} dataSource={ApplicationChannels} />
                  </FormBinder>
                  <FormBinder name={`devicesGroup[${id}].Auditfreeright`}>
                    <Select style={styles.formbinderbox} defaultValue={{ value: '选择应用通道', label: '选择应用通道' }} dataSource={ApplicationChannels} />
                  </FormBinder>
                </div>
              </div>
              <div>
                <p>金额匹配设备额外开启</p>
                <p>金额匹配模式
                  <span>整数回调</span>
                </p>
                <FormBinder name={`devicesGroup[${id}].cashMatchMode`}>
                  <Select style={styles.formbinderbox} dataSource={cashMatchMode} />
                </FormBinder>
                <FormBinder name={`devicesGroup[${id}].intCallBack`}>
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
    this.refs.form.validateAll((errors,values)=>{
      routerRuleadd({
        ...values,
      }).then(({ status,data })=>{
        if (data.errCode == 0) {
          this.Routingclose();
          Message.success(data.message);
        }
      });
    });
  }
  TimeMode(v,e) {
    if (v == 'openTimeAll') {
      return null;
    } else if (v == 'openTimeRange') {
      this.Daypopup.daypopupopen();
    } else if (v == 'openWeekCustom') {
      this.Weektimepopup.weektimepopupopen();
    }
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
    const equipmentgroups = this.state.equipmentgroup;
    const ApplicationChannels = this.state.ApplicationChannels;
    if (!this.state.open) return null;
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
          <Select name="channelId" style={styles.formbinderbox} dataSource={ApplicationChannels} onChange={this.channeldeviceGroups.bind(this)} />
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
            <Select name='dGroupId' mode="multiple" style={styles.formbinderbox} dataSource={equipmentgroups} onChange={this.equipmentgroups.bind(this)} />
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
