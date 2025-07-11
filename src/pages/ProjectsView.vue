<script setup>
import Todo from "../components/Todo.vue";
</script>

<template>
  <div>
    <h1>My Projects 💻</h1>
    <p>Here are some things I'm working on:</p>

    <div class="highlight-box">
      <h3>🌟 This Website</h3>
      <p>
        My first project using Vue Router to create multiple pages in a
        single-page application.
      </p>
    </div>

    <div class="highlight-box">
      <h3>📝 Todo List App</h3>
      <p>A simple app to keep track of tasks.</p>

      <Todo />
    </div>

    <div class="highlight-box">
      <h3>🚀 Vue + Vite Migration</h3>
      <p>
        Successfully converted from a single HTML file to a modern Vue 3 + Vite
        project!
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
