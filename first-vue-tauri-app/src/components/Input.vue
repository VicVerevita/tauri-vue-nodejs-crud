<template>
    <div class="row input-container">
        <input type="text" id="task" placeholder="Enter a task" :value={text} />
        <button @click="addTask">Add</button>
    </div>
</template>

<script>
import {tasks} from "./Tasks.vue"

text = ref("")
async function addTask() {
    if (text.length == 0)
        return;
    tasks = await invoke("addTask", {text})
}

</script>