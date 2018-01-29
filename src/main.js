// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入项目默认样式重置样式
import './assets/css/reset.css'
// 引入项目所需icon
import './assets/css/iconfont.css'
// 引入ElementUI框架的组件
import ElementUI from 'element-ui'
// 引入ElementUI框架的CSS样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入项目通用样式
import './assets/css/index.css'
// 引入项目通用结构样式
import './assets/css/generalCSS/green.css'
// 引入jQuery框架
import jQuery from 'jquery'
import 'node-waves/dist/waves.min.css'

import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(ElementUI)
// Vue.use(Waves)
Vue.config.productionTip = false
Vue.prototype.$jQuery = jQuery
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
