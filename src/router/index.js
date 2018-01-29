import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login_old'
import home from '../components/home'
import index from '../pages/index'
import userLogin from '../pages/userLogin'
import register from '../pages/register'
import forgetPwd from '../pages/forgetPwd'
import userInfo from '../pages/userInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/userLogin'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/index',
        name: 'index',
        component: index
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: userInfo
      }]
    }
  ]
})
