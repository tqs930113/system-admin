import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import home from '../components/home'
import index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
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
