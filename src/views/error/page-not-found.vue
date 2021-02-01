<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto col-sm-8 col-sm-offset-2">
                <div class="text-center">
                    <div class="error_img">
                        <img :src='require("../../assets/img/pages/404.gif")' alt="404 error image">
                        <h1 class="sr-only">Ooops! Page Not Found. </h1>
                        <p v-text="'The page you have requested is either moved away or doesn\'t exist.'"></p>
                    </div>
                    <hr class="seperator">
                    <router-link :to="{name: 'product'}" class="btn btn-primary link-home w-50">Go to product page</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "page-not-found",
    metaInfo: {
        title: 'Ooops! Page Not Found.'
    },
    mounted: function() {
        window.toastr.error('The page you have requested is either moved away or doesn\'t exist.', 'Ooops! Page Not Found.')
    },
    destroyed: function() {

    }
}
</script>
<style src="../../assets/css/404.css"></style>
