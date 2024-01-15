<script setup lang="ts">
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber } from './classes'
import { ref, type Ref } from 'vue'


const sheet = defineProps<Sheet>()

</script>
<template>
    <table>
        <tr v-for="group in sheet.groups" :key="group.id">

            <h5>{{ group.id }}</h5>

            <td v-for="student in group.students" :key="student.name">

                {{ student.name }}

            </td>
            <td v-for="student in group.students" :key="student.name">

                {{ student.score }}

            </td>

        </tr>
    </table>
</template>