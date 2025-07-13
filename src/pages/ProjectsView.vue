<script setup>
import Todo from "../components/Todo.vue";
import SimpleCounter from "@/components/SimpleCounter.vue";
</script>

<template>
  <div>
    <h1>My Projects 💻</h1>
    <p>Here are some things I'm working on:</p>

    <div class="highlight-box">
      <h3>This Website</h3>
      <p>
        My first project using Vue Router to create multiple pages in a single-page application.
      </p>
    </div>

    <div class="highlight-box" @click="$router.push('/posts')" style="cursor: pointer">
      <h3>Post Directory</h3>
      <p>This page implements API calls GET,POST and filter function.</p>
      <h2 class="highlight-text">This section can be click.</h2>
    </div>

    <div class="highlight-box">
      <h3>Todo List App</h3>
      <p>A simple app to keep track of tasks.</p>
      <Todo />
    </div>

    <div class="highlight-box">
      <h3>Simple Counter App</h3>
      <p>A simple app to count number.</p>
      <SimpleCounter />
    </div>
  </div>
</template>

<style scoped>
.highlight-text {
  background: #62bdef;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
