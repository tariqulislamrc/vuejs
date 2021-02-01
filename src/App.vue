<template>
  <div id="app">
    <preloader v-show="this.$store.state.preloader"></preloader>
    <router-view></router-view>
  </div>
</template>
<script>
import preloader from "./components/layout/preloader";

export default {
  name: 'app',
  components: {
    preloader
  }
}
</script>
<style lang="scss" src="toastr/toastr.scss"></style>
<style src="./assets/css/custom_css/toastr_notificatons.css"></style>
<style lang="" src="v-tooltip/dist/v-tooltip.css"></style>
<style lang="" src="vuejs-dialog/dist/vuejs-dialog.min.css">
  
</style>
