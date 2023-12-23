<script setup lang="ts">
defineProps<{
    got:string
}>()


</script>

<template>
    <div>
        <h1>
            {{ got }}
        </h1>
        <h2>
            See!
        </h2>
    </div>
</template>

<style scoped>

h2 {
    font-size: large;
    color: green;
}
h1 {
    color: gold;
}
</style>