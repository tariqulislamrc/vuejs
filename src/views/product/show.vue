<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container modal-lg">
                    <div class="modal-header" v-if="product.id">
                        <slot name="header">
                            <span>{{product.title}}</span>
                            <span class="float-right pointer" @click="$emit('close')">x</span>
                        </slot>
                    </div>
                    <div class="modal-body" v-if="product.id">
                        <slot name="body">
                            <div class=""><strong>Product Title: </strong> : {{ product.title }}</div>
                            <div class=""> <strong>Price: </strong> {{ product.price }} </div>

                            <div class="mt-3" v-html="product.description"></div>
                            <div v-if="attachments.length">
                                <ul style="list-style: none;padding: 0;" class="m-t-10">
                                    <li v-for="attachment in attachments" v-bind:key="attachment.id">
                                        <img :src="attachment.filename" :alt="attachment.user_filename" style="width: 150px; display: block;">
                                        <a target="_blank" :href="attachment.filename"><i class="fas fa-paperclip"></i> {{attachment.user_filename}}</a>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <p>
                                <font-awesome-icon :icon="'clock'" />  <small>Created at:  {{product.created_at | momentDateTime}}</small>
                                <span class="float-right">
                                   <font-awesome-icon :icon="'clock'" />  <small>Updated at: {{product.updated_at | momentDateTime}}</small>
                                </span>
                            </p>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        components: {},
        props: ['uuid', 'url'],
        mounted(){
            if(this.uuid)
                this.get();
        },
        data(){
            return {
                product: [],
                attachments: []
            }
        },
        methods: {
            get(){
                let loader = this.$loading.show();
                let productUrl = this.url ? '/api' + this.url : '/api/product/' + this.uuid;
                this.$axios.get(productUrl)
                    .then(response => {
                        this.product = response.data.product;
                        this.attachments = response.data.attachments;
                        loader.hide();
                    })
                    .catch(error => {
                        loader.hide();
                        window.helper.showErrorMsg(error);
                    });
            }
        },
        computed: {
            authToken(){
                return window.helper.getAuthToken();
            }
        },
        filters: {
          momentDateTime(date) {
            return window.helper.formatDateTime(date);
          }
        }
    }
</script>

<style class>
.modal-mask {
    position: fixed;
    z-index: 1050;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-lg{
    width: 1024px;
}

.modal-md{
    width: 800px;
}

.modal-sm{
    width: 600px;
}

.modal-xs{
    width: 300px;
}

.modal-container {
    margin: 0px auto;
    padding: 0px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 10px 0;
    max-height: 85vh;
    overflow-x: hidden;
    overflow-y: auto;
}

.modal-default-button {
    float: right;
}

.pointer{
    cursor: pointer;
}
</style>