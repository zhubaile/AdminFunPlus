import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@alifd/next';
import Footer from './components/Footer';
import Header from './components/Header';
import Intro from './components/Intro';
import routerData from '../../routerConfig';
// import PageLoading from '../../components/PageLoading';
import MainRoutes from './MainRoutes';
import IceImg from '@icedesign/img';

const { Row, Col } = Grid;

export default class UserLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Header />
        <img src={require('@img/login/zbg.png')} />
        <Row wrap style={styles.row}>
          <Col l="12">
            <div style={styles.form}>
              <Suspense>
                <Switch>
                  {routerData.map((item, index) => {
                    return item.component ? (
                      <Route
                        key={index}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                      />
                    ) : null;
                  })}
                  {/* <Redirect exact from="/" to="/user/login" /> */}
                  <MainRoutes />
                </Switch>
              </Suspense>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',

    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: '1',
    marginTop: '-30px;',

    // background:'#fff',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
