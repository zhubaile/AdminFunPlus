import React from 'react';
import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize
import '@alifd/next/reset.scss';
// import { HashRouter as Router } from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom';

import {
  Provider,
} from 'react-redux';
// 引入默认全局样式
import LanguageProvider from '../../assets/Internationalization/LocaleProvider';
import { getLocale } from '../../assets/Internationalization/locale';
import BasicLayout from './layouts/BasicLayout'; // 中后台界面布局
import router from './router';
import Store from "../index/store";

const locale = getLocale();
const store = Store({});
const ICE_CONTAINER = document.getElementById('root');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(
  <LanguageProvider locale={locale}>
    <Provider store={store}>
      <Router>
        <BasicLayout>{router}</BasicLayout>
      </Router>
    </Provider>
  </LanguageProvider>
  , ICE_CONTAINER);
