import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { Grid } from '@alifd/next';
import Footer from './components/Footer';
import Header from './components/Header';
import Intro from './components/Intro';
import routerData from '../../routerConfig';
// import PageLoading from '../../components/PageLoading';
import MainRoutes from './MainRoutes';
import IceImg from '@icedesign/img';

const { Row, Col } = Grid;

@withRouter
export default class UserLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.bgstyle} >
          <div style={styles.lcircular} />
          <div style={styles.scircular} />
          <div style={styles.mcircular} />
        </div>
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
    minHeight: '100vh',
    paddingBottom: '62px',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: '1',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgstyle: {
    position: 'relative',
    width: '100%',
    height: '300px',
    background: 'linear-gradient(to right, #5372c5, #b7a1fe)',
  },
  lcircular: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    position: 'absolute',
    top: '30%',
    left: '55%',
    background: '#AAC9F6',
  },
  scircular: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    position: 'absolute',
    top: '60%',
    left: '75%',
    background: '#AAC9F6',
  },
  mcircular: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    position: 'absolute',
    top: '20%',
    left: '85%',
    background: '#F6F7CA',
  },
};
