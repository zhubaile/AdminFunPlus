
import ajaxAmd from '@ajax';
// 引用的为assets文件夹下的common的axios
// 以下为示例

// 登录接口
export async function loginUser(params) {
  return ajaxAmd.post({
    url: '/user/login',
    data: params ,
  });
}

// 菜单查询接口
export async function getMenu(params) {
  return ajaxAmd.post({
    url: 'menu/user',
    data: params ,
  });
  // .then(({ status, data }) => {
  //   console.log(status);
  //   console.log(data);
  //   ;
  // });
}
// 发送邮件
export async function sendMailbox(params) {
  return ajaxAmd.get({
    url: '/sendRegisterMail',
    params,
  });
}
// 注册接口
export async function registerUser(params) {
  debugger;
  return ajaxAmd.post({
    url: '/user/register',
    data: params ,
  });
}
//  获取用户权限
export function functionUser() {
  return ajaxAmd.post({
    url: 'function/user',
  });
}
