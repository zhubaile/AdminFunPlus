/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import { FormattedMessage, injectIntl } from 'react-intl';
import { loginUser } from '@loginApi';
import IceImg from '@icedesign/img';

@withRouter
  @injectIntl
class SetNewPassword extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
      type: 'password',
    };
  }
  /* 文本框输入内容的事件 */
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  /* 登录按钮的出发时间 */
  handleSubmit=(e)=> {
    e.preventDefault();// 如果删除此行，表单将自动提交
    this.refs.form.validateAll((errors, values) => {
      // values.username为账号框的内容
      // 可在此处添加ajax方法
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { intl } = this.props;
      // 访问登录接口
      loginUser({
        username: values.username,
        password: values.password,
      }).then(
        ({ status, data }) => {
          if (data.errCode == 0) {
            console.log(values);
            Message.success(intl.formatMessage({ id: 'app.login.Login successfully' }));
            this.props.history.push('/admin/income');
            window.location.href = "";
          } else {
            Message.success(data.message);
          }
        }
      ).catch(
        ({ status, data }) => {
          console.log(values);
          Message.success('登录失败');
          // this.props.history.push('/user/login');
        }
      );
      // const { intl } = this.props;
      // Message.success(intl.formatMessage({ id: 'app.login.Login successfully' }));
      // this.props.history.push('/');  //可以添加配置的路由为跳转
      // Message.success("登录成功");
      // window.location.href = "index.html"; // 跳转到中后台界面
      // window.open('index.html');    //打开新的窗口
    });
  }

  // 点击显示和隐藏密码的按钮
  showPassword() {
    this.setState({
      type: this.state.type === 'password' ? 'text' : 'password',
    });
  }
  render() {
    const { intl } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <p style={styles.prompt}>请在此填写你的信息和联系方式</p>
          <div style={styles.icon}>
            <img src={require('@img/login/suo.png')} />
          </div>
          <h4 style={styles.title}>
            密码找回
             {/*<FormattedMessage id='app.login.sign.in' />*/}
          </h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <div style={styles.formItem}>
                <FormattedMessage id='app.login.pass.errormessage'>
                  {txt => (
                    <IceFormBinder name="username" required message={txt}>
                      <Input
                        hasClear
                        htmlType={this.state.type}
                        size="large"
                        maxLength={20}
                        placeholder='新密码'
                        style={styles.inputCol}
                      />
                    </IceFormBinder>
                  )}
                </FormattedMessage>
                <IceFormError name="username" />
              </div>

              <div style={styles.formItem}>
                <FormattedMessage id='app.login.pass.errormessage'>
                  {txt => (
                    <IceFormBinder name="password" required message={txt}>
                      <Input
                        size="large"
                        htmlType={this.state.type}
                        placeholder='确认密码'
                        style={styles.inputCol}
                      />
                    </IceFormBinder>
                  )}
                </FormattedMessage>
                <IceFormError name="password" />
              </div>
              <div style={styles.footer}>
                <Button
                  type="primary"
                  size="large"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  提交
                   {/*<FormattedMessage id='app.login.sign.in' />*/}
                </Button>
              </div>
            </div>
          </IceFormBinderWrapper>
        </div>
        <div style={styles.right}>
          <div style={styles.box}>
            <IceImg
              src={require('@img/login/tel.png')}
            />
            <p> <FormattedMessage id='app.login.Tel.consult' /></p>
            <a>000-1111-2222</a>
          </div>
          <div style={styles.box}>
            <IceImg
              src={require('@img/login/email.png')}
            />
            <p><FormattedMessage id='app.login.Mail.box' /></p>
            <a>YanYue@3FunPlus.com</a>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '700px',
    padding: '40px',
    background: '#fff',
    borderRadius: '10px',
    marginTop: '-60px',
    border: '#cccccc 1px solid',
    display: 'flex',
  },
  left: {
    float: 'left',
    // width: '350px',
    paddingRight: '30px',
    borderRight: '#ccc 1px solid',
    flexGrow: '1',
  },
  title: {
/*    margin: '0 0 40px',*/
    color: 'rgba(0,162,251,1)',
    fontSize: '18px',
    fontWeight: '400',
    fontFamily: 'MicrosoftYaHei',
    textAlign: 'center',
    marginBlockStart: '0.8em',
    marginBlockEnd: '0.8em',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '10px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    borderRadius: '10px',
    /*    paddingLeft: '20px', */
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
  right: {
    float: 'left',
    // width: '250px',
    flexGrow: '1',
  },
  box: {
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
  },
  prompt: {
    fontSize: '14px',
    fontFamily: 'MicrosoftYaHei',
    fontWeight: '400',
    color: 'rgba(102,102,102,1)',
    lineHeight: '22px',
    paddingBottom: '15px',
  },
  icon: {
    textAlign: 'center',
  },
};

export default SetNewPassword;
