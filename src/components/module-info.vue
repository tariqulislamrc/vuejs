<template>
  <div class="text-center">
    <p v-if="icon" class="text-muted"> <font-awesome-icon :icon="icon" size="3x" /> </p>
    <h2 v-if="title" v-text="title"></h2>
    <p v-if="description" class="text-dark" v-text="description"></p>
    <slot name="btn"></slot>
  </div>
</template>

<script>
export default {
  props: ['module','icon','title','description']
}
</script>