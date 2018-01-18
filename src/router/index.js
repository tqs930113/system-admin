import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import home from '../components/home'
import index from '../pages/index'
import userLogin from '../pages/userLogin'
import register from '../pages/register'

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
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/index',
        name: 'index',
        component: index
      }]
    }
  ]
})
