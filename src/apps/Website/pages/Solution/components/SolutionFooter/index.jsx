import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'; // 国际化
import { Button, Icon, Nav } from '@alifd/next';

export default class SolutionFooter extends Component {
  static displayName = 'SolutionFooter';

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={styles.container}>
        <h1 style={{ color: '#fff' }}>
          <FormattedMessage id='app.website.jiejue.footer.h1' /></h1>
        <Button style={{ borderRadius: '20px' , color: '#00A2F6', marginTop: '50px', width: '120px', height: '30px' }}><FormattedMessage id='app.website.jiejue.footer.Button' /></Button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '300px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#3978ff',
  },
};
