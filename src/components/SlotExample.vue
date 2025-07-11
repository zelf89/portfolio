<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
}
</style>
