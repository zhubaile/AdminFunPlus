
import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter as Router } from 'react-router-dom';
import Store from './store/index';
// import router from './router';
// import App from './app';
import {
  Provider,
} from 'react-redux';
// 引入默认全局样式
import '@alifd/next/reset.scss';
import LanguageProvider from '../../assets/Internationalization/LocaleProvider';
import { getLocale } from '../../assets/Internationalization/locale';
import { BrowserRouter as Router } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import router from "./router";
import moment from 'moment';

const locale = getLocale();
const CONTAINER = document.getElementById('root');
const store = Store({});
if (!CONTAINER) {
  throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}
moment.locale(locale);
ReactDOM.render(
  // 国际化语言
  <LanguageProvider locale={locale}>
    <Provider store={store} >
      <Router>
        <BasicLayout>
          {router}
        </BasicLayout>
      </Router>
    </Provider>
  </LanguageProvider>,
  CONTAINER
);
