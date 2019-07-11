import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
// import IceContainer from '@icedesign/container';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import Linegraph from '../components/Linegraph';
import '../../index.css';
// import Check from "../../Backstageworkorder/Workorderdetails/Check/index";
// import SelectLang from "../../../../Internationalization/SelectLang/SelectLang";

const { Item } = MenuButton;
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['花果山'],
      time: '20190606',
      order: '02456245',
      remark: ['贵'],
      balance: '￥100.00',
      email: ['支付中'],
      tel: ['￥100.00'],
      role: [' ￥100.00'],
      status: '支付宝wap',
      oper: ['查看'],
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class CustomSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      value: {
        jiaose: '角色',
        haoma: '',
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
        device: '',
        out_trade_no: '',
      },
    };
  }

  componentDidMount() {
    debugger;
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => { // data 里面为数据
          debugger;
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

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
  renderOper = () => {
    return (
      <div>
        <Switch size='small' className='div-switch' defaultChecked={false} />
      </div>
    );
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange=(value)=>{
    debugger;
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
                  <Row wrap gutter="20" style={styles.formRow}>
                    <Col l="24">
                      <div style={styles.formItem}>
                        <span style={styles.formLabel}>商户ID:</span>
                        <FormBinder name="timeType"
                          autoWidth={false}
                        >
                          <Input style={styles.formInput} dataSource={timeType} />
                        </FormBinder>
                        <span style={styles.formLabel}>所属行业：</span>
                        <FormBinder name='orderStatus'>
                          <Select style={styles.formSelect} dataSource={orderStatus} />
                        </FormBinder>
                        <span style={styles.formLabel}>支付渠道：</span>
                        <FormBinder name='payChannel'>
                          <Select style={styles.formSelect} dataSource={payChannel} />
                        </FormBinder>
                        <FormBinder name="device" >
                          <Select style={{ width: '200px' }} dataSource={device} />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary">搜索</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>
              </div>
              <div className='selfsumm-exhibition'>
                <div className='exhibition-bor'>
                  <span>收入</span>
                  <div>
                    <strong>￥30000</strong>300/笔
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>成功率</span>
                  <div>
                    <strong>100%</strong>
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>退款</span>
                  <div>
                    <strong>￥3999</strong>
                  </div>
                </div>
                <div className='exhibition-bor'>
                  <span>付款</span>
                  <div>
                    <strong>￥3999</strong>
                  </div>
                </div>
                <div className='clearfix' />
              </div>
              <Linegraph />
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
    minWidth: '80px',
    marginLeft: '10px',
    textAlign: 'center',
  },
  formSelect: {
    width: '200px',
    margin: '0 10px',
  },
  formInput: {
    margin: '0 10px',
  },
  delbtn: {
    marginLeft: '20px',
  },
};
