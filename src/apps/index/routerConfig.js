import React from 'react';
import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

// 财会
// 实时数据-收入
const RealtimedataIncome = React.lazy(() => import('./pages/Realtimedata/RealtimedataIncome'));
// 实时数据-支出概况
const OutLay = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/OutLay')); // 支出
const Enterprisepayment = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/Enterprisepayment')); // 企业付款
const BusinessPaymentBatch = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/BusinessPaymentBatch')); // 批量付款
const Orderrefund = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/Orderrefund')); // 订单退款
const Batchrefund = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/Batchrefund')); // 批量退款

const PaymentReview = React.lazy(() => import('./pages/Realtimedata/Expenditureprofile/PaymentReview')); // 出款审核
// 对账
const ChannelReconciliation = React.lazy(() => import('./pages/Reconciliation/ChannelReconciliation')); // 渠道对账
const CustomSummary = React.lazy(() => import('./pages/Reconciliation/CustomSummary')); // 自定义汇总
const DaySummary = React.lazy(() => import('./pages/Reconciliation/DaySummary')); // 当日汇总
const TransactionReport = React.lazy(() => import('./pages/Reconciliation/TransactionReport')); // 交易报表
const ErrorTransaction = React.lazy(() => import('./pages/Reconciliation/ErrorTransaction')); // 差错交易
// 运营
// 应用管理
const ApplicationChannel = React.lazy(() => import('./pages/Applicationmanagement/Channelmanagement/ApplicationChannel')); // 应用渠道
const PlatformChannel = React.lazy(() => import('./pages/Applicationmanagement/Channelmanagement/PlatformChannel')); // 应用渠道

const EquipmentManagement = React.lazy(() => import('./pages/Applicationmanagement/Equipmentmanagement')); // 设备管理
// 路由规则概况
const RoutingRules = React.lazy(() => import('./pages/Applicationmanagement/Routingrulesoverview/RoutingRules')); // 路由规则（用户）
const PlatformRouting = React.lazy(() => import('./pages/Applicationmanagement/Routingrulesoverview/PlatformRouting')); // 平台路由覆盖
const Businessinformation = React.lazy(() => import('./pages/Businessinformation')); // 商户信息
// 团队权限（用户）
const Rolemanagement = React.lazy(() => import('./pages/Teamauthority/Rolemanagement')); // 角色管理
const Membermanagement = React.lazy(() => import('./pages/Teamauthority/Membermanagement')); // 成员管理
// 管理权限（后台）
const Rolepermissions = React.lazy(() => import('./pages/Administrativeauthority/Rolepermissions')); // 角色权限
const MemberManagement = React.lazy(() => import('./pages/Administrativeauthority/Membermanagement')); // 成员管理
// 服务
// 工单
const Allworkorders = React.lazy(() => import('./pages/Service/Workorder/Allworkorders')); // 工单
const Workorderdetails = React.lazy(() => import('./pages/Service/Workorder/Workorderdetails')); // 工单详情
const Realtimetion = React.lazy(() => import('./pages/Service/Realtimetion')); // 实时咨询
const HelpCenter = React.lazy(() => import('./pages/Service/HelpCenter')); // 帮助中心
const Invoice = React.lazy(() => import('./pages/Service/Invoice')); // 发票
// import { asideMenuConfig } from './pages/Service/Invoice';
// 管控
// 接口管理
// import { asideMenuConfig } from './pages/InterfaceManagement/Interfaceaccess/IpNamelist';
const ForeignAPI = React.lazy(() => import('./pages/InterfaceManagement/foreignAPI')); // 对外API
const Interfaceaccess = React.lazy(() => import('./pages/InterfaceManagement/Interfaceaccess')); // 接口访问白名单
const IpNamelist = React.lazy(() => import('./pages/InterfaceManagement/Interfaceaccess/IpNamelist')); // 接口访问白名单的ip管理
const InterfaceDocument = React.lazy(() => import('./pages/InterfaceManagement/InterfaceDocument')); // 接口文档
const Operationlog = React.lazy(() => import('./pages/Administrativeauthority/Operationlog')); // 管理台操作日志

const Siteconfiguration = React.lazy(() => import('./pages/Systemsettings/Siteconfiguration')); // 站点设置
const Mailboxsettings = React.lazy(() => import('./pages/Systemsettings/Mailboxsettings')); // 邮箱收发设置
const Smsgatewaysettings = React.lazy(() => import('./pages/Systemsettings/Smsgatewaysettings')); // 短信网关
const Qrcodegateway = React.lazy(() => import('./pages/Systemsettings/Qrcodegateway')); // 二维码网关
const Extremesetting = React.lazy(() => import('./pages/Systemsettings/Extremesetting'));// 极验设置
const Platformversion = React.lazy(() => import('./pages/Systemsettings/Platformversion')); // 平台版本
const Platforminitialization = React.lazy(() => import('./pages/Systemsettings/Platforminitialization')); // 平台初始化及系统搬家

