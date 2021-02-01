<template>

        <div class="container mt-5">
            <div class="card card-form">
                <div class="card-body p-t-20">
                    <product-form :uuid="uuid"></product-form>
                </div>
            </div>
        </div>
</template>

<script>
    import productForm from './form';

    export default {
          metaInfo: {
            title: 'Edit Product'
        },
        components : { productForm },
        data() {
            return {
                uuid:this.$route.params.uuid
            }
        },
        mounted(){
            
        }
    }
</script>
