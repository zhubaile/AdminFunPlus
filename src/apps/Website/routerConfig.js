// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Index from './pages/Index/index';

import Mode from './pages/Prodect/Mode';
import Administration from './pages/Prodect/Administration';

import Logistics from './pages/Solution/Logistics';
import Retailers from './pages/Solution/Retailers';
import Traffic from './pages/Solution/Traffic';
import Border from './pages/Solution/Border';

import Develop from './pages/Helpcenter/Develop';
import Member from './pages/Helpcenter/Member';
import Multistage from './pages/Helpcenter/Multistage';
import Sdk from './pages/Helpcenter/Sdk';
import Experience from './pages/Demo/Demoexperience';
import DemoPay from './pages/Demo/Demopay';
import React from "react";

// const Login = React.lazy(() => import('../Website/index'));

const routerConfig = [
  {
    path: '/website/index', // 首页
    component: Index,
  },
  {
    path: '/website/product/mode', // 产品 支付方式
    component: Mode,
  },
  {
    path: '/website/product/administration', // 产品 商业管理
    component: Administration,
  },
  {
    path: '/website/solution/logistics', // 解决方案 物流
    component: Logistics,
  },
  {
    path: '/website/solution/retailers', //  电商
    component: Retailers,
  },
  {
    path: '/website/solution/traffic', //  交通
    component: Traffic,
  },
  {
    path: '/website/solution/border', // 跨境
    component: Border,
  },
  {
    path: '/website/helpcenter/develop', // 帮助 快速开发
    component: Develop,
  },
  {
    path: '/website/helpcenter/member', // 会员系统
    component: Member,
  },
  {
    path: '/website/helpcenter/multistage', // 多级商户
    component: Multistage,
  },
  {
    path: '/website/helpcenter/sdk', // SDK下载
    component: Sdk,
  },
  {
    path: '/website/demo/experience', // demo体验
    component: Experience,
  },
  {
    path: '/website/demo/pay', // demo支付
    component: DemoPay,
  },
];

// export default routerConfig;
export default [].concat(routerConfig, [{
  path: '/website/*',
  component: Index,
}]);
