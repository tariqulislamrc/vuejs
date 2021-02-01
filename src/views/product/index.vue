<template>
  <b-container class="mt-5">
    <div class="page-titles">
      <b-row>
        <b-col lg="8" sm="12">
          <h3 class="text-themecolor">Products
            <small v-if="products.total">Total {{ products.total }} result found - showing records from {{ products.from }} to {{ products.to }}</small>
            <small  v-else>No Result Found</small>
          </h3>
        </b-col>
        <b-col lg="4" sm="12" class="text-right">
          <b-button-group size="sm">
            <b-button variant="success" v-if="products.total && !showCreatePanel" @click="showCreatePanel = !showCreatePanel, showFilterPanel=false" v-tooltip="'Add New Product'"> <font-awesome-icon icon="plus" /> Add New Product</b-button>
            <b-button variant="info" v-if="!showFilterPanel" @click="showFilterPanel = !showFilterPanel, showCreatePanel= false"> <font-awesome-icon icon="filter" />  Filter</b-button>
            <sort-by :order-by-options="orderByOptions" :sort-by="filter.sort_by" :order="filter.order" @updateSortBy="value => {filter.sort_by = value}"  @updateOrder="value => {filter.order = value}"></sort-by>
          </b-button-group>
        </b-col>
      </b-row>
    </div>
    <b-container>
      <transition name="fade">
        <div class="card mt-3 " v-if="showFilterPanel">
          
            <h4 class="card-header">Filter</h4>
            <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label for="">Product Keyword</label>
                  <input class="form-control" name="keyword" v-model="filter.keyword">
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <date-range-picker :start-date.sync="filter.date_of_product_start_date" :end-date.sync="filter.date_of_product_end_date" :label="'Date of Product Created'"></date-range-picker>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
             <b-button variant="danger" class="mr-2 w-25" @click="showFilterPanel = false">Cancel</b-button>
  <b-button variant="info" @click="getProducts" class="w-25">Filter</b-button>
              
          </div>
        </div>
      </transition>
      <transition name="fade"  v-if="showCreatePanel" >
        
        <product-form @completed="getProducts" @cancel="showCreatePanel = !showCreatePanel"></product-form>
          
      </transition>
      <div class="card mt-3">
        <div class="card-body">
          <div class="table-responsive" v-if="products.total">
            <table class="table table-sm">
              <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Created At</th>
                <th class="table-option">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product, index) in products.data" v-bind:key="product.id">
                <td> {{  index+1 }}</td>
                <td v-text="product.title"></td>
                <td v-text="product.price"></td>

                <td>{{product.created_at | momentDateTime}}</td>
                <td class="table-option">
                  <div class="btn-group">
                    <button class="btn btn-success btn-sm" v-tooltip="'View Product'" @click.prevent="showAction(product)">
                      <font-awesome-icon :icon="['fas', 'arrow-circle-right']" />
                      </button>
                    <button class="btn btn-info btn-sm"  v-tooltip="'Edit Product'" @click.prevent="editProduct(product)">
                      <font-awesome-icon :icon="['fas', 'edit']" />
                      </button>
                    <button class="btn btn-danger btn-sm" :key="product.id" v-confirm="{ok: confirmDelete(product)}" v-tooltip="'Delete Product'">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                      </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <module-info v-if="!products.total" module="post" title="Products" description="Show all your added product here." icon="list">
            <div slot="btn">
              <button class="btn btn-info btn-md" v-if="!showCreatePanel" @click="showCreatePanel = !showCreatePanel"><i class="fas fa-plus"></i> Add New Product</button>
            </div>
          </module-info>
          <pagination-record :page-length.sync="filter.page_length" :records="products" @updateRecords="getProducts"></pagination-record>
        </div>
      </div>
    </b-container>
    <product-detail v-if="showModal" @close="showModal = false" :uuid="showUuid"></product-detail>

  </b-container>
</template>

<script>
import productForm from './form'
import productDetail from './show'
export default {
    metaInfo: {
    title: 'Product'
  },
  components: {productForm, productDetail},
  data() {
    return {
      products: {
        total: 0,
        data: []
      },
      filter: {
        sort_by: 'created_at',
        order: 'desc',
        keyword: '',
        date_of_product_start_date: '',
        date_of_product_end_date: '',
        page_length: 10
      },
      orderByOptions: [
        {
          value: 'created_at',
          translation: 'Crated At'
        },
        {
          value: 'title',
          translation: 'Product Title'
        },
        {
          value: 'price',
          translation: 'Product Price'
        }
      ],
      product_types: [],
      selected_product_types: null,
      showFilterPanel: false,
      showCreatePanel: false,
      help_topic: '',
      showUuid: '',
      showModal: false
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    showAction(product) {
      this.showUuid = product.uuid;
      this.showModal = true;
    },
    getProducts(page) {
      let loader = this.$loading.show();
      if (typeof page !== 'number') {
        page = 1;
      }
      let url = window.helper.getFilterURL(this.filter);
      this.$axios.get('/api/product?page=' + page + url)
          .then(response => {
            this.products = response.data.products;
            loader.hide();
          })
          .catch(error => {
            loader.hide();
            window.helper.showErrorMsg(error);
          });
    },
    editProduct(product) {
      this.$router.push('/product/' + product.uuid + '/edit');
    },
    confirmDelete(product) {
      // eslint-disable-next-line no-unused-vars
        return dialog => this.deleteProduct(product);
    },
    deleteProduct(product) {
      let loader = this.$loading.show();
      this.$axios.delete('/api/product/' + product.uuid)
          .then(response => {
            window.toastr.success(response.data.message);
            this.getProducts();
            loader.hide();
          }).catch(error => {
        loader.hide();
        window.helper.showErrorMsg(error);
      });
    },
    getConfig(config) {
      return window.helper.getConfig(config)
    },
  },
    filters: {
      moment(date) {
        return window.helper.formatDate(date);
      },
      momentDateTime(date) {
        return window.helper.formatDateTime(date);
      }
    },

    watch: {
      'filter.sort_by': function () {
        this.getProducts();
      },
      'filter.order': function () {
        this.getProducts();
      },
      'filter.page_length': function () {
        this.getProducts();
      }
    },
    computed: {
      authToken() {
        return window.helper.getAuthToken();
      }
    }

}
</script>

<style scoped>

</style>