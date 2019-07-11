// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '登录',
    path: '/',
    icon: 'home',
  },
  {
    name: '注册',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  /* {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
    children: [
      { name: '公司管理', path: '/manage/company', icon: 'set' },
      { name: '部门管理', path: '/manage/department', icon: 'lights' },
      { name: '团队管理', path: '/manage/team', icon: 'atm' },
    ],
  }, */
];

const asideMenuConfig = [
  {
    name: '产品',
    path: '/website/product',
    icon: 'account',
    children: [
      { name: '支付方式', path: '/website/product/mode', icon: 'account' },
      { name: '商业管理', path: '/website/product/administration', icon: 'account' },
    ],
  },

  {
    name: '帮助中心',
    path: '/website/helpcenter',
    icon: 'set',
    children: [
      { name: '快速开发', path: '/website/helpcenter/develop', icon: 'refresh' },
      { name: '会员系统', path: '/website/helpcenter/member', icon: 'refresh' },
      { name: '多级商户管理系统', path: '/website/helpcenter/multistage', icon: 'refresh' },
      { name: 'SDK下载', path: '/website/helpcenter/sdk', icon: 'refresh' },
    ],
  },
  {
    name: '解决方案',
    path: '/website/solution',
    icon: 'account',
    children: [
      { name: '物流行业解决方案', path: '/website/solution/logistics', icon: 'refresh' },
      { name: '电商行业解决方案', path: '/website/solution/retailers', icon: 'refresh' },
      { name: '交通出行解决方案', path: '/website/solution/traffic', icon: 'refresh' },
      { name: '跨境支付解决方案', path: '/website/solution/border', icon: 'refresh' },
    ],
  },
  {
    name: '论坛',
    path: '/website/special',
    icon: 'set',
  },
];

export { headerMenuConfig, asideMenuConfig };
