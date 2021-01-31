import Vue from 'vue'
import VueRouter from 'vue-router'
import helper from '../services/helper'
import store from '../store/index'


import guestRoutes from './guest'
import authRoutes from './auth'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading);
Vue.use(VueRouter)

let pageLoader;

const routes = [
  {
    path: '/',                      // all the routes which can be access without authentication
    component: () => import('../layouts/guest-page' /* webpackChunkName: "js/guest-page" */),
    meta: { validate: ['is_guest'] },
    children: [
      ...guestRoutes,
    ]
  },
  {
    path: '/',                      // all the routes which can be access without authentication
    component: () => import('../layouts/default-page' /* webpackChunkName: "js/guest-page" */),
    meta: { validate: ['is_auth'] },
    children: [
      ...authRoutes,
    ]
  }
];





const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  pageLoader = Vue.$loading.show();
  store.commit("routeChange", "start");


  // Initialize toastr notification
  helper.notification();
  helper.setConfig().then(() => {

    let auth_token = Vue.cookie.get('auth_token');


    if (to.matched.some(m => m.meta.validate)) {
      const m = to.matched.find(m => m.meta.validate);

      // Check for authentication; If no, redirect to "/login" route
      if (m.meta.validate.indexOf('is_auth') > -1 && !auth_token) {
        window.toastr.error('Authentication required to perform this action.')
        pageLoader.hide();
        return next({path: '/login'})
      }



      // Check for authentication; If authenticated, redirect to "/dashboard" route
      if (m.meta.validate.indexOf('is_guest') > -1 && auth_token) {
        pageLoader.hide();
        window.toastr.error('You cannot access this page while you are logged in.');
        return next({path: '/dashboard'})
      }
    }
    return next()
  });
});


router.afterEach(() => {

  store.commit("routeChange", "end");
  if (window.innerWidth < 992) {
    store.commit('left_menu', "close");
  } else {
    store.commit('left_menu', "open");
  }
  pageLoader.hide();


});

export default router;
