<template>
<b-button-group size="sm">
  <b-dropdown right text="Sort">
      <b-dropdown-item v-for="option in sortByOptions" @click="$emit('updateOrder',option.value)"  v-bind:key="option.value">
        <font-awesome-icon :icon="option.icon" /> {{option.translation}} <span v-if="option.value == order" class=""> <font-awesome-icon icon="check" /></span>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item v-for="option in orderByOptions" @click="$emit('updateSortBy',option.value)" v-bind:key="option.value">
        
         {{option.translation}} <span v-if="option.value == sortBy" class=""> <font-awesome-icon icon="check" /></span>
      </b-dropdown-item>
     
    </b-dropdown>
  </b-button-group>
</template>

<script>
export default {
  props: {
    sortBy: {
      required: true,
      default: 'created_at'
    },
    order: {
      required: true,
      default: 'desc'
    },
    orderByOptions: {
      required: true,
      default: []
    }
  },
  data() {
    return {
      sortByOptions: [
        {
          value: 'asc',
          translation: "Ascending",
          icon: 'sort-alpha-down'
        },
        {
          value: 'desc',
          translation: 'Descending',
          icon: 'sort-alpha-up'
        }
      ]
    }
  },
  methods: {
    getConfig(config){
      return window.helper.getConfig(config);
    }
  }
}
</script>