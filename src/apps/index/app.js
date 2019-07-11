/*
import React,{ Component } from 'react';
import { actions, reducers, connect } from '@indexStore';
import { HashRouter as Router } from 'react-router-dom';
import Store from './store/index';
// import { IntlProvider } from 'react-intl';
import router from './router';
import { IntlProvider, addLocaleData } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import zh from 'react-intl/locale-data/zh';
import localeObj from './locale/combin';
import BasicLayout from './layouts/BasicLayout';


// addLocaleData([...en, ...zh]);
class App extends Component {
  render() {
    const { Locale } = this.props;
    return (
      <IntlProvider locale={ Locale} messages={localeObj[Locale]}>
        <Router>
          <BasicLayout>
            {router}
          </BasicLayout>
        </Router>
      </IntlProvider>
    );
  }
}

export default connect(
  (state) => {
    return { Locale: state.Locale };
  }
)(App);

*/
