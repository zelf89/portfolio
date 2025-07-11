<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <!-- Navigation that stays the same on all pages -->
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
    </nav>

    <!-- This is where different pages will appear -->
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style>
/* Simple, clean styling */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  margin: 0 auto;
  background: white;
  min-height: 100dvh;

  text-align: left;
}

nav {
  background: #0915a0;
  padding: 1rem;
  text-align: right;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  padding: 10px 15px;
  border-radius: 5px;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.content {
  padding: 2rem;
}

.content h1 {
  color: #333;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;
}

.content p {
  line-height: 1.6;
  color: #666;
}

.highlight-box {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
}

/* Make the current page link look different */
.router-link-active {
  color: rgb(255, 251, 0);
  font-weight: bold;
}
</style>
