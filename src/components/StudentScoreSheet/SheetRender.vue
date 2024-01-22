<script setup lang="ts">
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber } from './classes'
import { ref, type Ref } from 'vue'


const sheet = defineProps<{
    groups: Group[],
    date: ExamDate,
    sort: Group[]
}>()



</script>
<template>
</template>