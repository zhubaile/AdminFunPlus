import React, { Component } from 'react';
import cx from 'classnames';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Nav, Icon } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup,
} from '@icedesign/styled-menu';
// import { FormattedMessage } from 'react-intl';
// import { asideMenuConfig } from '../../../../menuConfig';
import '../Header/index.scss'; // icon 样式
import './index.scss';

const { Item, SubNav } = Nav;
@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    const {
      location: { pathname },
      isMobile,
      status,
    } = this.props;

    const { openDrawer, collapse } = this.state;
    return (
      <div className='headaside'>
        {
          status == 0 ? (
            <StyledMenu
              // style={{ width: '259px' }}
              // defaultOpenKeys={['sub1']}
              mode='inline'
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    {/* <Icon type="filter" /> */}
                    <i className="os-icon os-icon-coins-4" />
                    <span>实时数据</span>
                  </span>
                }
              >
                <MenuItem key="1"><Link to="/backadmin/realtimedata/realtimedataIncome">收入</Link></MenuItem>
                <SubMenu key="sub3" title="支出概况">
                  <MenuItem key="2"><Link to="/backadmin/Realtimedata/outLay">支出</Link></MenuItem>
                  <MenuItem key="3"><Link to="/backadmin/Realtimedata/paymentReview">出款审核</Link></MenuItem>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <i className="os-icon os-icon-coins-4" />
                    <span>对账</span>
                  </span>
                }
              >
                <MenuItem key="4"><Link to="/backadmin/reconciliation/customSummary">自定义汇总</Link></MenuItem>
                <MenuItem key="5"><Link to="/backadmin/reconciliation/channelReconciliation">渠道对账</Link></MenuItem>
                <MenuItem key="6"><Link to="/backadmin/reconciliation/errortransaction">差错交易</Link></MenuItem>
                <MenuItem key="7"><Link to='/backadmin/reconciliation/daySummary'>当日汇总</Link></MenuItem>
                <MenuItem key="8"><Link to="/backadmin/reconciliation/transactionReport">交易报表</Link></MenuItem>
              </SubMenu>
            </StyledMenu>
          ) : null
        }
        {
          status == 1 ? (
            <StyledMenu
              // style={{ width: '259px' }}
              // defaultOpenKeys={['sub1']}
              mode='inline'
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    {/* <Icon type="filter" /> */}
                    <i className="os-icon os-icon-coins-4" />
                    <span>应用管理</span>
                  </span>
                }
              >
                <SubMenu key="sub3" title="渠道管理">
                  <MenuItem key="1"><Link to="/backadmin/applicationmanagement/applicationChannel">应用渠道</Link></MenuItem>
                  <MenuItem key="2"><Link to="/backadmin/applicationmanagement/platformChannel">平台渠道</Link></MenuItem>
                </SubMenu>
                <MenuItem key="3"><Link to="/backadmin/applicationmanagement/equipmentManagement">设备管理</Link></MenuItem>
                <SubMenu key="sub4" title="路由规则概况">
                  <MenuItem key="4"><Link to="/backadmin/Applicationmanagement/routingRules">路由规则</Link></MenuItem>
                  <MenuItem key="5"><Link to="/backadmin/Applicationmanagement/platformRouting">平台路由覆盖</Link></MenuItem>
                </SubMenu>
              </SubMenu>

              <SubMenu
                className='cancel'
                key="sub2"
                title={
                  <span>
                    <Link to="/backadmin/businessinformation">
                      <i className="os-icon os-icon-coins-4" />
                      <span>商户信息</span>
                    </Link>
                  </span>
                }
              />

            </StyledMenu>
          ) : null
        }
        {
          status == 2 ? (
            <StyledMenu
              // style={{ width: '259px' }}
              // defaultOpenKeys={['sub1']}
              mode='inline'
            >
              <SubMenu
                className='cancel'
                key="sub1"
                title={
                  <span>
                    <Link to='/backadmin/service/realtimetion'>
                      <i className="os-icon os-icon-coins-4" />
                      <span>实时咨询</span>
                    </Link>
                  </span>
                }
              />
              <SubMenu
                className='cancel'
                key="sub2"
                title={
                  <span>
                    <Link to='/backadmin/service/allworkorders'>
                      <i className="os-icon os-icon-coins-4" />
                      <span>工单管理</span>
                    </Link>
                  </span>
                }
              >
                {/*  <MenuItem key="1"><Link to='/backadmin/service/allworkorders'>工单管理</Link></MenuItem>
                <MenuItem key="2"><Link to='/backadmin/service/workorderdetails'>详情</Link></MenuItem> */}
              </SubMenu>
              <SubMenu
                className='cancel'
                key="sub3"
                title={
                  <span>
                    {/* <Icon type="filter" /> */}
                    <Link to='/backadmin/service/invoice'>
                      <i className="os-icon os-icon-coins-4" />
                      <span>发票</span>
                    </Link>
                  </span>
                }
              />
              <SubMenu
                className='cancel'
                key="sub4"
                title={
                  <span>
                    {/* <Icon type="filter" /> */}
                    <Link to='/backadmin/service/helpCenter'>
                      <i className="os-icon os-icon-coins-4" />
                      <span>帮助中心</span>
                    </Link>
                  </span>
                }
              />
            </StyledMenu>
          ) : null
        }
        {
          status == 3 ? (
            <StyledMenu
              // style={{ width: '259px' }}
              // defaultOpenKeys={['sub1']}
              mode='inline'
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    {/* <Icon type="filter" /> */}
                    <i className="os-icon os-icon-coins-4" />
                    <span>接口管理</span>
                  </span>
                }
              >
                <MenuItem key="1"><Link to='/backadmin/interfaceManagement/foreignAPI'>对外API</Link></MenuItem>
                <MenuItem key="2"><Link to='/backadmin/interfaceManagement/interfaceDocument'>接口文档</Link></MenuItem>
                <MenuItem key="3"><Link to='/backadmin/interfaceManagement/interfaceaccess'>接口访问白名单</Link></MenuItem>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <i className="os-icon os-icon-coins-4" />
                    <span>团队权限</span>
                  </span>
                }
              >
                <MenuItem key="4"><Link to="/backadmin/Teamauthority/rolemanagement">角色管理</Link></MenuItem>
                <MenuItem key="5"><Link to="/backadmin/Teamauthority/membermanagement">成员管理</Link></MenuItem>
                <MenuItem key="6">管理台操作日志</MenuItem>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <i className="os-icon os-icon-coins-4" />
                    <span>系统设置</span>
                  </span>
                }
              >
                <MenuItem key="7">站点设置</MenuItem>
                <MenuItem key="8">邮箱收发设置</MenuItem>
                <MenuItem key="9">短信网关</MenuItem>
                <MenuItem key="10">二维码网关</MenuItem>
                <MenuItem key="11">极验设置</MenuItem>
                <MenuItem key="12">平台版本</MenuItem>
                <MenuItem key="13">平台初始化及系统搬家</MenuItem>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <i className="os-icon os-icon-coins-4" />
                    <span>运营辅助</span>
                  </span>
                }
              >
                <SubMenu key="sub6" title="请求日志log">
                  <MenuItem key="14">用户操作日志</MenuItem>
                  <MenuItem key="15">用户API日志</MenuItem>
                </SubMenu>
                <MenuItem key="16">接口测试</MenuItem>
                <MenuItem key="17">数据维护</MenuItem>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <i className="os-icon os-icon-coins-4" />
                    <span>高级工具</span>
                  </span>
                }
              >
                <MenuItem key="18">渠道可视化添加</MenuItem>
                <MenuItem key="19">渠道逻辑可视化调整</MenuItem>
                <MenuItem key="20">自定义路由设计</MenuItem>
              </SubMenu>
            </StyledMenu>
          ) : null
        }
        <div className="side-menu-magic">
          <h4>
            3FunPlus企业版
          </h4>
          <p>
            高性能支持
          </p>
          <div className="btn-w">
            <a className="btn btn-white btn-rounded" href="" target="_blank">立刻升级</a>
          </div>
        </div>
      </div>
    );
  }
}
