import dashboard from './dashboard';
import setting from './setting';
import exception from './exception';
import result from './result';
import profile from './profile';
import chart from './chart';
import table from './table';
import list from './list';
import menu from './menu';
import login from './Login/login';

export default {
  'app.btn.edit': 'Edit',
  'app.btn.delete': 'Delete',
  'app.btn.detail': 'Detail',
  'app.btn.add': 'Add',
  'app.zbl.tiaokuan': 'tiaokuan',
  'app.zbl.a': 'woasdasdaksda',
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
};
