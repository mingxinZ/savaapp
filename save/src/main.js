// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './common/stylus/index.styl'
import fastclick from 'fastclick'
import vueScrollto from 'vue-scrollto'
// 配置懒加载插件
import VueLazyLoad from 'vue-lazyload'
// 配置mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueAxios, axios)

Vue.use(vueScrollto)

Vue.use(MintUI)

Vue.use(VueLazyLoad, {
  loading: '../src/common/images/logo.jpg'
})

Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

Vue.prototype.$axios = axios
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
// axios.defaults.headers.post['Content-type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'