<script setup lang="ts">

import { ref, type Ref, computed } from 'vue'
import $ from 'jquery'
import { filePapaReader } from './Untils'
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber } from './classes'


const downloadFile = ref('')
const downloadName = ref('')
const csvstring = ref('')
let sheetRender: Sheet | undefined = new Sheet(null, null)
const sheetRef = ref(sheetRender)

const fileReader = () => {
    let file: File | undefined = document.getElementById('file')?.files[0]
    let result = filePapaReader(file)
    console.log("🚀 ~ fileReader ~ result:", result)
    if (typeof result != 'undefined') {
        sheetRef.value = result
    }
    console.log("🚀 ~ fileReader ~ sheetRef.value:", sheetRef.value)

}

const fileOutput = (event: Event): void => {

    let file = new Blob([`1,2,3,4`], { type: 'text/csv' })
    downloadFile.value = window.URL.createObjectURL(file)
    downloadName.value = 'output.csv'

}

</script>

<template>
    <div class="container-fluid">
        <div class="row text-center">
            <div class="col">
                <input @change="fileReader" id="file" type="file">
                <a :href="downloadFile" :download="downloadName" @click="fileOutput">导出</a>
                <!-- eslint-disable vue/no-parsing-error -->

                <table class="table table-bordered text-center mx-auto">
                    <tbody>
                        <tr v-for="student_group of sheetRef.groups" :key="student_group.id">
                            <p class="text-center mx-auto">{{ student_group.id }}</p>
                            <td v-for="student of student_group.students" :key="student.name">
                        <tr>
                            <p class="text-center mx-auto">{{ student.name }}</p>
                        </tr>
                        <td>
                            <p class="text-center mx-auto">{{ student.score }}</p>
                        </td>
                        </td>
                        </tr>
                    </tbody>
                </table>



            </div>
        </div>

    </div>
</template>