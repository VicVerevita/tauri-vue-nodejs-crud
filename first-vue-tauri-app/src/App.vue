<template>
  <div class="container">
    <h1>To-Do List</h1>
    <Input />
    <Tasks />
  </div>
</template>

<script>
import {Tasks} from './components/Tasks.vue'
import {Input} from './components/Input.vue'

export default {
  name: 'App',
  components: {
    Tasks,
    Input
  }
}
</script>

<style></style>