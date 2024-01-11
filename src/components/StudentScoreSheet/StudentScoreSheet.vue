<script setup lang="ts">

import { ref } from 'vue'
import $ from 'jquery'
import { filePapaReader } from './Untils'

const jsonfile = ref('')
const downloadFile = ref('')
const downloadName = ref('')
const csvstring = ref('')

const fileReader = (event: Event) => {

    let file: File = event.target.files[0]
    console.log("🚀 ~ fileReader ~ file:", file)

    filePapaReader(file)

    console.log(1);




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
                <p>{{ jsonfile }}</p>
                <a :href="downloadFile" :download="downloadName" @click="fileOutput">导出</a>
            </div>
        </div>

    </div>
</template>