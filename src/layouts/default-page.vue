<template>
  <div>

      <default_header></default_header>
      <div class="wrapper">
          <router-view></router-view>
      </div>
    </div>
</template>

<script>


import default_header from "../components/layout/clear_header";

export default {
  name: 'default-page',
  components: {
     default_header
  },
  mounted() {

  },
  methods: {

  },
  destroyed: function() {

  }
}
</script>
<style src="../assets/css/custom_css/metisMenu.css"></style>
<style lang="scss" src="../assets/sass/dark/custom.scss"></style>
<style class>
body.fixed-header #app .navbar{
  position: relative;
}
body.fixed-header #app .header{
  margin-bottom: 0;
}
@media(max-width: 320px){
  .message_dropdown .dropdown-menu.show{
    left:20px !important;
  }
}
</style>

