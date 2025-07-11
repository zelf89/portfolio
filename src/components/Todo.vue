<template>
  <div class="todo-container">
    <div class="add-todo">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
      <button @click="addTodo" :disabled="!newTodo.trim()">Add</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed" />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
    <div v-if="todos.length === 0" class="empty">No todos yet!</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTodo = ref("");
const todos = ref([]);

function addTodo() {
  const text = newTodo.value.trim();
  if (text) {
    todos.value.push({ text, completed: false });
    newTodo.value = "";
  }
}

function removeTodo(index) {
  todos.value.splice(index, 1);
}
</script>

<style scoped>
.todo-container {
  max-width: 400px;
  margin: 2em auto;
  padding: 2em;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
}
.add-todo {
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
}
.add-todo input {
  flex: 1;
  padding: 0.5em;
}
.add-todo button {
  padding: 0.5em 1em;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
.todo-list li.completed span {
  text-decoration: line-through;
  color: #888;
}
.todo-list button {
  cursor: pointer;
  background-color: red;
  color: white;
  border-radius: 16px;
  padding: 10px;
  border: 0;
}
.todo-text {
  flex: 1;
  text-align: left;
}
.todo-list li.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}
.todo-list input[type="checkbox"] {
  margin-left: 1em;
  margin-right: 1em;
}
.todo-list button {
  cursor: pointer;
  background-color: red;
  color: white;
  border-radius: 16px;
  padding: 10px;
  border: 0;
  margin-left: auto;
}
.empty {
  text-align: center;
  color: #aaa;
  margin-top: 1em;
}

button {
  cursor: pointer;
  background-color: green;
  color: white;
  border-radius: 16px;
  padding: 10px;
  border: 0;
}
</style>
