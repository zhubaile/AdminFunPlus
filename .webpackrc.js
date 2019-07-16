const path = require('path');
const webpack = require('webpack');
let proxy = {};
/*proxy['/web/beta/v1.0/uploadPhoto'] = {
  // 代理测试环境地址 如下
  target: "http://192.168.1.123:3000",
  changeOrigin: true,
};*/
proxy['/web/beta/v1.0/**'] = {
  // 代理测试环境地址 如下，代理就是把请求本地的url接到配置好的url上。
  target: "http://192.168.1.105:3000",
  changeOrigin: true,
};
console.log('---------111112222333456---------')
// http://192.168.1.118:3000  fog的
// 192.168.1.123 dengyan的
// 192.168.1.105  黄明亮的
module.exports = {
  // 如果需要代理请解开下面注释   regex e("abc")
  devServer: {
    proxy: proxy,
    historyApiFallback: {
      index: 'build/login.html',
      disableDotRule: true,
      rewrites:[
        { from: /^\/$/, to: 'build/login.html' },
        { from: /^\/user/, to: 'build/login.html' }, // 登录界面
        { from: /^\/website/, to: 'build/website.html' }, // 官网界面
        { from: /^\/backadmin/, to: 'build/index.html' } // 管理后台
        // { from: /\/index.html$/, to:'build/index.html' },
        // { from: /\/website.html$/, to:'build/website.html' },  // 匹配已website.html结束的字符，匹配成功跳转到website.html
        // { from: /\/login.html$/, to:'build/login.html' },
        // { from: /^\/website/, to:'build/website.html' },     // 匹配已website开头的字符，匹配成功跳转到website.html
        // /*{ from: /(?=website)/, to:'build/website.html' },
        // { from: /(?=login)/, to:'build/login.html' },*/
        // { from: /^\/user/, to:'build/login.html' }
      ],
    }
  },
  resolve: {
    // webpack 别名配置
    alias: {
      "@indexApi": path.join(__dirname, './src/apps/index/api/index.js'),
      "@loginApi": path.join(__dirname, './src/apps/Login/api/index.js'),
      "@websiteApi": path.join(__dirname, './src/apps/Website/api/index.js'),
      "@indexStore": path.join(__dirname, './src/apps/index/store/combin.js'),
      "@ajax": path.join(__dirname, './src/assets/common/axios.js'),
      "@img": path.join(__dirname, './src/assets/img'),
    }
  },
  plugins: []
};
