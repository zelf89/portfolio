<script setup>
// No imports needed for this simple component
</script>

<template>
  <div>
    <h1>Oops! Page Not Found 😅</h1>
    <div class="highlight-box">
      <p>The page you're looking for doesn't exist.</p>
      <p>Maybe you want to visit one of these pages instead:</p>
      <p>
        <RouterLink to="/">🏠 Home</RouterLink> |
        <RouterLink to="/about">👋 About</RouterLink> |
        <RouterLink to="/projects">💻 Projects</RouterLink> |
        <RouterLink to="/contact">📧 Contact</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
