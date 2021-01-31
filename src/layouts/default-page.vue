<template>
  <div id="app">
    <preloader v-show="this.$store.state.preloader"></preloader>
    <default_header></default_header>
    <div class="wrapper">
      <left_side v-show="this.$store.state.left_open"></left_side>
      <right_side>
        <router-view></router-view>
      </right_side>
    </div>
    <div class="background-overlay" @click="right_close"></div>
  </div>
</template>

<script>

import preloader from "@components/preloader";
import default_header from "../components/layout/clear_header";
import left_side from "../components/layout/left-side/default/left-side";
import right_side from "../components/layout/right-side";

//import icheck from "../static/iCheck/icheck.min.js";
export default {
  name: 'default-page',
  components: {
    preloader, default_header, left_side, right_side
  },
  mounted() {
    window.$("body").addClass("fixed-menu fixed-header");
    window.$(".sidebar").addClass("affix").prepend("<div class='left_slim'></div>");
    window.$("#menu").appendTo(".left_slim");
    window.$('.left_slim').slimscroll({
      height: '100vh',
      size: '5px',
      opacity: 0.2
    });
    window.onscroll = function(){
      var top = ( document.getElementById('menu') &&  document.getElementById('menu').scrollTop  || document.body && document.body.scrollTop  || 0);
      var top_right = ( document.getElementById('right') &&  document.getElementById('right').scrollTop  || document.body && document.body.scrollTop  || 0);
      if(top<=56){
        document.getElementsByClassName('sidebar')[0].style.marginTop = -top+'px ';
        document.getElementById("right").style.marginTop=-top_right+"px"
      }
      else{
        document.getElementsByClassName('sidebar')[0].style.marginTop = -56+'px';
        document.getElementById("right").style.marginTop=-56+"px"
      }

    }
  },
  methods: {
    right_close() {
      this.$store.commit('rightside_bar', "close");
    }
  },
  destroyed: function() {
    window.$("body").removeClass("fixed-menu fixed-header");
    window.$(".sidebar").removeClass("affix");
    // location.reload();
  }
}
</script>
<style src="../assets/css/custom_css/toastr_notificatons.css"></style>
<style src="../assets/css/custom_css/metisMenu.css"></style>
<style lang="scss" src="../assets/sass/dark/custom.scss"></style>
<style src="../assets/css/layouts.css"></style>
<style class>
@media(max-width: 320px){
  .message_dropdown .dropdown-menu.show{
    left:15px !important;
  }
}
</style>

