<template>
    <div class="row task-container">
        <ul class="task-list">
            <li v-for="task in tasks" class="row task-element">
                <input type="checkbox" name="" :checked="task.isDone" @click="{
                    () => handleCheckboxInput(task.id, !task.isDone)
                }" />
                <span v-if="task.isDone" class="muted">{task.text}</span>
                <span v-else>{task.text}</span>
                <button class="delete" @click="{() => deleteTask(task.id)}">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>

let tasks = ref([])

async function getAllTasks() {
    tasks = await invoke("getAllTasks")
}

onMounted(async () => {
    getAllTasks
})

async function handleCheckboxInput(id) {
    tasks = await invoke("updateTask", {id, isDone})
}

async function deleteTask(id) {
    tasks = await invoke("deleteTask", {id})
}

export default {
    name: "Tasks",
    props: {
        tasks: {
            type: Array,
            default: []
        }
    },
    methods: {
        getAllTasks,
        handleCheckboxInput
    },
    data() {
        return {
            tasks: []
        }
    }
}

</script>