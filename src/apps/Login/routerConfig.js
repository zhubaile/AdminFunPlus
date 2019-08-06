// import Home from './pages/home';
import Login from './pages/UserLogin';
// import Register from './pages/UserRegister';
// import SendMailbox from './pages/SendMailbox';
// import RetrievePassword from './pages/RetrievePassword';
// import SetNewPassword from './pages/SetNewPassword';
// import ResetPassword from './pages/ResetPassword';
// import routerConfig from "../Website/routerConfig";

// ========系统首页============ //
const login = [
  // 系统首页
  {
    path: '/backadminuser/login',
    component: Login,
  },
];

// export default login;
export default [].concat(login, [{
  path: '/backadminuser/*',
  component: Login,
}]);
