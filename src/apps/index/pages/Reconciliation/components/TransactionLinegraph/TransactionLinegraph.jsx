import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class TransactionLinegraph extends Component {
  static displayName = 'Linegraph';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    // 数据源
    const data = [
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
    ];
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
      temperature: { min: -100, max: 100,tickCount: 11 },
      month: { range: [0, 1] },
    };

    return (
      <div className="basic-line">
        <Chart
          height={500}
          data={data}
          scale={cols}
          forceFit
          padding={[40, 35, 40, 35]}
        >
          <Axis dataKey="month" />
          <Axis dataKey="temperature" />
          <Tooltip crosshairs={{ type: 'y' }} />
          {/* <Legend marker={marker} /> */}
          {/* 用于连接点的线 */}
          <Geom type="line" position="month*temperature" color="city" size={2} shape="smooth" />
          {/* 根据数据生成的坐标点 */}
          <Geom
            type="point"
            position="month*temperature"
            color="city"
            size={4}
            shape="circle"
            style={styles.point}
          />
        </Chart>
      </div>
    );
  }
}

const styles = {
  point: {
    stroke: '#fff',
    lineWidth: 1,
  },
};
