<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";

import lightWallpaper from "./assets/light_wallpaper.jpg";
import darkWallpaper from "./assets/dark_wallpaper.jpg";
import logo from "./assets/logo_z.png";

const darkMode = ref(false);

function toggleBackground() {
  darkMode.value = !darkMode.value;
  document.body.style.backgroundImage = darkMode.value
    ? `url(${darkWallpaper})`
    : `url(${lightWallpaper})`;
  document.body.style.backgroundColor = darkMode.value ? "#222" : "#f5f5f5";
}

// Set initial background on mount
onMounted(() => {
  document.body.style.backgroundImage = `url(${lightWallpaper})`;
  document.body.style.backgroundColor = "#f5f5f5";
});
</script>

<template>
  <div>
    <div>
      <nav>
        <img :src="logo" alt="Logo" class="nav-logo" />
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
          <RouterLink to="/projects" class="nav-link">Projects</RouterLink>
          <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
          <button class="toggle-btn" @click="toggleBackground">
            {{ darkMode ? "Light Mode" : "Dark Mode" }}
          </button>
        </div>
      </nav>
    </div>
    <!-- Navigation that stays the same on all pages -->

    <div class="container">
      <!-- This is where different pages will appear -->
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: background-color 0.3s, background-image 0.3s;
}

.container {
  width: 100%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.6); /* semi-transparent white */
  min-height: 100dvh;
  text-align: left;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0002;
}

nav {
  background: rgba(9, 21, 160, 0.7);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* logo left, nav right */
  gap: 10px;
}

.nav-logo {
  height: 40px;
  margin-right: 24px;
  vertical-align: middle;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 10px;
  padding: 10px 15px;
  border-radius: 5px;
}

nav a:last-child {
  margin-right: 0;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.router-link {
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: black;
  transition: background 0.3s;
}

.router-link:hover {
  background-color: lightblue;
}
.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  color: rgb(255, 251, 0);
  font-weight: bold;
}

.toggle-btn {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #357a38;
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
  background: rgba(232, 245, 232, 0.6); /* semi-transparent green */
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
}
</style>
