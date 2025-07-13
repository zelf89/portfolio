<script setup>
// No imports needed for this simple component
import gundam from "@/assets/gundam.jpg"; // Adjust the path as necessary
</script>

<template>
  <div>
    <h1>Hey Alls!🙌 Welcome to My Own Website😃</h1>
    <div class="highlight-box">
      <h2>What is this website about?</h2>
      <p>
        This Website is created as part of my learning journey in codingBN and develop using Vue.js
        and Vite. This is something very new to me and very exciting!.
      </p>
    </div>

    <div class="image-box">
      <img :src="gundam" alt="Gundam" />
    </div>

    <p>
      Thanks so much for checking my website! 😊🙏 You guys can use navigation button and have a go
      exploring my website and see what I have done so far.
    </p>
    <p>
      PS:This is much faster than traditional websites because we're not loading new pages from the
      server each time(As im being told).
    </p>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
