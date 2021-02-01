<template>
  <div>
    <div class="input-group">
        <button type="button" class="btn btn-info" @click="launchFilePicker" :disabled="isUploadDisabled"> <font-awesome-icon :icon="['fas', 'upload']" />  {{buttonText}}</button>
    </div>

    <input type="file" style="display:none" ref="file" v-uploader />
    <file-upload-progress :progress="progress" style="margin-top: 10px;"></file-upload-progress>
    <button type="button" class="btn btn-danger btn-sm m-t-10" @click="cancelUpload" v-tooltip="'Cancel Upload'" v-if="progress || isFileSelected"> <font-awesome-icon :icon="['fas', 'times']" /> </button>

    <ul class="upload-file-list m-t-20" v-if="uploaded_files">
        <li v-for="uploaded_file in uploaded_files" v-bind:key="uploaded_file.id">
            <font-awesome-icon :icon="['fas', 'file']" /> {{uploaded_file.user_filename}}
            <span class="btn btn-danger btn-xs" :key="uploaded_file.id" v-confirm="{ok: confirmDelete(uploaded_file)}" v-tooltip="'Delete Upload'"><font-awesome-icon :icon="['fas', 'trash']" /></span>
        </li>
    </ul>
  </div>
</template>

<script>
    import fileUploadProgress from './file-upload-progress.vue'

    export default {
        components : { fileUploadProgress },
        props: {
            buttonText: {
                default: 'Choose File',
            },
            token: {
                required: true
            },
            module: {
                required: true
            },
            moduleId: {
                default: ''
            },
            clearFile: {
                default: false
            }
        },
        directives: {
            uploader: {
              bind(el, binding, vnode) {
                el.addEventListener('change', e => {
                  vnode.context.file = e.target.files[0];
                });
              }
            },
        },
        watch: {
            file(file){
                let fileExtension = file.name.substr((file.name.lastIndexOf('.') + 1));

                if(this.allowed_file_extensions.indexOf(fileExtension) == -1){
                    window.toastr.error('File Not Allowed');
                    this.isUploadDisabled = false;
                } else if(file.size > window.helper.getConfig('post_max_size')){
                    window.toastr.error('File Too Large');
                    this.isUploadDisabled = false;
                } else {
                    let formData = new FormData();
                    formData.append('file', file);
                    formData.append('token', this.token);
                    formData.append('module', this.module);
                    formData.append('module_id', this.moduleId || '');
                    this.$axios.post('/api/upload',formData, {
                        onUploadProgress: progressEvent => {
                            this.progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        }
                    }).then(response => {
                        window.toastr.success(response.data.message);
                        this.uploaded_files.push(response.data.upload);
                    }).catch(error => {
                        if(error.response.status == 413)
                            window.toastr.error('File Too Large');
                        else
                            window.helper.showErrorMsg(error);
                    }).then(() => {
                        this.progress = 0;
                        this.isUploadDisabled = false;
                    });
                    this.$refs.file.value = '';
                }
            },
            clearFile(){
                this.uploaded_files = [];
            },
            moduleId(val){
                if(val)
                    this.fetchUploads();
            }
        },
        mounted(){
            if(this.moduleId)
                this.fetchUploads();

            this.$axios.post('/api/upload/extension',{module: this.module})
                .then(response => {
                    this.allowed_file_extensions = response.data;
                });
        },
        computed: {
            authToken(){
                return window.helper.getAuthToken();
            },
            isFileSelected(){
                return this.isUploadDisabled ? true : false;
            }
        },
        methods: {
            launchFilePicker() {
                this.isUploadDisabled = true;
                this.$refs.file.click();
            },
            cancelUpload(){
                if (this.request) {
                    this.request.abort();
                }
                this.isUploadDisabled = false;
            },
            confirmDelete(uploaded_file){
                // eslint-disable-next-line no-unused-vars
                return dialog => this.deleteUpload(uploaded_file);
            },
            deleteUpload(uploaded_file){
                let loader = this.$loading.show();
                this.$axios.post('/api/upload/'+uploaded_file.id,{
                    token: uploaded_file.upload_token,
                    module_id: this.moduleId || ''
                }).then(response => {
                    this.uploaded_files = this.uploaded_files.filter(function (item) {
                        return uploaded_file.id != item.id;
                    });
                    window.toastr.success(response.data.message);
                    loader.hide();
                }).catch(error => {
                    loader.hide();
                    window.helper.showErrorMsg(error);
                });
            },
            fetchUploads(){
                this.uploaded_files = [];
                this.$axios.post('/api/upload/fetch',{
                    module: this.module,
                    module_id: this.moduleId
                })
                .then(response => {
                    this.uploaded_files = response.data;
                })
                .catch(error => {
                    window.helper.showErrorMsg(error);
                });
            }
        },
        data() {
            return {
              file: '',
              isUploadDisabled: false,
              progress: 0,
              uploaded_files: [],
              allowed_file_extensions: []
            }
        }
    }
</script>

<style>
    .upload-file-list{
        list-style: none;
        padding:0px;
    }
</style>
