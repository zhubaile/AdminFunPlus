import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
// import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Linegraph from '../components/Linegraph';
import '../../index.css';
import { verifybillsummary,verifybillparams } from '@indexApi';
// import Check from "../../Backstageworkorder/Workorderdetails/Check/index";
// import SelectLang from "../../../../Internationalization/SelectLang/SelectLang";

const { Item } = MenuButton;

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class CustomSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current: 1,
      // isLoading: false,
      // data: [],
      // value: {
      //   jiaose: '角色',
      //   haoma: '',
      //   timeType: '',
      //   startdate: [],
      //   orderStatus: '',
      //   refundStatus: '',
      //   payChannel: '',
      //   device: '',
      //   out_trade_no: '',
      // },
      value: {
        startdate: [],
        channelId: '',
        deviceId: '',
      },
      Transactionfigures: [], // 收入支出的金额
      Dropdownbox: [],
      Dropdownboxson: [],
    };
  }

  componentDidMount() {
    verifybillsummary().then(({ status,data })=>{
      if (data.errCode == 0) {
        this.setState({
          Transactionfigures: data.data[0],
        });
      } else {
        Message.success(data.message);
      }
    });
    verifybillparams().then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        const channels = data.data.channels; // 选择渠道
        const devices = data.data.devices; // 选择参数
        const channelss = channels.map(item=>({ value: item._id,label: item.channelName }));
        const dClassifys = devices.map(item=>({ value: item._id,label: item.dName }));
        this.setState({
          Dropdownbox: channelss,
          Dropdownboxson: dClassifys,
        });
      } else {
        Message.success(data.message);
      }
    });
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  search() {
    const values = this.state.value;
    debugger;
    this.refs.linegraph.fetchData(values);
  }
  render() {
    const { isLoading, data, current } = this.state;
    const timeType = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const orderStatus = [
      { value: '1 ', label: '1' },
      { value: '2', label: '2' },
    ];
    const refundStatus = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const payChannel = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const device = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    const paymentchannelone = this.state.Dropdownbox;
    const paymentchanneltwo = this.state.Dropdownboxson;
    const { Transactionfigures } = this.state;
    debugger;
    return (
      <div className='customsummary'>
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="自定义汇总">
            <div className=''>
              <div className='customsummary-top'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <Row wrap gutter="20">
                    <Col l="24">
                      <div style={styles.formItem}>
                        <span style={styles.formLabel}>商户ID：</span>
                        <FormBinder name="timeType"
                          autoWidth={false}
                        >
                          <Input style={styles.formSelect} dataSource={timeType} />
                        </FormBinder>
                        <span style={styles.formLabel}>所属行业：</span>
                        <FormBinder name='orderStatus'>
                          <Select style={styles.formSelect} dataSource={orderStatus} />
                        </FormBinder>
                        <span style={styles.formLabel}>支付渠道：</span>
                        <FormBinder name='channelId'>
                          <Select style={styles.formSpecial} dataSource={paymentchannelone} />
                        </FormBinder>
                        <FormBinder name="deviceId" >
                          <Select style={styles.formSelect} dataSource={paymentchanneltwo} />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary" onClick={this.search.bind(this)}>搜索</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>
              </div>
              <div className='selfsumm-exhibition'>
                <div className='exhibition-bor'>
                  <span>收入</span>
                  <div>
                    <strong>￥{Transactionfigures.incomeAmount}</strong>
                    {/* 300/笔 */}
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>成功率</span>
                  <div>
                    <strong>{Transactionfigures.successPercent}</strong>
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>退款</span>
                  <div>
                    <strong>￥{Transactionfigures.refundAmount}</strong>
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>付款</span>
                  <div>
                    <strong>￥{Transactionfigures.payMentAmount}</strong>
                  </div>
                </div>
                <div className='clearfix' />
              </div>
              <Linegraph ref='linegraph' />
            </div>
            <div className='outlay-panel' >
              <div className='' />
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}

const styles = {
  divMargin: {
    margin: '20px 0px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
  },
  formItemTwo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  formLabel: {
    textAlign: 'left',
    marginRight: '5px',
  },
  formSpecial: {
    width: '200px',
    marginRight: '10px',
  },
  formSelect: {
    width: '200px',
    marginRight: '25px',
  },
  formTime: {
    marginRight: '25px',
  },
  delbtn: {
    marginLeft: '20px',
  },
};
