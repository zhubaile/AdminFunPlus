
#### 项目介绍

**********

#### 第三方使用说明 
本项目使用使用飞冰+ fusionDesign
组件介绍地址:https://fusion.design/component/basic/button
构建器地址:https://alibaba.github.io/ice/docs/advanced/webpackrc


#### 安装启动教程

1. yarn 或者 npm install
2. npm run start
3. http://localhost:21144/login.html#/ 访问登录页
3. http://localhost:21144/index.html#/ 访问系统首页

4.字体库预览地址:https://alibaba.github.io/ice/component/icon
5.基础符合预览地址：https://alibaba.github.io/ice/component/foundationsymbol

#### 说明

    dependencies 存放项目或组件代码中依赖到的
    devDependencies 存放测试代码依赖的包或构建工具的包

#### 前端模拟服务 

    使用去yapi模拟接口
    http://yapi.yangtuo.io/project/8/interface/api （内网部署。需vpn访问）

    vpn 安装说明：http://docs.yangtuo.io/
    后端测试说明：https://yapi.ymfe.org/documents/case.html
    前端 代理 地址：http://yapi.yangtuo.io/mock/8

#### 接口说明


        先统一一下返回结果的规范，请求规范完成按照RESTful。
        分页记录：
        {
          "status": "INT: 直接使用HTTP状态码表示, 200 表示成功",
          "message": "STRING: 状态描述",
          "data": [{}, {}, {}],
          "extra": {
            "totalRecord": "INT: 总记录数"
          }
        }

        单条记录：
        {
          "status": "INT: 直接使用HTTP状态码表示, 200 表示成功",
          "message": "STRING: 状态描述",
          "data": {}
        }


### 目录结构说明

      根目录 
      ├─node_modules     //第三方依赖 目录
      ├─public           //公共资源 html ico存放位置  
      ├─build            //打包后文件目录
      ├─src              //开发目录
      |   ├─apps         //业务开发app目录，分登陆页和首页。采用react-router路由
      |   ├─assets    // 静态资源存放位置
      |   ├─static    // 静态页面 效果图等存放位置
      ├─.eslintignore            //.eslint 忽略文件
      ├─.eslintrc             //.eslint 规则文件
      ├─.webpackrc.js        //webpack 配置文件
      ├─package                  //依赖等npm 配置信息
      ├─README                  //开发文档说明，开发必读

### login模块目录接口说明

      login //根目录 
      ├─index.js     //入口 js
      ├─menuConfig.js //菜单配置，登录暂时不需要
      ├─router.jsx    //路由信息扁平化处理方法，根据routerConfig.js扁平化处理路由
      ├─routerConfig.js //路由配置
      ├─pages            //路由模块存放位置
      |   ├─UserRegister    // 用户注册路由模块
      |   ├─UserLogin       // 用户登录路由模块
      |   ├─UserForgetPassword //
      |   ├─NotFound  
      ├─layouts             // 整体布局页面，提出公用布局模块
      |    ├─UserLayout
      |    ├─BlankLayout
      ├─components           //login模块通用组件模块
      |     ├─LoginIntro
      |     ├─Footer
      |     ├─CustomInput
      |     ├─CustomButton
      |     ├─BasicNotFound
      |     ├─AuthForm
      ├─api                  //login 模块ajax api 请求汇总 
      |  └index.js


### index模块目录接口说明

      index //根目录 
      ├─index.js     //入口 js
      ├─menuConfig.js //菜单配置 
      ├─router.jsx    //路由信息扁平化处理方法，根据routerConfig.js扁平化处理路由
      ├─routerConfig.js //路由配置
      ├─pages            //路由模块存放位置 具体内容可在routerConfig.js查看
      ├─layouts             // 整体布局页面，提出公用布局模块
      ├─components           //index 模块通用组件模块
      ├─api                  //index 模块ajax api 请求汇总 
      |  └index.js
