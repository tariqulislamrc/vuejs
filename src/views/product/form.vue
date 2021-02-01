<template>
    <div class="card card-form mt-3">
        <h4 class="card-header" v-if="!uuid">Add New Product</h4>
        <h4 class="card-header" v-else>Edit Product</h4>
        <vue-form :state="formstate" :class="formstate.$invalid && formstate.$submitted ? 'was-validated' : ''"
            @submit.prevent="proceed" novalidate>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <div class="form-group">
                            <label for="">Product Title <span class="text-danger">*</span></label>
                            <validate tag="div">
                                <input class="form-control" type="text" v-model="productForm.title" name="title"
                                    :placeholder="'Product Title'" required
                                    @keydown="productForm.errors.clear('title')">
                                <show-error :form-name="productForm" prop-name="title"></show-error>
                                <field-messages name="title" show="$invalid && $submitted" class="invalid-feedback">
                                    <div slot="required">The Product Title field is required.</div>
                                </field-messages>
                            </validate>
                        </div>
                        <div class="form-group">
                            <label for="">Product Price</label>
                            <validate tag="div">
                                <input class="form-control" type="number" required v-model="productForm.price"
                                    name="price" :placeholder="'Product Price'"
                                    @keydown="productForm.errors.clear('price')">
                                <show-error :form-name="productForm" prop-name="price"></show-error>
                                <field-messages name="price" show="$invalid && $submitted" class="invalid-feedback">
                                    <div slot="required">The Product price field is required.</div>
                                </field-messages>
                            </validate>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div class="form-group">
                            <file-upload-input :button-text="'Upload Photo'" :token="productForm.upload_token"
                                module="product" :clear-file="clearAttachment" :module-id="module_id">
                            </file-upload-input>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12">
                        <div class="form-group">
                            <html-editor name="description" :model.sync="productForm.description" height="300"
                                :isUpdate="uuid ? true : false" @clearErrors="productForm.errors.clear('description')">
                            </html-editor>
                            <show-error :form-name="productForm" prop-name="description"></show-error>
                        </div>
                    </div>
                </div>


            </div>
            <div class="card-footer text-center">
                <router-link :to="{ name: 'product' }" class="btn btn-danger mr-2 w-25" v-show="uuid">Cancel</router-link>
                <button v-if="!uuid" type="button" class="btn btn-danger  mr-2 w-25" @click="$emit('cancel')">Cancel</button>
                <button type="submit" class="btn btn-info w-25">
                    <span v-if="uuid">Update</span>
                    <span v-else>Save</span>
                </button>
            </div>
        </vue-form>
    </div>
</template>


<script>
    import uuid from 'uuid/v4'
    import Vue from 'vue'
    import VueForm from 'vue-form'

    Vue.use(VueForm);

    export default {
        data() {
            return {
                formstate: {},
                productForm: new window.Form({
                    title: '',
                    price: 0,
                    description: '',
                    upload_token: ''
                }),
                module_id: '',
                clearAttachment: true,
            };
        },
        props: ['uuid'],
        mounted() {
            if (this.uuid)
                this.get();
            else
                this.productForm.upload_token = uuid();

        },
        methods: {
            proceed() {

                if (this.formstate.$invalid) {
                    return;
                } else {
                    if (this.uuid)
                        this.update();
                    else
                        this.store();
                }
            },
            store() {
                let loader = this.$loading.show();
                this.productForm.post('/api/product')
                    .then(response => {
                        window.toastr.success(response.data.message);
                        this.clearAttachment = !this.clearAttachment;
                        this.productForm.upload_token = uuid();
                        this.$emit('completed');

                    })
                    .catch(error => {
                        window.helper.showErrorMsg(error);
                    })
                    .then(() => {
                        loader.hide();
                    });
            },
            get() {
                let loader = this.$loading.show();
                this.$axios.get('/api/product/' + this.uuid)
                    .then(response => {
                        this.productForm.title = response.data.product.title;
                        this.productForm.price = response.data.product.price;
                        this.productForm.description = response.data.product.description;
                        this.productForm.upload_token = response.data.product.upload_token;
                        this.module_id = response.data.product.id;
                        loader.hide();
                    })
                    .catch(error => {
                        loader.hide();
                        window.helper.showErrorMsg(error);
                        this.$router.push('/product');
                    });
            },
            update() {
                let loader = this.$loading.show();
                this.productForm.patch('/api/product/' + this.uuid)
                    .then(response => {
                        window.toastr.success(response.data.message);
                        loader.hide();
                        this.$router.push('/product');
                    })
                    .catch(error => {
                        loader.hide();
                        window.helper.showErrorMsg(error);
                    });
            }
        }
    }
</script>

<style>
    .loading-overlay.is-full-page {
        z-index: 1060;
    }
</style>