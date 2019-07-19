import axios from 'axios';

import qs from 'qs';

const ajaxConfig = {
  timeout: 30000,
  withCredentials: true,
  urlPrefix: '/admin', // 请求本地的/admin，通过代理访问服务器的/admin
  // 此处错误
  // urlPrefix: 'http://192.168.1.118:3000/web/beta/v1.0', // 这样写就成跨域了，
  // urlPrefix: 'http://funplus.yue-net.com/web/beta/v1.0',
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
      if (data.status === 401) {
        // 没有权限统一跳转到登录页面 非法请求
        window.location.href = 'login.html';
        return {
          status: false,
          data: params.data,
        };
      }
      return {
        status: (params.data.status === 200),
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
