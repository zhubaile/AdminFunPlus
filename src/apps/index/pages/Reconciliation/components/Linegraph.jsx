/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Tab, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TransactionLinegraph from './TransactionLinegraph/TransactionLinegraph';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { verifybill } from '@indexApi';
import '../../index.css';
import moment from "moment/moment";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Linegraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuess: '',
      part: 'successTrade',
      datas: [],
    };
  }
  /* handleChange = (key) => {
    debugger;
    console.log('change', key);
  }; */
  componentDidMount() {
    this.fetchData();
  }
  /* shouldComponentUpdate(nextProps,nextState) {
    console.log(nextState);
    console.log(111);
    debugger;
  } */
  fetchData = (values) => {
    debugger;
    let startTime,
      endTime;
    if (values) {
      if (values.startdate.length == 2) {
        startTime = moment(values.startdate[0]._d).valueOf();
        endTime = moment(values.startdate[1]._d).valueOf();
      }
    }
    const part = this.state.part;
    debugger;
    verifybill({
      ...values,
      startTime,
      endTime,
      part,
    }).then(({ status,data })=>{
      debugger;
      if (data.errCode == 0) {
        this.setState({
          datas: data.data,
        });
      }
    });
  }
  // 交易选择框
  switchbtn(v) {
    const valuess = v.target.innerHTML;
    const part = v.target.id;
    this.setState({
      valuess,
      part,
    },
    ()=>{
      this.fetchData();
    });
    //
  }
  render() {
    const tradings = [
      { value: '成功交易额',label: 'successTrade' },
      { value: '成功订单量',label: 'successOrder' },
      { value: '发起交易量',label: 'submitTrade' },
      { value: '成功率',label: 'successPercent' },
      { value: '已退款总额',label: 'refund' },
      { value: '已付款',label: 'payMent' },
    ];
    const data = this.state.datas;
    /*  [
      { month: '一月', city: 'Tokyo', temperature: 70 },
      { month: '一月', city: 'London', temperature: 3.9 },
      { month: '一月', city: 'Zbl', temperature: 4 },
      { month: 'Feb', city: 'Tokyo', temperature: -30 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Feb', city: 'Zbl', temperature: 4 },
      { month: 'Mar', city: 'Tokyo', temperature: -50 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Mar', city: 'Zbl', temperature: 4 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'Apr', city: 'Zbl', temperature: 4 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'May', city: 'Zbl', temperature: 4 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jun', city: 'Zbl', temperature: 4 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Jul', city: 'Zbl', temperature: 4 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Aug', city: 'Zbl', temperature: 4 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Sep', city: 'Zbl', temperature: 4 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Oct', city: 'Zbl', temperature: 4 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Nov', city: 'Zbl', temperature: 4 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
      { month: 'Dec', city: 'Zbl', temperature: 4 },
    ]; */
    function marker(x, y, r, ctx) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.moveTo(x - r - 3, y);
      ctx.lineTo(x + r + 3, y);
      ctx.stroke();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.fill();
    }
    // X坐标的刻度
    const cols = {
      col: { min: 0, max: 300,tickCount: 11 },
      row: { range: [0, 1] },
    };
    const { part, valuess } = this.state;
    return (
      <IceContainer style={styles.card}>
        <div className='Trading-btn'>
          <ul>
            {
              tradings.map((item)=>{
                return (
                  <li id={item.label} className={item.label == part ? 'active' : null} onClick={this.switchbtn.bind(this)}>{item.value}</li>
                );
              })
            }
          </ul>
        </div>
        <Chart
          height={500}
          data={data}
          scale={cols}
          forceFit
          padding={[40, 35, 40, 35]}
        >
          <Axis dataKey="row" />
          <Axis dataKey="col" />
          <Tooltip crosshairs={{ type: 'y' }} />
          {/* <Legend marker={marker} /> */}
          {/* 用于连接点的线 */}
          <Geom type="line" position="row*col" color="des" size={2} shape="smooth" />
          {/* 根据数据生成的坐标点 */}
          <Geom
            type="point"
            position="row*col"
            color="des"
            size={4}
            shape="circle"
            style={styles.point}
          />
        </Chart>
      </IceContainer>
    );
  }
}

const styles = {
  card: {
    padding: '0 20px',
    marginTop: '30px',
  },
};
