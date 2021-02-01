import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import 'popper.js';
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import VuejsDialog from "vuejs-dialog"
import helper from './services/helper'
import toastr from 'toastr'
import Form from './services/form'
import showError from './components/show-error'
import ModuleInfo from './components/module-info'
import PaginationRecord from './components/paginate-record'
import SortBy from './components/sort-by.vue'
import DateRangePicker from './components/daterange-picker'
import HtmlEditor from './components/html-editor'
import FileUploadInput from './components/file-upload-input'
import $ from 'jquery'
import VTooltip from 'v-tooltip'
import VueMeta from 'vue-meta'

Vue.use(VueCookie)
Vue.use(VTooltip);
Vue.use(VuejsDialog);
Vue.use(VueMeta);

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
Vue.component('module-info',ModuleInfo);
Vue.component('pagination-record',PaginationRecord);
Vue.component('sort-by',SortBy);
Vue.component('date-range-picker',DateRangePicker);
Vue.component('html-editor',HtmlEditor);
Vue.component('file-upload-input',FileUploadInput);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  metaInfo: {
    title: 'Welcome',
    titleTemplate: '%s | Vuejs'
},
  render: h => h(App)
}).$mount('#app')
