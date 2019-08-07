/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button,Calendar,Tab } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../index.css';
import moment from 'moment';


const currentDate = moment();
const year = currentDate.year();
const month = currentDate.month();
const localeData = currentDate.clone().localeData(); // clone()克隆  localeData 语言设置
const monthLocale = localeData.monthsShort(); // 返回月份的缩写
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class TransactionReport extends Component {
  state = {
    Particularyear: year,
    Month: month,
    datas: [
      { type: 'kexiazai', content: '28' },
      { type: 'kexiazai', content: '1' },
      { type: 'kexiazai', content: '3' },
      { type: 'duizhangwanbi', content: '15' },
      { type: 'youchacuo', content: '13' },
    ],
  };

  formChange = (value) => {
    this.props.onChange(value);
  };

  // 选择日期值
  onMonthCellRender(value) {
    const years = value.year();
    const months = value.month();
    this.setState({
      Particularyear: years,
      Month: months,
      value: {
        merchantId: '',
        name: '',
        startdate: [],
      },
    });
  }
  // 日份
  dateCellRender(date) {
    const dateNum = date.date();
    console.log(dateNum);
    const datas = this.state.datas;
    if (this.state.Month !== date.month()) {
      return dateNum;
    }
    return (<div className="custom-calendar-cell">
      <div className="custom-calendar-cell-value">{dateNum}</div>
      <div className="custom-calendar-cell-content">
        <ul className="event-list">
          {/* {eventList.map((item, key) => <li className={`${item.type}-event`} key={key} >{item.content}</li>)} */}
          {
            datas.map((item,key) => {
             return (item.content == dateNum ? <li className={`${item.type}-event`} key={key} >{item.content}</li> : null);
            })
          }
        </ul>
      </div>
    </div>);
  }
  // 月份
  monthCellRender(date) {
    debugger;
    if (this.state.Month === date.month()) {
      debugger;
      return (<div style={{ color: 'red' }}>
        <div>{monthLocale[this.state.Month]}</div>
        <div>Events</div>
      </div>);
    }
    console.log(monthLocale[date.month()]);
    return monthLocale[date.month()];
  }
  render() {
    return (
      <div className='transactionreport'>
        <Tab shape='pure'>
          <Tab.Item title="交易报表">
            <div className='transactionreport-content'>
              <div className='daysummary-top'>
                <FormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
                >
                  <Row wrap gutter="20" style={styles.formRow}>
                    <Col l="24">
                      <div style={styles.formItem}>
                        <span style={styles.formLabel}>商户ID：</span>
                        <FormBinder name="merchantId"
                          autoWidth={false}
                        >
                          <Input style={styles.formSelect} />
                        </FormBinder>
                        <span style={styles.formLabel}>企业名称：</span>
                        <FormBinder name="name"
                          autoWidth={false}
                        >
                          <Input style={styles.formSpecial} />
                        </FormBinder>
                        <FormBinder name='startdate'>
                          <RangePicker style={styles.formTime} className='showHour' showTime resetTime />
                        </FormBinder>
                        <Button className='btn-all bg' size="large" type="secondary">查询</Button>
                        <Button className='btns-all' size="large" type="secondary">月报表下载</Button>
                        <Button className='btns-all' size="large" type="secondary">日报表下载</Button>
                      </div>
                    </Col>
                  </Row>
                </FormBinderWrapper>
              </div>
              <div className='transactionreport-content-top'>
                <ul>
                  <li>
                    <span className='kexiazai' />
                    <span>可下载</span>
                  </li>
                  <li>
                    <span className='weishengcheng' />
                    <span>未生成</span>
                  </li>
                  <li>
                    <span className='wujiaoyi' />
                    <span>无交易</span>
                  </li>
                  <li>
                    <span className='youchacuo' />
                    <span>有差错未解决</span>
                  </li>
                  <li>
                    <span className='duizhangwanbi' />
                    <span>对账完毕</span>
                  </li>
                </ul>
              </div>
              <div className='transactionreport-content-calendar'>
                <Calendar style={{ width: '900px', padding: '12px', border: '1px solid #C4C6CF', borderRadius: '3px' }}
                  shape="fullscreen"
                  onVisibleMonthChange={this.onMonthCellRender.bind(this)}
                  dateCellRender={this.dateCellRender.bind(this)}
                  monthCellRender={this.monthCellRender.bind(this)}
                />
              </div>
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}

const styles = {
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
};
