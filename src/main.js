import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import helper from './services/helper'
import toastr from 'toastr'

Vue.use(VueCookie)
window.helper = helper;
window.toastr = toastr;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
