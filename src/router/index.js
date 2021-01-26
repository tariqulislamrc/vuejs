import Vue from 'vue'
import VueRouter from 'vue-router'
import helper from '../services/helper'
import toastr from 'toastr'

import guestRoutes from './guest'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading);
Vue.use(VueRouter)

let pageLoader;

const routes = [
  {
    path: '/',                      // all the routes which can be access without authentication
    // component: () => import('layouts/guest-page' /* webpackChunkName: "js/guest-page" */),
    meta: { validate: ['is_guest'] },
    children: [
      ...guestRoutes,
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

  // Initialize toastr notification
  helper.notification();
  toastr.error('tariq');

  helper.setConfig().then(() => {

    let auth_token = Vue.cookie.get('auth_token');


    if (to.matched.some(m => m.meta.validate)) {
      const m = to.matched.find(m => m.meta.validate);

      // Check for authentication; If no, redirect to "/login" route
      if (m.meta.validate.indexOf('is_auth') > -1 && !auth_token) {

        pageLoader.hide();
        return next({path: '/login'})
      }



      // Check for authentication; If authenticated, redirect to "/dashboard" route
      if (m.meta.validate.indexOf('is_guest') > -1 && auth_token) {
        pageLoader.hide();
        return next({path: '/dashboard'})
      }
    }
    return next()
  });
});


router.afterEach(() => {

  pageLoader.hide();

});

export default router;
