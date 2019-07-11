/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import { FormattedMessage, injectIntl } from 'react-intl';
import { sendMailbox } from '@loginApi';

@injectIntl
@withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      // ajax方法
      sendMailbox({
        email: values.email,
      }).then(
        ({ status, data }) => {
          debugger;
          if (data.errCode == 0) {
            console.log(values);
            Message.success('请注意查收邮件');
          } else {
            Message.success(data.message);
          }
        }
      );
      // 可以再请求成功以后执行这个
      // Message.success('请您注意查收邮件');
    /*  console.log(values);
      Message.success('已发送');
      this.props.history.push('/register'); */
    });
  };

  render() {
    const { intl } = this.props;
    return (
      <div style={styles.container}>
        <p style={styles.prompt}>请在此填写你的信息和联系方式</p>
        <h4 style={styles.title}>
          <FormattedMessage id='app.register.register' />
        </h4>
        <div style={styles.usermessage}>
          <FormattedMessage id='app.sendregister.information' />
        </div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="mail" size="large" style={styles.inputIcon} />
              <FormattedMessage id='app.sendregister.user.errormessage'>
                {txt => (
                  <IceFormBinder type="email" name="email" required message={txt}>
                    <Input
                      hasClear
                      size="large"
                      maxLength={20}
                      placeholder={ intl.formatMessage({ id: 'app.sendregister.mailbox' }) }
                      style={styles.inputCol}
                    />
                  </IceFormBinder>
                )}
              </FormattedMessage>
              <IceFormError name="email" />
            </div>
            <div className="footer">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                size="large"
              >
                <FormattedMessage id='app.sendregister.send' />
              </Button>
              <Link to="/user/login" style={styles.tips}>
                <FormattedMessage id='app.sendregister.newaccount' />
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
    marginTop: '-60px',
    border: '#cccccc 1px solid',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '8px',
    top: '8px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '30px',
  },
  submitBtn: {
    width: '100%',
    height: '40px',
    borderRadius: '8px',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
  usermessage: {
    lineHeight: '30px',
    margin: '8px 0 20px 0',
    textIndent: '2em',
  },
  prompt: {
    fontSize: '14px',
    fontFamily: 'MicrosoftYaHei',
    fontWeight: '400',
    color: 'rgba(102,102,102,1)',
    lineHeight: '22px',
    paddingBottom: '15px',
  },
};

export default UserRegister;
