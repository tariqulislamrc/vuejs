import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  state: {
    auth: {
      status: false,
      id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      username: '',
      avatar: '',
      roles: [],
      color_theme: '',
      direction: '',
      locale: '',
      sidebar: '',
      permissions: [],
    },
    config: {
      default_roles: false
    },
    left_open: true,
    right_open: false,
    preloader: true,
  },
  mutations: {
    left_menu(state, option) {
      if (option == "open") {
        state.left_open = true
      } else if (option == "close") {
        state.left_open = false
      } else if (option == "toggle") {
        state.left_open = !state.left_open
      }
      if (state.left_open) {
        document.getElementsByTagName("body")[0].classList.remove("left-hidden")
      } else {
        document.getElementsByTagName("body")[0].classList.add("left-hidden")
      }
    },
    rightside_bar(state, option) {

      if (option == "open") {
        state.right_open = true
      } else if (option == "close") {
        state.right_open = false
      } else if (option == "toggle") {
        state.right_open = !state.right_open
      }
      if (state.right_open) {
        document.getElementsByTagName("body")[0].classList.add("sidebar-right-opened")
      } else {
        document.getElementsByTagName("body")[0].classList.remove("sidebar-right-opened")
      }
    },

    routeChange(state, loader) {
      if (loader == "start") {
        state.preloader = true
      } else if (loader == "end") {
        state.preloader = false
      }
    },
    setAuthUserDetail (state, auth) {
      for (let key of Object.keys(auth)) {
        state.auth[key] = auth[key] !== null ? auth[key] : '';
      }
      if ('avatar' in auth)
        state.auth.avatar = auth.avatar !== null ? auth.avatar : '';
      state.auth.status = true;
      state.auth.roles = auth.roles;
      state.auth.permissions = auth.permissions;
    },
    resetAuthUserDetail (state) {
      for (let key of Object.keys(state.auth)) {
        state.auth[key] = '';
      }
      state.auth.status = false;
      state.auth.roles = [];
      state.auth.permissions = [];
      state.auth.last_activity = null;
      Vue.cookie.delete('auth_token');
      axios.defaults.headers.common['Authorization'] = null;
    },
    setConfig (state, config) {
      for (let key of Object.keys(config)) {
        state.config[key] = config[key];
      }
    },
    resetConfig (state) {
      for (let key of Object.keys(state.config)) {
        delete state.config[key];
      }
    }
  },
  actions: {
    setAuthUserDetail ({ commit }, auth) {
      commit('setAuthUserDetail',auth);
    },
    resetAuthUserDetail ({commit}){
      commit('resetAuthUserDetail');
    },
    setConfig ({ commit }, data) {
      commit('setConfig',data);
    },
    resetConfig({ commit }) {
      commit('resetConfig');
    }
  },
  getters: {
    getAuthUser: (state) => (name) => {
      return state.auth[name];
    },
    getAuthUserFullName: (state) => {
      return state.auth['first_name']+' '+state.auth['last_name'];
    },
    getAuthStatus: (state) => {
      return state.auth.status;
    },
    hasRole: (state) => (name) => {
      return (state.auth.roles.indexOf(name) >= 0)
    },
    hasAnyRole: (state) => (roles) => {
      return (state.auth.roles.some(role => {
        return roles.indexOf(role) > -1;
      }));
    },
    hasNotAnyRole: (state) => (roles) => {
      return (state.auth.roles.every(role => {
        return roles.indexOf(role) < 0;
      }));
    },
    getConfig: (state) => (name) => {
      return state.config[name];
    },
    hasPermission: (state) => (name) => {
      return (state.auth.permissions.indexOf(name) > -1);
    },
    hasAnyPermission: (state) => (permissions) => {
      return (state.auth.permissions.some(permission => {
        return permissions.indexOf(permission) > -1;
      }));
    },
    getLastActivity: (state) => {
      return state.auth.last_activity;
    },
    getDefaultRole: (state) => (name) => {
      return state.config.default_roles ? state.config.default_roles[name] : '';
    }
  },
  plugins: [
    createPersistedState({
      key: 'Vue',
    })
  ]
});

export default store;
