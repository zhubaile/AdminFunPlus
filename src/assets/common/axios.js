import axios from 'axios';

import qs from 'qs';

const ajaxConfig = {
  timeout: 30000,
  withCredentials: true,
  urlPrefix: '/admin/web', // 请求本地的/admin/web，通过代理访问服务器的/admin
  // 此处错误
  // urlPrefix: 'http://funplus.yue-net.com:8888/admin/web', // 这样写就成跨域了，
  // urlPrefix: 'http://funplus.yue-net.com/admin/web',
};
// urlPrefix: 'http://192.168.1.118:3000/web/beta/v1.0',fog本地的
// http://192.168.1.113:3000/web/beta/v1.0   发送邮箱的接口
// http://192.168.1.122:3002/web/beta/v1.0/incomeList
const ajaxBase = (param) => {
  const axiosParam = Object.assign({
    // dataType: 'json',
    // urlencoded: true,
    //  headers: { 'content-type': 'application/x-www-form-urlencoded' },
    headers: { 'content-type': 'application/json' },
    timeout: ajaxConfig.timeout,
  }, param, {
    url: ajaxConfig.urlPrefix + param.url,
  });
  if (axiosParam.headers && (axiosParam.headers['content-type'] === 'application/x-www-form-urlencoded')) {
    axiosParam.data = qs.stringify(axiosParam.data);
  }
  return axios(axiosParam).then((params) => {
    if ((params.status === 200)) {
      const data = params.data;
      // 判断权限 还需添加
      // const appid = Cookies.get('userId');
      console.log(data);
      debugger;
      if (data.status === 401) {
      // if (!appid) {
        debugger;
        // 没有权限统一跳转到登录页面 非法请求
        // import { Input,Button , Grid, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch } from '@alifd/next';
        // alert('未登录的用户,请您先登录');
        // this.props.history.push('/backadminuser/login');
        window.location.href = "/backadminuser/login";
        // window.location.href = 'login.html';
        return {
          status: false,
          data: params.data,
        };
      }
      // 增加判断，data.data如果为null，则不返回
      return {
        status: (params.data.errCode === 0),
        data: params.data,
      };
    }
    return {
      status: false,
      data: {
        'status': 404,
        'message': '网络错误',
      },
    };
  });
};

const ajaxAmd = {
  ajax: ajaxBase,
  get: (param) =>{
    return ajaxBase(Object.assign({
      method: 'get',
    }, param));
  },
  post: (param) => {
    return ajaxBase(Object.assign({
      method: 'post',
    }, param));
  },
  put: (param) => {
    return ajaxBase(Object.assign({
      method: 'put',
    }, param));
  },
  delete: (param) => {
    return ajaxBase(Object.assign({
      method: 'delete',
    }, param));
  },
};
export default ajaxAmd;
