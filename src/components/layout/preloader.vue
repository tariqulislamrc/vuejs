<template>
    <div class="preloader" style="position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100001;
        backface-visibility: hidden;
        background: #FFFFFF;">
        <div class="loader_img" style="width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        background-position: center;
        margin: -25px 0 0 -25px;"><img :src='require("../../assets/img/loader.gif")' alt="loading..." height="64" width="64"></div>
    </div>
</template>
<script>
export default {
    name: 'preloader',
}
</script>
