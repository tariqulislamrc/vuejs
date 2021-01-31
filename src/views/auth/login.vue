<template>
  <div class="container-fluid login">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-10 col-sm-8 mx-auto login-form">

          <h2 class="text-center logo_h2">
            <img :src='require("../../assets/img/pages/clear_black.png")' alt="Logo">
          </h2>

          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <vue-form  :state="formstate" :class="formstate.$invalid && formstate.$submitted ? 'was-validated' : ''" @submit.prevent="onSubmit"  id="login_form" novalidate >
                  <div class="row">
                    <div class="col-sm-12 mt-3 ">
                      <div class="form-group">
                        <validate tag="div">
                          <input v-model="loginForm.email_or_username"  name="email_or_username" id="email_or_username" type="text" required autofocus placeholder="Email or username"
                                 class="form-control" @keydown="loginForm.errors.clear('email_or_username')"/>
                          <show-error :form-name="loginForm" prop-name="email_or_username"></show-error>
                          <field-messages name="email_or_username" show="$invalid && $submitted"
                                          class="invalid-feedback">
                            <div slot="required">The Email or username field is required.</div>
                          </field-messages>
                        </validate>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <validate tag="div">
                          <input v-model="loginForm.password" name="password" id="password"
                                 type="password" required placeholder="Password"
                                 class="form-control" minlength="6"  @keydown="loginForm.errors.clear('password')" />
                          <show-error :form-name="loginForm" prop-name="password"></show-error>
                          <field-messages name="password" show="$invalid && $submitted"
                                          class="invalid-feedback">
                            <div slot="required">The Password field is required.</div>
                            <div slot="minlength">
                              The Password must be between 6 characters.
                            </div>
                          </field-messages>
                        </validate>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <input type="submit" value="Sign In"  class="btn btn-primary btn-block mb-3"/>
                      </div>
                    </div>
                    <div class="col-sm-12 text-center" v-if="getConfig('reset_password')">
                      <router-link to="/password" exact>
                        Reset Here
                      </router-link>
                    </div>
                  </div>
                </vue-form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vue-form'

Vue.use(VueForm);
export default {
  name: "login",
  metaInfo: {
    title: 'Sign in'
  },
  data() {
    return {
      formstate: {},
      loginForm: new window.Form({
        email_or_username: '',
        password: ''
      })
    }
  },
  methods: {
    onSubmit() {
      let loader = this.$loading.show();
      if (this.formstate.$invalid) {
        loader.hide();
        return;
      } else {
        this.loginForm.post('/api/auth/login')
            .then(response => {

              this.$cookie.set('auth_token', response.data.token, 1);
              this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
              this.$store.dispatch('setConfig', response.data.config);
              this.$store.dispatch('setAuthUserDetail', {
                id: response.data.user.id,
                first_name: response.data.user.first_name,
                middle_name: response.data.user.middle_name,
                last_name: response.data.user.last_name,
                email: response.data.user.email,
                username: response.data.user.username,
                roles: response.data.user.user_roles,
                permissions: response.data.user.user_permissions
              });
              window.toastr.success(response.data.message);
              this.$router.push('/dashboard');
              loader.hide();
            }).catch(error => {
          loader.hide();
          console.log(error)
          // window.helper.showErrorMsg(error);
        });
      }
    },
    getConfig(config) {
      return window.helper.getConfig(config);
    }
  },
  mounted: function () {
  },
  destroyed: function () {

  },
  computed: {
    getLogo() {
      return window.helper.getLogo();
    }
  }
}
</script>

<style src="../../assets/css/login.css"></style>
<style type="text/css" scoped>
.login {
  padding-top: 6.5%;
  padding-bottom: 2%;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: radial-gradient(ellipse at center, #5A93AF 0%, #004E74 100%);
  overflow-y: auto;
}
</style>
