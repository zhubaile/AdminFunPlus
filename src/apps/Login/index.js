import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Store from './store/index';
import router from './router';
import UserLayout from './layouts/UserLayout';
import LanguageProvider from '../../assets/Internationalization/LocaleProvider';
import { getLocale } from '../../assets/Internationalization/locale';

import {
  Provider,
} from 'react-redux';

const CONTAINER = document.getElementById('root');
const store = Store({});
const locale = getLocale();
if (!CONTAINER) {
  throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(
  <LanguageProvider locale={locale}>
    <Provider store={store} >
      <Router>
        <UserLayout>
          {
            router
          }
        </UserLayout>
      </Router>
    </Provider>
  </LanguageProvider>,
  CONTAINER
);
