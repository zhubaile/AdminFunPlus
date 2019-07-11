
import User from './user';// 用户中心
import Test from './test'; // 测试
import Locale from './locale'; // 测试
import { connect as reduxConnect } from 'react-redux';


export const connect = reduxConnect;
export const reducers = {
  User: User.reducer,
  Test: Test.reducer,
  Locale: Locale.reducer,
};
export const actions = {
  User: { ...User.actions },
  Test: { ...Test.actions },
  Locale: { ...Locale.actions },
};