const Useractionlog = React.lazy(() => import('./pages/Operationalassistance/Requestlog/Useractionlog'));
const Userapilog = React.lazy(() => import('./pages/Operationalassistance/Requestlog/Userapilog'));
/* 错误的信息 */
const Empty = React.lazy(() => import('./pages/Exception/Empty'));
const Forbidden = React.lazy(() => import('./pages/Exception/Forbidden'));
const NotFound = React.lazy(() => import('./pages/Exception/NotFound'));
const ServerError = React.lazy(() => import('./pages/Exception/ServerError'));

// ========系统首页============ //
const routerConfig = [
  {
    path: '/backadmin/realtimedata/realtimedataIncome',
    component: RealtimedataIncome,
  },
  {
    path: '/backadmin/Realtimedata/outLay',
    component: OutLay,
  },
  {
    path: '/backadmin/Realtimedata/enterprisepayment',
    component: Enterprisepayment,
  },
  {
    path: '/backadmin/Realtimedata/businessPaymentBatch',
    component: BusinessPaymentBatch,
  },
  {
    path: '/backadmin/Realtimedata/orderrefund',
    component: Orderrefund,
  },
  {
    path: '/backadmin/Realtimedata/batchrefund',
    component: Batchrefund,
  },
  {
    path: '/backadmin/Realtimedata/paymentReview',
    component: PaymentReview,
  },
  {
    path: '/backadmin/reconciliation/channelReconciliation',
    component: ChannelReconciliation,
  },
  {
    path: '/backadmin/reconciliation/customSummary',
    component: CustomSummary,
  },
  {
    path: '/backadmin/reconciliation/daySummary',
    component: DaySummary,
  },
  {
    path: '/backadmin/reconciliation/transactionReport',
    component: TransactionReport,
  },
  {
    path: '/backadmin/reconciliation/errortransaction',
    component: ErrorTransaction,
  },
  {
    path: '/backadmin/applicationmanagement/applicationChannel',
    component: ApplicationChannel,
  },
  {
    path: '/backadmin/applicationmanagement/platformChannel',
    component: PlatformChannel,
  },
  {
    path: '/backadmin/applicationmanagement/equipmentManagement',
    component: EquipmentManagement,
  },
  {
    path: '/backadmin/Applicationmanagement/routingRules',
    component: RoutingRules,
  },
  {
    path: '/backadmin/Applicationmanagement/platformRouting',
    component: PlatformRouting,
  },
  {
    path: '/backadmin/businessinformation',
    component: Businessinformation,
  },
  {
    path: '/backadmin/Teamauthority/rolemanagement',
    component: Rolemanagement,
  },
  {
    path: '/backadmin/Teamauthority/membermanagement',
    component: Membermanagement,
  },
  {
    path: '/backadmin/Administrativeauthority/rolepermissions',
    component: Rolepermissions,
  },
  {
    path: '/backadmin/Administrativeauthority/memberManagement',
    component: MemberManagement,
  },
  {
    path: '/backadmin/service/allworkorders',
    component: Allworkorders,
  },
  {
    path: '/backadmin/service/workorderdetails',
    component: Workorderdetails,
  },
  {
    path: '/backadmin/service/realtimetion',
    component: Realtimetion,
  },
  {
    path: '/backadmin/service/invoice',
    component: Invoice,
  },
  {
    path: '/backadmin/service/helpCenter',
    component: HelpCenter,
  },
  {
    path: '/backadmin/interfaceManagement/foreignAPI',
    component: ForeignAPI,
  },
  {
    path: '/backadmin/interfaceManagement/interfaceaccess',
    component: Interfaceaccess,
  },
  {
    path: '/backadmin/interfaceManagement/ipNamelist',
    component: IpNamelist,
  },
  {
    path: '/backadmin/interfaceManagement/interfaceDocument',
    component: InterfaceDocument,
  },
  {
    path: '/backadmin/Administrativeauthority/operationlog',
    component: Operationlog,
  },
  {
    path: '/backadmin/Systemsettings/siteconfiguration',
    component: Siteconfiguration,
  },
  {
    path: '/backadmin/Systemsettings/mailboxsettings',
    component: Mailboxsettings,
  },
  {
    path: '/backadmin/Systemsettings/smsgatewaysettings',
    component: Smsgatewaysettings,
  },
  {
    path: '/backadmin/Systemsettings/qrcodegateway',
    component: Qrcodegateway,
  },
  {
    path: '/backadmin/Systemsettings/extremesetting',
    component: Extremesetting,
  },
  {
    path: '/backadmin/Systemsettings/platformversion',
    component: Platformversion,
  },
  {
    path: '/backadmin/Systemsettings/platforminitialization',
    component: Platforminitialization,
  },
  {
    path: '/backadmin/Operationalassistance/useractionlog',
    component: Useractionlog,
  },
  {
    path: '/backadmin/Operationalassistance/Userapilog',
    component: Userapilog,
  },
  {
    path: '/backadmin/exception/500',
    component: ServerError,
  },
  {
    path: '/backadmin/exception/403',
    component: Forbidden,
  },
  {
    path: '/backadmin/exception/204',
    component: Empty,
  },
  {
    path: '/backadmin/exception/404',
    component: NotFound,
  },
  {
    path: '/backadmin/*',
    component: NotFound,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };

