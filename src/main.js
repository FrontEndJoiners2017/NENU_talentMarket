// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import qs from 'qs';
//引入全局后端url
import webUrl from './webUrl'

//抛出
Vue.prototype.backendUrl = webUrl.backendUrl
// ajax数据交互
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs;
Vue.config.productionTip = false
axios.defaults.timeout = 500
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//  axios.defaults.baseURL = 'http://localhost:8080'

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
