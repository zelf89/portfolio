<script setup>
import { ref } from 'vue';

// Reactive data - like data() but simpler
const count = ref(0);
const message = ref('Click the button!');

// Methods - just regular functions
function increment() {
  count.value++;
  message.value = `You clicked ${count.value} times!`;
}

function reset() {
  count.value = 0;
  message.value = 'Click the button!';
}
</script>

<template>
  <div class="counter">
    <h2>Simple Counter</h2>
    <p class="message">{{ message }}</p>
    <div class="count-display">{{ count }}</div>

    <div class="buttons">
      <button @click="increment" class="btn btn-primary">Click Me!</button>
      <button @click="reset" class="btn btn-secondary">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.counter {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  max-width: 400px;
  margin: 20px auto;
}

.message {
  font-size: 1.2em;
  margin: 20px 0;
}

.count-display {
  font-size: 3em;
  font-weight: bold;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: #ff6b6b;
  color: white;
}

.btn-secondary {
  background: #4ecdc4;
  color: white;
}
</style>
