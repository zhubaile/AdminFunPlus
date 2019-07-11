import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';
import profile from './profile';
import chart from './chart';
import table from './table';
import list from './list';
import menu from './menu';

import login from './Login/login'; // 登录界面翻译
import website from './Website/index'; // 官网导航翻译
import wshouwy from './Website/shouye'; // 官网首页翻译
import wchanpin from './Website/chanpin'; // 官网产品翻译
import whelp from './Website/help'; // 官网帮助中心翻译
import wjiejue from './Website/jiejue'; // 官网解决方案翻译
import wdemo from './Website/demo'; // 官网demo翻译

export default {
  'app.btn.edit': '编辑',
  'app.btn.delete': '删除',
  'app.btn.detail': '详情',
  'app.btn.add': '新增',
  'app.zbl.tiaokuan': '条款',
  'app.zbl.a': '我最牛逼不接受反驳',
  ...menu,
  ...table,
  ...chart,
  ...result,
  ...dashboard,
  ...setting,
  ...exception,
  ...profile,
  ...list,
  ...login,
  ...website,
  ...wshouwy,
  ...wchanpin,
  ...whelp,
  ...wjiejue,
  ...wdemo,
};
