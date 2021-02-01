<template>
  <div class="form-group">
    <label for="">{{label || 'Date Range'}}</label>
    <div class="input-group">
      <datepicker :bootstrapStyling="true" input-class="form-control" :value="startDate" :placeholder="'Start Date'" :clear-button="clearButton" @selected="updateStartDate" @cleared="clearStartDate"></datepicker>
      <datepicker :bootstrapStyling="true" input-class="form-control m-l-10" :value="endDate" :placeholder="'End Date'" @selected="updateEndDate" @cleared="clearEndDate"></datepicker>
    </div>
  </div>
</template>
<script>
import datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  components: {datepicker},
  props: ['startDate','endDate','label'],
  data(){
    return {
      clearButton: true
    }
  },
  methods: {
    updateStartDate(val){
      let date = moment(val).format('YYYY-MM-DD');
      if(date > this.endDate)
        this.$emit('update:endDate',date);
      this.$emit('update:startDate',date);
    },
    updateEndDate(val){
      let date = moment(val).format('YYYY-MM-DD');
      if(!this.startDate || this.startDate > date)
        this.$emit('update:startDate',date);
      this.$emit('update:endDate',date);
    },
    clearStartDate(){
      this.$emit('update:startDate','');
      this.$emit('update:endDate','');
    },
    clearEndDate(){
      this.$emit('update:endDate','');
    }
  }
}
</script>
