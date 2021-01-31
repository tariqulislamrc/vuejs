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
import Form from './services/form'
import showError from './components/show-error'
import $ from 'jquery'


Vue.use(VueCookie)
window.helper = helper;
window.toastr = toastr;
window.Form = Form;
window.$ = $;

window._get = require('lodash/get');
window._eachRight = require('lodash/eachRight');
window._replace = require('lodash/replace');
window._has = require('lodash/has');
window._size = require('lodash/size');

Vue.component('show-error',showError);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
