<template>
  <div class="container">
    <form class="row" @submit.prevent="getText">
      <button type="submit">Get</button>
    </form>
    <p>{{ text }}</p>
    <form class="row" @submit.prevent="addTask">
      <input type="text" id="task-value" v-model="task" placeholder="Enter a task...">
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup>
import {invoke} from '@tauri-apps/api';
import {ref} from 'vue';

const text = ref('');
const task = ref('');

async function getText() {
  await invoke('get_text').then((message) => text.value = message).catch((error) => console.error(error));
}

async function addTask() {
  await invoke('add_task', {task: task.value});
  task.value = '';
}

</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #555;
}

button:active {
  background-color: #888;
}

input {
  padding: 8px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

p {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

/* Responsive styles */
@media (max-width: 600px) {
  .container {
    max-width: 100%;
    padding: 10px;
  }

  .row {
    flex-direction: column;
  }

  button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
