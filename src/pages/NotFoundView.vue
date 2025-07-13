<script setup></script>

<template>
  <div>
    <h1>Oops! Page Not Found</h1>
    <div class="highlight-box">
      <p>The page you're looking for doesn't exist.</p>
      <p>Maybe you want to visit one of these pages instead:</p>

      <ul>
        <li><RouterLink class="nav-btn" to="/">Home</RouterLink></li>
        <li><RouterLink class="nav-btn" to="/about">About</RouterLink></li>
        <li><RouterLink class="nav-btn" to="/projects">Projects</RouterLink></li>
        <li><RouterLink class="nav-btn" to="/contact">Contact</RouterLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
  background: none;
}
.nav-btn {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, #143ced 0%, #310b56 100%);
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 8px #0002;
  transition: background 0.2s, box-shadow 0.2s;
}
.nav-btn:hover {
  background: linear-gradient(135deg, #310b56 0%, #143ced 100%);
  box-shadow: 0 4px 16px #0003;
}
</style>
