<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="logo">
        <!-- Add the class icon to your logo image or logo icon to add the margining -->
        <img :src='require("../../assets/img/logo.png")' alt="logo"/>
      </router-link>
      <div class="navbar-collapse">
        <b-navbar-nav class="vuemenu navigation Menu -horizontal">
          <b-nav-item :to="{ name: 'product' }">Product</b-nav-item>
        </b-navbar-nav>

      </div>

      <ul class="navbar-nav mr-auto">
        <!-- User menu -->
        <b-dd class="user-dropdown">
          <template slot="button-content">
            <a href="#">
              <img :src="getAuthUser('avatar')" width="35"
                   class="rounded-circle img-responsive float-left" height="35" alt="User Image">
              <span class="user_name_max">
                {{ getAuthUser('full_name') }}
              </span>
            </a>
          </template>
          <div class="dropdown-profile">
            <li class="user-header">
              <img :src="getAuthUser('avatar')" class="rounded-circle" alt="User Image">
              <p class="user_name_max" v-text="getAuthUser('email')"></p>
            </li>
            <!-- Menu Body -->
            <!-- Menu Footer-->
            <b-dropdown-item class="dropdown-footer">
              <a href="/logout"  @click.prevent="logout">
                <i class="ti-shift-right"></i> Logout
              </a>
            </b-dropdown-item>
          </div>
        </b-dd>
        <!--User menu -->
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  name: "default_header",
  methods: {
    logout(){
      let loader = this.$loading.show();
      window.helper.logout().then((res) => {
        console.log(res)
        this.$router.push('/login')
        loader.hide();
      })
    },
    //Enable sidebar toggle
    toggle_left() {
      this.$store.commit('left_menu', "toggle");
    },
    toggle_right() {
      this.$store.commit('rightside_bar', "toggle");
    },
    getAuthUser(name){
      return window.helper.getAuthUser(name);
    },
    getConfig(name){
      return window.helper.getConfig(name);
    },
    getLogo() {
      return window.helper.getLogo();
    }

  }
}
</script>
<style scoped>
.navbar-nav .nav-link {
  color: #ffffff !important;
  font-weight: 700;
}
</style>
