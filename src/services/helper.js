import store from '../store/index'
import Vue from 'vue'
import $ from 'jquery'
import toastr from 'toastr'
store.dispatch('setConfig',{loaded: false});

export default {
    setConfig() {
        return new Promise((resolve, reject) => {
            if(this.getConfig('loaded')) {
                resolve()
            } else {
                Vue.axios.get('/api/config')
                    .then(response => {
                        store.dispatch('resetConfig');
                        response.loaded = true;
                        store.dispatch('setConfig',response);
                        resolve();
                    }).catch(error => {
                    reject(error);
                })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
    },

    // to logout user
    logout(){
        return Vue.axios.post('/api/auth/logout').then(response =>  {
            this.clearSession();
            store.dispatch('setConfig',response.config)
            .success(response.message);
        }).catch(error => {
            this.showErrorMsg(error);
        });
    },
    clearSession(){
        Vue.cookie.delete('auth_token');
        store.dispatch('resetConfig');
        store.dispatch('setConfig',{loaded: false});
    },

    // to get authenticated user data
    authUser(){
        return Vue.axios.get('/api/auth/user').then(response =>  {
            return response;
        }).catch(error => {
            this.showErrorMsg(error);
        });
    },

    // to set notification position
    notification(){
        var notificationPosition = this.getConfig('notification_position') || 'toast-bottom-right';
        toastr.options = {
            "positionClass": notificationPosition
        };

        $('[data-toastr]').on('click',function(){
            var type = $(this).data('toastr'),message = $(this).data('message'),title = $(this).data('title');
            toastr[type](message, title);
        });
    },

    // to append filter variables in the URL
    getFilterURL(data){
        let url = '';
        $.each(data, function(key,value) {
            url += (value) ? '&'+key+'='+encodeURI(value) : '';
        });
        return url;
    },

    getLastActivity(){
        return store.getters.getLastActivity;
    },

    // to get Auth Status
    isAuth(){
        return store.getters.getAuthStatus;
    },

    // to get Auth user detail
    getAuthUser(name){
        if(name === 'full_name')
            return store.getters.getAuthUser('first_name')+' '+store.getters.getAuthUser('last_name');
        else if(name === 'avatar'){
            if(store.getters.getAuthUser('avatar'))
                return '/'+store.getters.getAuthUser('avatar');
            else{
                let full_name = store.getters.getAuthUser('first_name')+' '+store.getters.getAuthUser('last_name');
                return 'https://ui-avatars.com/api/?name='+encodeURIComponent(full_name)+'&color=7F9CF5&background=EBF4FF';
            }

        }
        else
            return store.getters.getAuthUser(name);
    },

    // to get config
    getConfig(config){
        return store.getters.getConfig(config);
    },

    // to get default role name of system
    getDefaultRole(role){
        return store.getters.getDefaultRole(role);
    },

    // to check role of authenticated user
    hasRole(role){
        return store.getters.hasRole(this.getDefaultRole(role));
    },

    // to check any permission for authenticated user
    hasAnyRole(roles){
        return store.getters.hasAnyRole(roles);
    },

    // to check any permission for authenticated user
    hasNotAnyRole(roles){
        return store.getters.hasNotAnyRole(roles);
    },

    // to check permission for authenticated user
    hasPermission(permission){
        return store.getters.hasPermission(permission);
    },

    // to check any permission for authenticated user
    hasAnyPermission(permissions){
        return store.getters.hasAnyPermission(permissions);
    },

    // to check Admin role
    hasAdminRole(){
        if(this.hasRole('admin'))
            return 1;
        else
            return 0;
    },

    // to check whether a given user has given role
    userHasRole(user,role_name){
        if(!user.roles)
            return false;

        let user_role = user.roles.filter(role => role.name === this.getDefaultRole(role_name))
        if(user_role.length)
            return true;
        return false;
    },


    // returns not accessible message if permission is denied
    notAccessibleMsg(){
        toastr.error('Permission Denied');
    },

    getLogo(){
        if(this.getConfig('logo'))
            return '/'+this.getConfig('logo');
        else
            return '/images/default_logo.png';
    },

    getIcon(){
        if(this.getConfig('icon'))
            return '/'+this.getConfig('icon');
        else
            return '/images/default_icon.png';
    },


    // to change first character of every word to upper case
    ucword(value){
        if(!value)
            return;

        return value.toLowerCase().replace(/\b[a-z]/g, function(value) {
            return value.toUpperCase();
        });
    },

    // to change string into human readable format
    toWord(value){
        if(!value)
            return;

        value = value.replace(/-/g, ' ');
        value = value.replace(/_/g, ' ');

        return value.toLowerCase().replace(/\b[a-z]/g, function(value) {
            return value.toUpperCase();
        });
    },

    createSlug(value){
        return value.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with
            .replace(/&/g, '-and-') // Replace & with ‘and’
            .replace(/[^\w-]+/g, '') // Remove all non-word characters
            .replace(/--+/g, '-') // Replace multiple — with single -
            .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '');
    },

    // shows toastr notification for axios form request
    showErrorMsg(error){
        if (error.prototype.hasOwnProperty.call("response")) {
            const statusCode = error.response.status;

            const message = error.response.prototype.hasOwnProperty.call("data") ? error.response.data.message : error.response.message;
            const login = error.response.prototype.hasOwnProperty.call("data") ? error.response.data.login : error.response.login;

            if (statusCode == 400 || statusCode == 401 || statusCode == 403) {
                toastr.error(message);
            } else if(statusCode == 500) {
                toastr.error('i18n.general.something_wrong');
            } else if(statusCode == 422 && error.response.prototype.hasOwnProperty.call("error")) {
                toastr.error(error.response.error);
            } else if(statusCode == 422 && error.response.prototype.hasOwnProperty.call("data")) {
                toastr.error(error.response.data.errors.message[0]);
            } else if(statusCode == 404) {
                toastr.error('i18n.general.invalid_link');
            }

            if (login) {
                this.clearSession();
                location.reload();
            }
        } else if(error.prototype.call("errors")) {
            const message = error.errors.prototype.hasOwnProperty.call("message") ? error.errors.message[0] : '';
            if (message) {
                toastr.error(message);
            }
        }
    },
    fetchDataErrorMsg(error){

        let message = '';
        if (error.prototype.call("response")) {
            message = error.response.prototype.hasOwnProperty.call("data") ? error.response.data.message : error.response.message;

        } else if(error.prototype.call("errors")) {
            message = error.errors.prototype.hasOwnProperty.call("message") ? error.errors.message[0] : '';

        }
        return message;
    },

    // returns error message for axios form request
    fetchErrorMsg(error){
        return error.errors.message[0];
    },

    // round numbers as given precision
    roundNumber(number, precision){
        precision = Math.abs(parseInt(precision)) || 0;
        var multiplier = Math.pow(10, precision);
        return (Math.round(number * multiplier) / multiplier);
    },

    // round numbers as given precision
    formatNumber(number,decimal_place){
        if (decimal_place === undefined)
            decimal_place = 2;
        return this.roundNumber(number,decimal_place);
    },

    // fill number with padding
    formatWithPadding(n, width, z){
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    },

    // generates random string of certain length
    randomString(length) {
        if (length === undefined)
            length = 40;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },

    bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        let i;
        i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },

    formatCurrency(price){
        var currency = this.getConfig('default_currency');
        let decimal_place = currency.decimal_place || 2;
        if(currency.position === 'prefix')
            return currency.symbol+''+this.roundNumber(price,decimal_place);
        else
            return this.roundNumber(price,decimal_place)+' '+currency.symbol;
    },


    getExcerpts(content){
        return content.replace(/<[^>]+>/g, '');
    },

    truncateWords(text, length, suffix){
        var trimmedString = text.substr(0, length);
        return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + suffix;
    },

    truncateLetters(text, length, suffix){
        return text.replace(new RegExp("^(.{"+length+"}[^s]*).*"), "$1") + suffix;
    },

    getAuthToken(){
        return Vue.cookie.get('auth_token');
    },

}
